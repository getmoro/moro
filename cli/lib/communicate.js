'use strict';

const axios = require('axios').default;
const db = require('./db.js');
const constants = require('./constants.json');

const testServerStatus = () =>
  axios.get(constants.PING_SERVER).then((res) => console.log(res.data));

const getLastLogDataOfType = (type) => db.getLastLogData(db.knex, type);

const getItemsAfterLastLog = (type, lastLog) => {
  const lastLogId = lastLog.length ? lastLog[0].id : 0;
  console.log('lastLogId', lastLogId);
  return db.getRowsAfter(db.knex, type, lastLogId);
};

const sendItemsToServer = (type, timeRecords) => {
  switch (type) {
    case constants.TABLES.records:
      return sendTimeRecordsToServer(type, timeRecords);

    // TODO: Support sync notes
    // case constants.TABLES.notes:
    //   return sendNotesToServer(type, recentItems);
  }
};

const sendTimeRecordsToServer = (type, timeRecords) => {
  const query = `
    mutation addTimeRecords($timeRecords:[TimeRecordInput!]!){
      addTimeRecords(timeRecords:$timeRecords)
    }
  `;
  const variables = {
    timeRecords: timeRecords.map((record) => ({
      date: record.date,
      start: record.start,
      end: record.end,
      breakDuration: record.breakDuration,
    })),
  };

  return axios.post(constants.SYNC_SERVER, JSON.stringify({ query, variables }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

const saveSyncLog = (type, lastLogId) =>
  db.setLogData(db.knex, {
    type,
    lastLogId,
  });

const syncTable = async (type) => {
  try {
    await testServerStatus();
    const lastSyncedLog = await getLastLogDataOfType(type);
    console.log('lastSyncedLog', lastSyncedLog);
    const recentItems = await getItemsAfterLastLog(type, lastSyncedLog);
    console.log('recentItems', recentItems);
    const lastItem = recentItems[recentItems.length - 1];
    console.log('lastItem', lastItem);
    if (lastItem) {
      console.log(constants.TEXT.sync.syncing + type + '...');
      await sendItemsToServer(type, recentItems);
      console.log('lastItem.id', lastItem.id);
      await saveSyncLog(type, lastItem.id);
      console.log(constants.TEXT.sync.insertLogTable);
    } else {
      console.log(constants.TEXT.sync.nothingToSyncPrefix + type);
    }
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

const syncRecords = () => syncTable(constants.TABLES.records);

const syncNotes = () => syncTable('notes');

const syncFinish = () => {
  console.log(constants.TEXT.sync.allDone);
  process.exit(0);
};

const sync = async (args, options, logger) => {
  await syncRecords();
  // await syncNotes();
  syncFinish();
};

const test = async () => {
  await testServerStatus();
  process.exit(0);
};

module.exports = {
  test,
  syncTable,
  sync,
};
