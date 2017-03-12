#!/usr/bin/env node
// packages
const prog = require('caporal')

// ours

// constants

const VERSION = require('./package.json').version
const COMMAND_DESCRIPTIONS = require('./constants.json').TEXT.commands

// importing all the commands
const {
  nextUndoneAction,
  setStart,
  setEnd,
  setBreak,
  report,
  clearData,
  setConfig,
  addNote
} = require('./commands.js')

// All the possible commands and arguments:
// moro
// moro hi 08:23
// moro bye
// moro bye 17:30
// moro break 32
// moro break -32
// moro report
// moro report --all
// moro config --day 8.5
// moro config --break 45
// moro clear --yes
prog
  // default command
  .version(VERSION)
  .description(COMMAND_DESCRIPTIONS.default)
  .action(nextUndoneAction)
//
// ////////////////////
// hi
//
  .command('hi', COMMAND_DESCRIPTIONS.hi)
  .alias('h')
  .argument('<start>', COMMAND_DESCRIPTIONS.hiStart, /^\d\d:\d\d$/)
  .action(setStart)
//
// ////////////////////
// bye
//
  .command('bye', COMMAND_DESCRIPTIONS.bye)
  .alias('b')
  .argument('<end>', COMMAND_DESCRIPTIONS.byeEnd, /^\d\d:\d\d$/)
  .action(setEnd)
//
// ////////////////////
// break
//
  .command('break', COMMAND_DESCRIPTIONS.break)
  .argument('<duration>', COMMAND_DESCRIPTIONS.breakDuration, /^[\d]+$/)
  .action(setBreak)
//
// ////////////////////
// // report
//
  .command('report', COMMAND_DESCRIPTIONS.report)
  .alias('r')
  .option('--all', COMMAND_DESCRIPTIONS.reportAll)
  .action(report)
//
// ////////////////////
// clear
//
  .command('clear', '')
  .option('--yes', 'you need to confirm before I remove everything')
  .action(clearData)
//
// ////////////////////
// config
//
  .command('config', COMMAND_DESCRIPTIONS.config)
  .alias('c')
  .option('--day <duration>', COMMAND_DESCRIPTIONS.configDay, prog.FLOAT)
  .option('--break <duration>', COMMAND_DESCRIPTIONS.breakDuration, prog.INT)
  .action(setConfig)
//
// ////////////////////
// note
//
  .command('note', COMMAND_DESCRIPTIONS.note)
  .alias('n')
  .argument('[note...]', COMMAND_DESCRIPTIONS.noteNote)
  .action(addNote)

// let it begin!
prog.parse(process.argv)
