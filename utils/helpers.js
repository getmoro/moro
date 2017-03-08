// packages
const moment = require('moment')
const Table = require('cli-table')

// input 'HH:mm', output moment object
const composeDateObject = (timeString) => {
  const hour = timeString.split(':')[0]
  const minutes = timeString.split(':')[1]
  return moment({ hour, minutes })
}

const printSingleDayReport = (record) => {
// instantiate
  var table = new Table()

// table is an Array, so you can `push`, `unshift`, `splice` and friends
  table.push(
    { 'Today ': record.dayReport },
    { 'Start ': record.start },
    { 'End': record.end },
    { 'Break duration': record.breakDuration + ' minutes' },
    { 'Date': record.date }
  )

  console.log('\n Today looks like this. Run moro --help if you need to edit your start, end or break duration for today \n')
  console.log(table.toString())
}

module.exports = {
  composeDateObject,
  printSingleDayReport
}
