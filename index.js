#!/usr/bin/env node
const moment = require('moment');
const yargs = require('yargs')

yargs
  .command({
    command: 'hi',
    desc: 'set start of work day',
    handler: (argv) => {
      console.log('Hi! your start of the day is set as: ', moment().format('HH:MM'));
    },
    usage: 'timo hi',
  })
  .help()
  .wrap(72)
  .argv;
