#!/usr/bin/env node

// packages
const moment = require('moment')
const prog = require('caporal')
const jsonfile = require('jsonfile')

// ours
const db = require('./storage.js')
const helpers = require('./utils/helpers.js')

// constants

const TODAY = moment().format('YYYY-MM-DD')
const VERSION = require('./package.json').version

const CONFIG = jsonfile.readFileSync('./config.json')

// set end of the work day
const setEnd = (args, options, logger) => {
  const end = args.end || moment().format('HH:mm')
  logger.info('Your end of the day registered as: ', end)

  db
    .updateDatabase(TODAY, null, end, CONFIG.BREAK_DEFAULT, 'setEnd')
    .then(() => { report() })
}

// to tell users when they can go home!
const shouldWorkUntil = (start, logger) => {
  const goHomeTime = helpers.composeDateObject(start)
    .add({hour: CONFIG.HOURS_IN_A_WORK_DAY})
    .add({minutes: CONFIG.BREAK_DEFAULT})
    .format('HH:mm')
  logger.info('\n Working until ', goHomeTime, `will make it a full (${CONFIG.HOURS_IN_A_WORK_DAY}) day`)
}

const setStart = (args, options, logger) => {
  const start = args.start || moment().format('HH:mm')
  logger.info('\n Your start of the day registered as ', start)

  shouldWorkUntil(start, logger)

  // update database
  db
    .updateDatabase(TODAY, start, null, CONFIG.BREAK_DEFAULT, 'setStart')
    .catch((err) => { logger.error(err) })
    .finally(() => { db.destroyKnex() })

  logger.info('\n TIP: next time you run moro the end of your day will be set')
}

// set total duration of break for today
const setBreak = (args, options, logger) => {
  const duration = args.duration || 30
  logger.info('Break took: ', duration, 'Minutes', ' And will be removed from your work hours')
  db.updateDatabase(TODAY, null, null, duration, 'setBreakDuration')
}

// report functionality for both single and batch reporting
const report = (args, options, logger = console.log, date = TODAY) => {
  if (options && options.all) {
    db
      .getFullReport()
      .catch((error) => { console.log(error) })
      .finally(() => { db.destroyKnex() })

    return
  }
  db
    .calculateWorkHours(date)
    .then((result) => {
      return result
    })
    .then((result) => {
      db.getDateReport(TODAY)
        .then((data) => {
          if (data) {
            data.dayReport = result.formattedWorkHours
            helpers.printSingleDayReport(data)
          }
        })
        .catch((err) => { logger.error(err) })
    })
    .catch((err) => { logger.error(err) })
    .finally(() => {
      db.destroyKnex()
    })
}

// determine whether to setStart | setEnd | report
// based on entered information in database
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

      // this one is for when we don't even have the database
      setStart(args, options, logger)
    })
}

const clearData = (args, options, logger) => {
  if (options && options.yes) {
    db.removeDatabase()
    return
  }
  logger.info('If you surely want to clear all data in moro run: moro clear --yes')
  process.exit()
}

// Commands
// moro
// moro hi 08:23
// moro bye
// moro bye 17:30
// moro break 32
// moro break -32
// moro report
// moro report --all
prog
  .version(VERSION)
  .description('Track your work hours. Just say moro when you come to work, and say moro when you leave. It shows how long you have worked on that day!')
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
  .command('clear', 'remove the database! Be careful :) ')
  .option('--yes', 'you need to confirm before I remove everything')
  .action(clearData)

prog.parse(process.argv)
