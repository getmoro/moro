#!/usr/bin/env node

// packages
const moment = require('moment')
const prog = require('caporal')

// ours
const customLogger = require('./utils/logger')
const db = require('./storage.js')

// consts
// default break time in minutes
const BREAK_DEFAULT = 30
const TODAY = moment().format('YYYY-MM-DD')
const VERSION = require('./package.json').version

// Commands
// ./index.js hi
// ./index.js hi 08:23
// ./index.js bye
// ./index.js bye 17:30
// ./index.js break 32
// ./index.js break -32
// ./index.js report
// ./index.js report --all

const setEnd = (args, options, logger) => {
  const end = args.end || moment().format('HH:mm')
  logger.info('Your end of the day registered as: ', end)
  db
    .updateDatabase(TODAY, null, end, BREAK_DEFAULT, 'setEnd')
    .then(() => { report() })
}

// input 'HH:mm', output moment object
const composeDateObject = (timeString) => {
  const hour = timeString.split(':')[0]
  const minutes = timeString.split(':')[1]
  return moment({ hour, minutes })
}
const setStart = (args, options, logger) => {
  const start = args.start || moment().format('HH:mm')
  logger.info('\n Your start of the day registered as ', start)

  // to tell users when they can go home!
  const shouldWorkUntil = composeDateObject(start)
    .add({hour: 7.5})
    .add({minutes: BREAK_DEFAULT})
    .format('HH:mm')

  logger.info('\n Working until ', shouldWorkUntil, 'will make it a full (7.5h) day')

  db
    .updateDatabase(TODAY, start, null, BREAK_DEFAULT, 'setStart')
    .then(() => { db.destroyKnex() })
    .catch((err) => { logger.error(err) })

  logger.info('\n TIP: next time you run moro the end of your day will be set')
}

const setBreak = (args, options, logger) => {
  const duration = args.duration || 30
  logger.info('Break took: ', duration, 'Minutes', ' And will be removed from your work hours')
  db.updateDatabase(TODAY, null, null, duration, 'setBreakDuration')
}

const report = (args, options, logger = customLogger, date = TODAY) => {
  if (options && options.all) {
    db
      .getFullReport()
      .then(() => { db.destroyKnex() })
      .catch((error) => { console.log(error) })

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

prog
  .version(VERSION)
  .description('Record your work hours. Just say moro when you come to work, and say moro when you leave. It shows how long you have worked on that day!')
  .action(nextUndoneAction)
  .command('hi', 'Set your start of the day, default time is now!')
  .argument('[start]', 'Specify start time if not now', /^\d\d:\d\d$/)
  .action(setStart)
  .command('bye', 'Sets your end of the day time')
  .argument('[end]', 'Specify the end of working hours if not now', /^\d\d:\d\d$/)
  .action(setEnd)
  .command('break', 'Set the amount of unpaid break in minute. 30 minutes is added by default for lunch. Use this command to enter the correct amount')
  .argument('[duration]', 'Specify the duration of break in minutes ', /^[\d]+$/)
  .action(setBreak)
  .command('report', 'See what you have done today!')
  .option('--all', 'shows reports for all days')
  .action(report)

prog.parse(process.argv)
