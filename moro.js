#!/usr/bin/env node
// packages
const moment = require('moment')
const prog = require('caporal')

// ours
const db = require('./db.js')

// constants

const TODAY = moment().format('YYYY-MM-DD')
const VERSION = require('./package.json').version

const {
  setStart,
  setEnd,
  setBreak,
  report,
  clearData,
  setConfig,
  addNote
} = require('./commands.js')

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
