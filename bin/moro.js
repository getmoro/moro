#!/usr/bin/env node
'use strict'

// ours
const spinner = require('../lib/utils/spinner.js')
spinner.start()

// packages
const prog = require('caporal')

// constants
const VERSION = require('../package.json').version
const COMMAND_DESCRIPTIONS = require('../lib/constants.json').TEXT.commands

// importing all the commands
const commands = require('../lib/commands.js')
const helpers = require('../lib/utils/helpers.js')

// All the possible commands and arguments:
// moro
// moro hi
// moro hi 08:23
// moro bye
// moro bye 17:30
// moro break 32
// moro break -32
// moro clear --yes
// moro report
// moro report --all
// moro status
// moro config --day 8.5
// moro config --break 45
// moro config --format 'ddd, MMM, DD'
// moro config --database-path '/home/GraceHopeer/moro.db'

prog
  // default command
  .version(VERSION)
  .description(COMMAND_DESCRIPTIONS.default)
  .action(commands.nextUndoneAction)
//
// ////////////////////
// hi
//
  .command('hi', COMMAND_DESCRIPTIONS.hi)
  .alias('h')
  .argument('[start]', COMMAND_DESCRIPTIONS.hiStart, /^\d\d:\d\d$/)
  .action(commands.setStart)
//
// ////////////////////
// bye
//
  .command('bye', COMMAND_DESCRIPTIONS.bye)
  .alias('b')
  .argument('[end]', COMMAND_DESCRIPTIONS.byeEnd, /^\d\d:\d\d$/)
  .action(commands.setEnd)
//
// ////////////////////
// break
//
  .command('break', COMMAND_DESCRIPTIONS.break)
  .argument('<duration>', COMMAND_DESCRIPTIONS.breakDuration, /^[\d]+$/)
  .action(commands.setBreak)
//
// ////////////////////
// // report
//
  .command('report', COMMAND_DESCRIPTIONS.report)
  .alias('r')
  .option('--all', COMMAND_DESCRIPTIONS.reportAll)
  .action(commands.report)
//
// ////////////////////
// // status
//
  .command('status', COMMAND_DESCRIPTIONS.status)
  .alias('st')
  .action(commands.report)
//
// ////////////////////
// clear
//
  .command('clear', '')
  .option('--yes', 'you need to confirm before I remove everything')
  .action((args, options, logger) => {
    commands.clearData(args, options, logger, spinner)
  })
//
// ////////////////////
// config
//
  .command('config', COMMAND_DESCRIPTIONS.config)
  .alias('c')
  .option('--day <duration>', COMMAND_DESCRIPTIONS.configDay, prog.FLOAT)
  .option('--break <duration>', COMMAND_DESCRIPTIONS.breakDuration, prog.INT)
  .option('--format <pattern>', COMMAND_DESCRIPTIONS.configPattern, prog.STRING)
  .option('--database-path [path]', COMMAND_DESCRIPTIONS.dbPath, helpers.pathValidator)
  .action(commands.setConfig)
//
// ////////////////////
// note
//
  .command('note', COMMAND_DESCRIPTIONS.note)
  .alias('n')
  .argument('[note...]', COMMAND_DESCRIPTIONS.noteNote)
  .action(commands.addNote)
//
// ////////////////////
// about
//
  .command('about', COMMAND_DESCRIPTIONS.about)
  .alias('a')
  .action(commands.about)

// let it begin!
prog.parse(process.argv)
