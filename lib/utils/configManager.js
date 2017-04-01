'use strict'

// packages and natives
const fs = require('fs')
const path = require('path')
const jsonfile = require('jsonfile')
const osHomedir = require('os-homedir')
const Promise = require('bluebird')

// ours
const spinner = require('./spinner.js')
const constants = require('../constants.json')

const CONFIG_FILE = path.join(__dirname, '..', 'config.json')
const dbTestFile = path.join(__dirname, '..', '..', 'tests', constants.DB_FILE_FOR_TESTS)
const isTestMode = process.env.MORO_TEST_MODE === 'true'

if (!fs.existsSync(CONFIG_FILE)) {
  spinner.fail("Config file couldn't be found")
  process.exit(1)
}

// log info about test mode
const logTestMode = (isTestMode) => {
  if (isTestMode) {
    spinner.info('moro running in test mode, a temporary db will be used').start()
  }
}

const getDBFilePath = () => {
  const configPath = jsonfile.readFileSync(CONFIG_FILE).DB_FILE_MAIN
  const defaultPath = path.join(osHomedir(), constants.DB_FILE_MAIN)

  // test mode
  if (isTestMode) {
    return dbTestFile
  }

  // user hasn't set any custom db path
  if (configPath === '') {
    return defaultPath
  } else {
    // user has set a custom db path
    return configPath
  }
}
// CONFIG has stuff that can be changed in runtime, so
const configLoaded = new Promise((resolve, reject) => {
  jsonfile.readFile(CONFIG_FILE, (err, obj) => {
    if (err) {
      reject(err)
    }
    resolve(obj)
  })
})

// getConfig
// setConfig
// getDBFile
module.exports = {
  getDBFilePath: getDBFilePath,
  logTestMode: logTestMode,
  dbTestFile: dbTestFile,
  configLoaded: configLoaded,
  CONFIG_FILE: CONFIG_FILE
}
