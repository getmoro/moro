'use strict';

// native
const fs = require('fs-extra');

// ours
const helpers = require('./utils/helpers.js');
const spinner = require('./utils/spinner.js').mainSpinner;
const spinnerSucceed = require('./utils/spinner.js').spinnerSucceed;
const configManager = require('./utils/configManager.js');
const dbFile = configManager.getDBFilePath();

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbFile,
  },
  useNullAsDefault: true,
});

const removeDatabase = () => {
  configManager.logTestMode();
  return fs
    .unlink(dbFile)
    .then(() => {
      spinnerSucceed(spinner, 'Database file deleted successfully\n');
    })
    .catch((error) => {
      spinner.fail('Error in deleting the database. \n');
      console.log(error);
    });
};

// Create a table
const createTable = (knex) =>
  knex.schema.hasTable('records').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('records', (table) => {
          table.increments('id');
          table.date('date');
          table.time('start');
          table.time('end');
          table.integer('breakDuration');
        })
        .createTable('notes', (table) => {
          table.increments('id');
          table.date('date');
          table.string('createdat');
          table.text('note');
        })
        .catch((e) => spinner.fail(`Errors in createTable ${e}`));
    }
  });

// input is an object,  {date, start[optional], end[optional], breakDuration, action}
const updateDatabase = (options, knex) => {
  const date = options.date;
  const start = options.start;
  const end = options.end;
  const breakDuration = options.breakDuration;
  const action = options.action;
  const note = options.note;
  const createdat = options.createdat;

  return createTable(knex)
    .then(() => {
      return knex.select('*').from('records').where({ date });
    })
    .then((row) => {
      // date is there, update the row
      if (row.length === 1) {
        switch (action) {
          case 'setStart':
            return knex('records').update({ start }).where({ date });
          case 'setEnd':
            return knex('records').update({ end }).where({ date });
          case 'setBreakDuration':
            return knex('records').update({ breakDuration }).where({ date });
          case 'addNote':
            return knex.insert({ date, note, createdat }).into('notes');
        }
      } else {
        // date doesn't exist, insert it
        return knex.insert({ date, start, end, breakDuration }).into('records');
      }
    })
    .catch(spinner.fail);
};

// gets data for a single day
const getDateReport = (date, knex) =>
  // Then query the table...
  createTable(knex)
    .then(() => {
      return knex.select('*').from('records').where({ date });
    })
    .then((row) => {
      return knex
        .select('*')
        .from('notes')
        .where({ date })
        .then((notes) => {
          if (row[0]) {
            row[0].notes = notes;
          }
          return row[0];
        });
    })
    .catch(spinner.fail);

// if start / end is not yet marked, yell at the user
const getUndoneWarnings = (dayRecord) => {
  if (!dayRecord || !dayRecord.start) {
    return 'Start of your work day is not marked yet! Run "moro" to set it. Start needs to be set before I can give you the report\n';
  }

  return undefined;
};

const calculateWorkHours = (date, knex) =>
  getDateReport(date, knex)
    .then((data) => {
      if (getUndoneWarnings(data)) {
        const warning = getUndoneWarnings(data);
        if (warning !== undefined) {
          spinner.warn(warning);
        }
        process.exit(0);
      }
      // console.log('data is: ', data)
      const getBreak = (data) => data.breakDuration;
      const notes = data.notes;

      const workHours = helpers.calculateWorkHours(data.start, data.end, getBreak(data));

      return { date, workHours, notes };
    })
    .catch(spinner.fail);

const getFullReport = (knex, CONFIG) => {
  CONFIG = CONFIG || {};
  return createTable(knex)
    .then(() => {
      return knex
        .select('date')
        .from('records')
        .whereNotNull('start')
        .whereNotNull('end')
        .map((row) => calculateWorkHours(row.date, knex))
        .then((results) => {
          helpers.printAllDaysReport(results, CONFIG);
          return results;
        })
        .catch(spinner.fail);
    })
    .catch(spinner.fail);
};

const getSearchTerm = (searchTerm, knex, CONFIG) => {
  CONFIG = CONFIG || {};

  return createTable(knex)
    .then(() => {
      return knex
        .select('date', 'createdat', 'note')
        .from('notes')
        .where('note', 'like', '%' + searchTerm + '%')
        .then((results) => {
          helpers.printSearchResults(results, CONFIG);
          return results;
        })
        .catch(spinner.fail);
    })
    .catch(spinner.fail);
};

// gets data after specific time
const getRowsAfter = (knex, table, recordId) =>
  createTable(knex)
    .then(() => {
      return knex.select('*').from(table).where('id', '>', recordId);
    })
    .catch(spinner.fail);

// Create a log table
const createLogTable = (knex) =>
  knex.schema.hasTable('logs').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('logs', (table) => {
          table.increments('id');
          table.string('type');
          table.integer('lastLogId');
        })
        .catch((e) => spinner.fail(`Errors in createTable ${e}`));
    }
  });

const getLastLogData = (knex, type) => {
  return createLogTable(knex)
    .then(() => {
      return knex
        .select('*')
        .from('logs')
        .where({ type })
        .orderBy('lastLogId', 'desc')
        .limit(1)
        .then((rows) => {
          return rows;
        })
        .catch((e) => spinner.fail(`Errors in fetch - ${e}`));
    })
    .catch((e) => spinner.fail(`Errors in createLogTable - ${e}`));
};

const setLogData = (knex, data) => {
  return createLogTable(knex)
    .then(() => {
      return knex.insert(data).into('logs');
    })
    .catch((err) => console.log(error));
};

module.exports = {
  createTable,
  createLogTable,
  getDateReport,
  updateDatabase,
  getLastLogData,
  setLogData,
  getRowsAfter,
  calculateWorkHours,
  getFullReport,
  getSearchTerm,
  removeDatabase,
  knex,
};
