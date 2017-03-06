#!/usr/bin/env node

// good name for this? 9 to 5
const moment = require('moment')
const prog = require('caporal')
const VERSION = require('./package.json').version
const dbHelpers = require('./storage.js')
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
prog
  .version(VERSION)
  .command('hi', 'Set your start of the day, default is now!')
  .argument('[start]', 'Specify start time if not now', /^\d\d:\d\d$/)
  .action((args, options, logger) => {
    const start = args.start || moment().format('HH:mm')
    console.log('Your start of the day registered as ', moment().format('HH:mm'))
    dbHelpers.updateDatabase(TODAY, start, null, BREAK_DEFAULT, 'setStart')
  })
  .command('bye', 'Sets your end of the day time')
  .argument('[end]', 'Specify the end of working hours if not now', /^\d\d:\d\d$/)
  .action((args, options, logger) => {
    const end = args.end || moment().format('HH:mm')
    console.log('Your end of the day registered as: ', end)
    dbHelpers.updateDatabase(TODAY, null, end, BREAK_DEFAULT, 'setEnd')
  })
  .command('break', 'Adds to the duration of unpaid break, in minutes. A default of 30 minutes is already added. Use negative numbers to reduce the break time.')
  .argument('[duration]', 'Specify the duration of break in minutes ', /^[\d]+$/)
  .action((args, options, logger) => {
    const duration = args.duration || 30
    console.log('Break took: ', duration, 'Minutes', ' And will be removed from your work hours')
    dbHelpers.updateDatabase(TODAY, null, null, duration, 'setBreakDuration')
  })
  .command('report', 'Set your start of the day, default is now!')
  .action((args, options, logger) => {
    dbHelpers.readData(TODAY)
  })

prog.parse(process.argv)
