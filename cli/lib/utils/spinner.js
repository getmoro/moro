const ora = require('ora')
const mainSpinner = ora({
  text: '',
  spinner: 'flip',
  color: 'red'
})

const spinnerSucceed = (spinner, message) => {
  // for CI
  if (!spinner.enabled) {
    console.log(message)
  }

  return spinner.succeed(message)
}

const spinnerInfo = (spinner, message) => {
  // for CI
  if (!spinner.enabled) {
    console.log(message)
  }

  return spinner.info(message)
}

module.exports = {
  mainSpinner: mainSpinner,
  spinnerSucceed: spinnerSucceed,
  spinnerInfo: spinnerInfo
}
