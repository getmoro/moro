'use strict'

// packages
const moment = require('moment')
const Table = require('cli-table2')

// input locale, output formated work hours
const formatWorkHours = (workHours) => {
  const hours = workHours.get('hours')
  const minutes = workHours.get('minutes')
  // to add negative sign
  return `${hours} Hours and ${minutes} Minutes`
}

// input 'HH:mm', output moment object
const composeDateObject = (timeString) => {
  if (!timeString || timeString.length < 5) {
    return
  }
  const hour = timeString.split(':')[0]
  const minutes = timeString.split(':')[1]
  return moment({ hour, minutes })
}

// input start, end, pause, output moment
const calculateWorkHours = (start, end, pause) => {
  // to assign hours to moment objects, we need the diff so current moment is fine
  const startDate = composeDateObject(start)
  const endDate = composeDateObject(end) || moment()

  return moment
    .duration(endDate.diff(startDate.add({minutes: pause})))
}

// to tell users when they can go home!
const shouldWorkUntil = (start, logger, CONFIG) => {
  const goHomeTime = composeDateObject(start)
    .add({hour: CONFIG.HOURS_IN_A_WORK_DAY})
    .add({minutes: CONFIG.BREAK_DEFAULT})
    .format('HH:mm')
  logger.info('\n Working until ', goHomeTime, `will make it a full (${CONFIG.HOURS_IN_A_WORK_DAY}) day`)
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
  // instantiate beautiful table
  const table = new Table()
  records.forEach((record) => {
    const date = moment(record.date)

    const formattedRecord = {}
    formattedRecord[date.format(pattern)] = formatWorkHours(record.workHours)

    table.push(formattedRecord)

    record.notes && record.notes.forEach((note) => {
      const noteRecord = {}
      noteRecord[' ' + note.createdat] = note.note
      table.push(noteRecord)
    })
  })

  console.log('\n Full report of all days you used moro\n')
  console.log(table.toString())
}

module.exports = {
  composeDateObject,
  printSingleDayReport,
  printAllDaysReport,
  shouldWorkUntil,
  calculateWorkHours,
  formatWorkHours
}
