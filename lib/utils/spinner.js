const ora = require('ora')
const mainSpinner = ora({
  text: '',
  spinner: 'flip',
  color: 'red'
})

module.exports = mainSpinner
