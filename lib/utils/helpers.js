'use strict'

// packages
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const Table = require('cli-table3')
const expandHomeDir = require('expand-home-dir')

// ours
const spinner = require('./spinner.js').mainSpinner
const spinnerInfo = require('./spinner.js').spinnerInfo

// input moment which also contains days, output formated sum
const formatSum = workHours => {
  const hours = workHours.days() * 24 + workHours.hours()
  return toString(hours, workHours.minutes())
}

// input moment, output formated work hours
const formatWorkHours = workHours =>
  // to add negative sign
  toString(workHours.hours(), workHours.minutes())

// input hours and minutes, output string
const toString = (hours, minutes) => `${hours} Hours and ${minutes} Minutes`

// input 'HH:mm', output moment object
const composeDateObject = timeString => {
  if (!timeString || timeString.length < 5) {
    return
  }
  const hour = timeString.split(':')[0]
  const minutes = timeString.split(':')[1]
  return moment({ hour, minutes })
}

// input start, end, pause
// output duration
const calculateWorkHours = (start, end, pause) => {
  // to assign hours to moment objects, we need the diff so current moment is fine
  const startDate = composeDateObject(start)
  const endDate = composeDateObject(end) || moment()
  const duration = moment.duration(
    endDate.diff(startDate.add({ minutes: pause }))
  )
  return duration
}

// to tell users when they can go home!
const shouldWorkUntil = (start, CONFIG) => {
  const goHomeTime = composeDateObject(start)
    .add({ hour: CONFIG.HOURS_IN_A_WORK_DAY })
    .add({ minutes: CONFIG.BREAK_DEFAULT })
    .format('HH:mm')
  // FIXME this can be moved to utils/spinner.js as well
  // for CI
  if (!spinner.enabled) {
    console.log(
      `Working until ${goHomeTime} will make it a full (${
        CONFIG.HOURS_IN_A_WORK_DAY
      } hours) day\n\n`
    )
  }

  // for other times i.e. normal use in terminal
  spinner
    .stopAndPersist({
      symbol: '⏰',
      text: `Working until ${goHomeTime} will make it a full (${
        CONFIG.HOURS_IN_A_WORK_DAY
      } hours) day\n\n`
    })
    .start()
}

// input obj. record
const printSingleDayReport = record => {
  // instantiate
  var table = new Table()

  table.push(
    { 'Today you worked': record.dayReport },
    { 'Clock in': record.start },
    { 'Clock out': record.end || '(Not set yet)' },
    { 'Break duration': `${record.breakDuration} minutes` },
    { Date: record.date }
  )
  record.notes.forEach(note => {
    if (!note) {
      return
    }
    table.push([{ content: `Note [${note.createdat}]` }, note.note])
  })
  return table.toString()
}

// full report of all days
const printAllDaysReport = (records, CONFIG) => {
  CONFIG = CONFIG || {}
  const pattern = CONFIG.DATE_FORMAT || 'YYYY-MM-DD'
  const table = buildTable(records, pattern)

  spinnerInfo(spinner, 'Report of all the days:\n')
  console.log(table)
}

const printSearchResults = (results, CONFIG) => {
  CONFIG = CONFIG || {}
  const pattern = CONFIG.DATE_FORMAT || 'YYYY-MM-DD'

  // initialize table
  const table = new Table({
    head: ['Date', 'Time', 'Note'],
    colWidths: [20, 7, 50]
  })

  // append elements to the table
  results.map((item, index) => {
    const date = moment(item.date)

    table.push([date.format(pattern), item.createdat, item.note])
  })

  if (table.length === 0) {
    // print warning for no search result
    spinner.warn('Unfortunately there are no search results.\n')
  } else {
    // print search result
    const suffix = table.length === 1 ? '' : 's'
    spinnerInfo(spinner, `There are ${table.length} search result${suffix}:\n`)

    console.log(table.toString())
  }
}

// build a beautiful table
const buildTable = (records, pattern) => {
  let dayCounter = 0
  let sum
  let week = -1

  const table = new Table({
    head: ['Date', 'Work Hours'],
    colWidths: [25, 28]
  })

  records.forEach(record => {
    const date = moment(record.date)
    const weekNumber = date.week()
    const workHours = record.workHours

    if (weekNumber > week) {
      // add sum if the week actually changes, but not at the beginning
      if (week > -1) {
        table.push(sumRow(sum, week))
      }
      sum = workHours
      dayCounter = 0
      week = weekNumber
    } else {
      sum.add(workHours)
      dayCounter += 1
    }

    table.push([{ content: date.format(pattern) }, formatWorkHours(workHours)])
    addNotes(table, record)
  })
  // make sure there is a sum if it was not added before and we have more than one row
  if (dayCounter >= 0) {
    table.push(sumRow(sum, week))
  }

  return table.toString()
}

const addNotes = (table, record) => {
  record.notes &&
    record.notes.forEach(note => {
      table.push([{ content: `  ${note.createdat}` }, note.note])
    })
}

const sumRow = (sum, week) => [
  { content: `Sum in week ${week}` },
  formatSum(sum)
]

// pathValidator function
// normalize given path and check for validity
const pathValidator = option => {
  // empty or unset path resets config to ''
  if (typeof option === 'boolean' || option.trim() === '') {
    return { value: '' }
  }

  // trim and expand home dir for given option
  const pathName = expandHomeDir(option.trim())

  try {
    // get stat of given path
    const stat = fs.statSync(pathName)

    // given path points to a file -> ok
    if (stat.isFile()) {
      return { value: pathName }
    }
  } catch (e) {
    // path does not exist, check whether directory part exist
    if (fs.existsSync(path.dirname(pathName))) {
      return { value: pathName }
    }
  }

  // fallback:
  // either given path is a directory or
  // path is not existing and not in an existing directory
  throw new Error('Given path is not a valid database-file')
}

// formatValidator function
// check given path for validity
const formatValidator = option => {
  if (typeof option === 'boolean' || option.trim() === '') {
    throw new Error(
      'Given format is not valid, search the internet for "momentjs time formats"'
    )
  }

  return option
}

module.exports = {
  composeDateObject,
  printSingleDayReport,
  printAllDaysReport,
  printSearchResults,
  shouldWorkUntil,
  calculateWorkHours,
  formatWorkHours,
  formatValidator,
  pathValidator
}
