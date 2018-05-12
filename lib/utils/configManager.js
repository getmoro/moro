'use strict'

// packages and natives
const path = require('path')
const jsonfile = require('jsonfile')
const osHomedir = require('os-homedir')
const Promise = require('bluebird')
const fs = require('fs')
const copySync = require('fs-extra').copySync

// ours
const spinner = require('./spinner.js').mainSpinner
const constants = require('../constants.json')
const isTestMode = process.env.MORO_TEST_MODE === 'true'
const dbTestFile = path.join(
  __dirname,
  '..',
  '..',
  'tests',
  constants.DB_FILE_FOR_TESTS
)

let configFile

const initConfigFile = () => {
  const CONFIG_FILE_DEFAULT = path.join(__dirname, '..', 'config.json')
  const CONFIG_FILE_LOCAL = path.join(osHomedir(), '.moro-config.json')
  if (!fs.existsSync(CONFIG_FILE_LOCAL)) {
    copySync(CONFIG_FILE_DEFAULT, CONFIG_FILE_LOCAL)
  }
  configFile = CONFIG_FILE_LOCAL
}

// log info about test mode
const logTestMode = isTestMode => {
  if (isTestMode) {
    spinner
      .info(
        'moro running in test mode, a temporary db will be used: ',
        dbTestFile
      )
      .start()
  }
}

const getDBFilePath = () => {
  initConfigFile()
  const configPath = jsonfile.readFileSync(configFile).DB_FILE_MAIN
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

// writes the config object into the file
const setConfig = config => {
  initConfigFile()
  jsonfile.writeFileSync(configFile, config)
}

// CONFIG has stuff that can be changed in runtime
const configLoaded = () =>
  new Promise((resolve, reject) => {
    initConfigFile()
    jsonfile.readFile(configFile, (err, obj) => {
      if (err) {
        reject(err)
      }
      resolve(obj)
    })
  })

module.exports = {
  initConfigFile: initConfigFile,
  getDBFilePath: getDBFilePath,
  logTestMode: logTestMode,
  dbTestFile: dbTestFile,
  configLoaded: configLoaded,
  configFile: configFile,
  setConfig: setConfig
}
