const ora = require('ora')
const mainSpinner = ora({
  text: 'loading',
  spinner: 'hearts',
  color: 'red'
})

module.exports = mainSpinner
