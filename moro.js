#!/usr/bin/env node
// native
const path = require('path')

// packages
const moment = require('moment')
const prog = require('caporal')
const jsonfile = require('jsonfile')

// ours
const db = require('./db.js')
const helpers = require('./utils/helpers.js')

// constants

const TODAY = moment().format('YYYY-MM-DD')
const VERSION = require('./package.json').version
const CONFIG_FILE = path.join(__dirname, 'config.json')
const CONFIG = jsonfile.readFileSync(CONFIG_FILE)

const setConfig = (args, options, logger) => {
  if (options.day) {
    CONFIG.HOURS_IN_A_WORK_DAY = options.day
  }

  if (options.break) {
    CONFIG.BREAK_DEFAULT = options.break
  }
  jsonfile.writeFileSync(CONFIG_FILE, CONFIG)
  console.log(CONFIG)
  process.exit(0)
}
// set end of the work day
const setEnd = (args, options, logger) => {
  const end = args.end || moment().format('HH:mm')
  logger.info('Your end of the day registered as: ', end)

  const payload = {
    date: TODAY,
    end,
    action: 'setEnd'
  }
  db
    .updateDatabase(payload)
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

  const payload = {
    date: TODAY,
    start,
    breakDuration: CONFIG.BREAK_DEFAULT,
    action: 'setStart'
  }

  // update database
  db.updateDatabase(payload)
    .catch((err) => { logger.error(err) })
    .finally(() => { process.exit(0) })

  logger.info('\n TIP: next time you run moro the end of your day will be set')
}

// set total duration of break for today
const setBreak = (args, options, logger) => {
  const duration = args.duration || CONFIG.BREAK_DEFAULT
  logger.info('Break took: ', duration, 'Minutes', ' And will be removed from your work hours')

  const payload = {
    date: TODAY,
    breakDuration: duration,
    action: 'setBreakDuration'
  }
  db.updateDatabase(payload)
    .catch((err) => { logger.error(err) })
    .then(() => { report() })
}

// report functionality for both single and batch reporting
const report = (args, options, logger = console.log, date = TODAY) => {
  if (options && options.all) {
    db
      .getFullReport()
      .catch((error) => { console.log(error) })
      .finally(() => { process.exit(0) })

    return
  }
  db
    .calculateWorkHours(date)
    .then((result) => {
      db.getDateReport(TODAY)
        .then((data) => {
          if (data && result) {
            data.dayReport = result.formattedWorkHours
            helpers.printSingleDayReport(data)
          }
        })
        .catch((err) => { logger.error(err) })
    })
    .catch((err) => { logger.error(err) })
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

const addNote = (args, options, logger) => {
  let note = args.note || '...'
  note = note.join(' ')
  const createdat = moment().format('HH:mm')
  const payload = {
    date: TODAY,
    note,
    createdat,
    action: 'addNote'
  }
  db.updateDatabase(payload)
    .catch((err) => { logger.error(err) })
    .finally(() => {
      console.log('Your note is added. Run moro to see the report')
      process.exit(0)
    })
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
  .command('hi', 'ex. "moro hi 09:45" Sets your start of the day at 09:45!')
  .alias('start')
  .argument('<start>', 'Specify start time if not now', /^\d\d:\d\d$/)
  .action(setStart)
  .command('bye', 'ex. "moro bye 17:45" Sets your end of the day at 17:45')
  .alias('stop')
  .argument('<end>', 'Specify the end of working hours if not now. e.g 17:45 ', /^\d\d:\d\d$/)
  .action(setEnd)
  .command('break', 'ex. "moro break 45" Set the totoal amount of unpaid break for today to 45 minutes. 30 minutes is added by default for lunch. Use this command to enter the correct amount')
  .argument('<duration>', 'Specify the duration of break in minutes. e.g 45 ', /^[\d]+$/)
  .action(setBreak)
  .command('report', 'See what you have done today!')
  .option('--all', 'shows reports for all days')
  .action(report)
  .command('clear', 'remove the database! Be careful :) ')
  .option('--yes', 'you need to confirm before I remove everything')
  .action(clearData)
  .command('config', 'Set duration of day, and default break duration')
  .option('--day <duration>', 'How many hours make a full day e.g 7.5', prog.FLOAT)
  .option('--break <duration>', 'Set your proffered default break time in minutes. e.g 45', prog.INT)
  .action(setConfig)
  .command('note', 'optionally add notes about the task at hand')
  .argument('[note...]', 'free form text about taks at hand')
  .action(addNote)
prog.parse(process.argv)
