const ora = require('ora')
const mainSpinner = ora({
  text: 'Moro',
  spinner: 'hearts',
  color: 'red'
})

module.exports = mainSpinner
