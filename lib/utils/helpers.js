'use strict'

// packages
const moment = require('moment')
const Table = require('cli-table2')

// input moment which also contains days, output formated sum
const formatSum = (workHours) => {
  const hours = workHours.days() * 24 + workHours.hours()
  return toString(hours, workHours.minutes())
}

// input moment, output formated work hours
const formatWorkHours = (workHours) => (
  // to add negative sign
  toString(workHours.hours(), workHours.minutes())
)

// input hours and minutes, output string
const toString = (hours, minutes) => (
  `${hours} Hours and ${minutes} Minutes`
)

// input 'HH:mm', output moment object
const composeDateObject = (timeString) => {
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
  const duration = moment.duration(endDate.diff(startDate.add({minutes: pause})))
  return duration
}

// to tell users when they can go home!
const shouldWorkUntil = (start, logger, CONFIG) => {
  const goHomeTime = composeDateObject(start)
    .add({hour: CONFIG.HOURS_IN_A_WORK_DAY})
    .add({minutes: CONFIG.BREAK_DEFAULT})
    .format('HH:mm')

  logger.info(
    '\n Working until ',
    goHomeTime,
    `will make it a full (${CONFIG.HOURS_IN_A_WORK_DAY}) day`
  )
}

// input obj. record
// output console.loggable table
const printSingleDayReport = (record) => {
// instantiate
  var table = new Table()

  table.push(
    { 'Today you worked:': record.dayReport },
    { 'Start:': record.start },
    { 'End:': record.end || 'Not set yet' },
    { 'Break duration:': record.breakDuration + ' minutes' },
    { 'Date:': record.date }
  )
  record.notes.forEach((note) => {
    if (!note) {
      return
    }
    table.push({'Note': note.createdat + ' ' + note.note})
  })
  return table.toString()
}

// full report of all days
const printAllDaysReport = (records, CONFIG) => {
  CONFIG = CONFIG || {}
  const pattern = CONFIG.DATE_FORMAT || 'YYYY-MM-DD'
  const table = buildTable(records, pattern)

  console.log('\n Report of all the days \n')
  console.log(table.toString())
}

// build a beautiful table
const buildTable = (records, pattern) => {
  let dayCounter = 0
  let sum
  let week = -1

  const table = new Table({
    head: [{colSpan: 2, content: 'Date'}, 'Work Hours'],
    style: {head: [], border: []},
    colWidths: [10, 15, 28]
  })

  records.forEach((record) => {
    const date = moment(record.date)
    const weekNumber = date.week()
    const workHours = record.workHours

    if (weekNumber > week) {
      // add sum if the week actually changes, but not at the beginning
      if (dayCounter >= 1) {
        table.push(sumRow(sum, week))
      }
      sum = workHours
      dayCounter = 0
      week = weekNumber
    } else {
      sum.add(workHours)
      dayCounter += 1
    }

    table.push([{colSpan: 2, content: date.format(pattern)}, formatWorkHours(workHours)])
    addNotes(table, record)
  })
  // make sure there is a sum if it was not added before and we have more than one row
  if (dayCounter >= 1) {
    table.push(sumRow(sum, week))
  }
  return table
}

const addNotes = (table, record) => {
  record.notes && record.notes.forEach((note) => {
    table.push([{colSpan: 2, content: '  ' + note.createdat}, note.note])
  })
}

const sumRow = (sum, week) => (
  [{colSpan: 2, content: `Sum in week ${week}`}, formatSum(sum)]
)

module.exports = {
  composeDateObject,
  printSingleDayReport,
  printAllDaysReport,
  shouldWorkUntil,
  calculateWorkHours,
  formatWorkHours
}
