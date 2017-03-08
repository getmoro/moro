// packages
const moment = require('moment')

// ours
const logger = require('./logger.js')

// input 'HH:mm', output moment object
const composeDateObject = (timeString) => {
  const hour = timeString.split(':')[0]
  const minutes = timeString.split(':')[1]
  return moment({ hour, minutes })
}

const printSingleDayReport = (record) => {
  logger.info(` \n
  Start:        ${record.start}
  End:          ${record.end}
  Total break: ${record.breakDuration}(minutes)
  Date:         ${record.date}
  `)
}

module.exports = {
  composeDateObject,
  printSingleDayReport
}
