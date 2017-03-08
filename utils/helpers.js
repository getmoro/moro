// packages
const moment = require('moment')

// input 'HH:mm', output moment object
const composeDateObject = (timeString) => {
  const hour = timeString.split(':')[0]
  const minutes = timeString.split(':')[1]
  return moment({ hour, minutes })
}

module.exports = {
  composeDateObject
}
