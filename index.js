#!/usr/bin/env node

// good name for this? 9 to 5
// no numbers are hard. oho ? or niin?
// or moro
const moment = require('moment')
const prog = require('caporal')
const VERSION = require('./package.json').version
const db = require('./storage.js')
const TODAY = moment().format('YYYY-MM-DD')

// default break time in minutes
const BREAK_DEFAULT = 30

// Commands
// ./index.js hi
// ./index.js hi 08:23
// ./index.js bye
// ./index.js bye 17:30
// ./index.js break 32
// ./index.js break -32
//

const setEnd = (args, options, logger) => {
  const end = args.end || moment().format('HH:mm')
  console.log('Your end of the day registered as: ', end)
  db.updateDatabase(TODAY, null, end, BREAK_DEFAULT, 'setEnd')
}

const setStart = (args, options, logger) => {
  const start = args.start || moment().format('HH:mm')
  console.log('Your start of the day registered as ', start)
  db.updateDatabase(TODAY, start, null, BREAK_DEFAULT, 'setStart')
}

const setDuration = (args, options, logger) => {
  const duration = args.duration || 30
  console.log('Break took: ', duration, 'Minutes', ' And will be removed from your work hours')
  db.updateDatabase(TODAY, null, null, duration, 'setBreakDuration')
}

const report = (args, options, logger, date = TODAY) => {
  if (options.all) {
    db.getFullReport()
    return
  }
  db
    .calculateWorkHours(date)
    .then((result) => {
      result && logger.info(result.message)
    })
    .then(() => {
      db.getDateReport(TODAY)
        .then((data) => {
          logger.info(data)
          logger.info(' minutes')
        })
        .catch((err) => { logger.error(err) })
    })
    .catch((err) => { logger.error(err) })
    .finally(() => {
      db.destroyKnex()
    })
}

const nextUndoneAction = (args, options, logger) => {
  db.getDateReport(TODAY)
    .then((data) => {
      if (data && !data.start) {
        setStart(args, options, logger)
        return
      }
      if (data && !data.end) {
        setEnd(args, options, logger)
        return
      }
      if (data && data.start && data.end) {
        report(args, options, logger)
        return
      }

      setStart(args, options, logger)
    })
}
// Todo: would be smarter by to set hi, bye without any hassle.
// First one hi, next one bye
prog
  .version(VERSION)
  .description('record your work hours')
  .action(nextUndoneAction)
  .command('hi', 'Set your start of the day, default time is now!')
  .argument('[start]', 'Specify start time if not now', /^\d\d:\d\d$/)
  .action(setStart)
  .command('bye', 'Sets your end of the day time')
  .argument('[end]', 'Specify the end of working hours if not now', /^\d\d:\d\d$/)
  .action(setEnd)
  .command('break', 'Set the amount of unpaid break in minute. 30 minutes is added by default for lunch. Use this command to enter the correct amount')
  .argument('[duration]', 'Specify the duration of break in minutes ', /^[\d]+$/)
  .action(setDuration)
  .command('report', 'See what you have done today!')
  .option('--all', 'shows reports for all days')
  .action(report)

prog.parse(process.argv)
