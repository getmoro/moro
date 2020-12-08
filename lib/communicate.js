'use strict'

const moment = require('moment')
const axios = require('axios').default
const db = require('./db.js')
const constants = require('./constants.json')

const TODAY = moment().format('YYYY-MM-DD')
const NOW = moment().format('HH:mm')

const test = (args, options, logger) => {
  axios.get(constants.SYNC_SERVER)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      process.exit(0)
    })
}

const sync = (args, options, logger) => {
  axios.get(constants.SYNC_SERVER)
    .then((response) => {
      console.log(response.data);
      // check the 'log' table exists
      db.getLastLogData(db.knex, 'records')
        .then((lastLog) => {
          // lastLog = Get last row of 'log' table
          let lastLogId = 0
          if (lastLog.length)
            lastLogId = lastLog[0].id
          console.log(lastLogId);
          // brings up 'records' later than 'lastLog.date'
          db.getRowsAfter(db.knex, 'records', lastLogId)
            .then((recentLogs) => {
              // send them to the server
              console.log('Sending records to server...');

              // save a new log in 'logs' table if successful
              db.setLogData(db.knex, { lastLogId: recentLogs[recentLogs.length - 1].id, type: 'records' })
                .then((result) => {
                  console.log('Data inserted in log table', result);
                  process.exit(0)
              })
          })
        })
    })
}

module.exports = {
  test,
  sync
}
