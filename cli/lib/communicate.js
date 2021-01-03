'use strict';

const moment = require('moment');
const axios = require('axios').default;
const db = require('./db.js');
const constants = require('./constants.json');

const TODAY = moment().format('YYYY-MM-DD');
const NOW = moment().format('HH:mm');

const test = (args, options, logger) => {
  axios
    .get(constants.SYNC_SERVER)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      process.exit(0);
    });
};

const syncTable = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .post(constants.SYNC_SERVER)
      .then((response) => {
        console.log(response.data);
        // check the 'log' table exists
        db.getLastLogData(db.knex, type).then((lastLog) => {
          // lastLog = Get last row of 'log' table
          let lastLogId = 0;
          if (lastLog.length) lastLogId = lastLog[0].id;
          console.log(lastLogId);
          // brings up items later than 'lastLog.date'
          db.getRowsAfter(db.knex, type, lastLogId).then((recentLogs) => {
            // send them to the server
            if (recentLogs[recentLogs.length - 1]) {
              console.log(constants.TEXT.sync.syncing + type + '...');
              axios
                .post(constants.SYNC_SERVER, { type, records: recentLogs })
                .then((response) => {
                  console.log(response.data);
                  // save a new log in 'logs' table if successful
                  db.setLogData(db.knex, {
                    type,
                    lastLogId: recentLogs[recentLogs.length - 1].id,
                  }).then((result) => {
                    console.log(constants.TEXT.sync.insertLogTable, result);
                    resolve(type);
                  });
                });
            } else {
              console.log(constants.TEXT.sync.nothingToSyncPrefix + type);
              resolve(type);
            }
          });
        });
      })
      .catch((err) => {
        console.log(constants.TEXT.sync.serverUnavailable);
        reject(err);
      });
  });
};

const sync = (args, options, logger) => {
  syncTable('records').then(() => {
    syncTable('notes').then(() => {
      console.log(constants.TEXT.sync.allDone);
      process.exit(0);
    });
  });
};

module.exports = {
  test,
  syncTable,
  sync,
};
