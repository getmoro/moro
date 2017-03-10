// packages
const moment = require('moment')
const Table = require('cli-table2')

// input 'HH:mm', output moment object
const composeDateObject = (timeString) => {
  const hour = timeString.split(':')[0]
  const minutes = timeString.split(':')[1]
  return moment({ hour, minutes })
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
    { 'Today you worekd:': record.dayReport },
    { 'Start:': record.start },
    { 'End:': record.end },
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
const printAllDaysReport = (records) => {
  // instantiate beautiful table
  const table = new Table()
  records.forEach((record) => {
    const report = record.formattedWorkHours
    const formattedRecord = {}
    formattedRecord[record.date] = report
    table.push(formattedRecord)
  })

  console.log('\n Full report of all days you used moro\n')
  console.log(table.toString())
}

module.exports = {
  composeDateObject,
  printSingleDayReport,
  printAllDaysReport,
  shouldWorkUntil
}
