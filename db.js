// native
const path = require('path')
const fs = require('fs')

// packages
const moment = require('moment')
const osHomedir = require('os-homedir')

// constants
const DB_FILE = '.moro-data.db'

// ours
const helpers = require('./utils/helpers.js')

const knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: path.join(osHomedir(), DB_FILE)
  },
  useNullAsDefault: true
})

const removeDatabase = () => {
  const databaseFile = path.join(osHomedir(), DB_FILE)

  // delete the database file
  fs.unlink(databaseFile, (err) => {
    if (err) {
      console.log('problem in deleting the file ', err)
    }
    console.log('database file deleted successfully')
    console.log('press ctrl - c to exit')
  })
}

// Create a table
const createTable = knex.schema.createTableIfNotExists('records', (table) => {
  table.increments('id')
  table.date('date')
  table.time('start')
  table.time('end')
  table.integer('breakDuration')
})
  .createTableIfNotExists('notes', (table) => {
    table.increments('id')
    table.date('date')
    table.string('createdat')
    table.text('note')
  })
  .catch((e) => console.log('Errors in createTable', e))
// input is an object,  {date, start[optional], end[optional], breakDuration, action}
const updateDatabase = (options) => {
  const {date, start, end, breakDuration, action, note, createdat} = options

  return createTable
    .then(() => {
      return knex
        .select('*')
        .from('records')
        .where({date})
    })
    .then((row) => {
      // date is there, update the row
      if (row.length === 1) {
        switch (action) {
          case 'setStart':
            return knex('records').update({start}).where({date})
          case 'setEnd':
            return knex('records').update({end}).where({date})
          case 'setBreakDuration':
            return knex('records').update({breakDuration}).where({date})
          case 'addNote':
            return knex.insert({date, note, createdat}).into('notes')
        }
      } else {
        // date doesn't exist, insert it
        return knex.insert({date, start, end, breakDuration}).into('records')
      }
    })
    // Finally, add a .catch handler for the promise chain
    .catch(function (e) {
      console.error(e)
    })
}

// gets data for a single day
const getDateReport = (date) => (
  // Then query the table...
  createTable
  .then(() => {
    return knex
      .select('*')
      .from('records')
      .where({date})
  })
  .then((row) => {
    return knex
      .select('*')
      .from('notes')
      .where({date})
      .then((notes) => {
        if (row[0]) {
          row[0].notes = notes
        }
        return row[0]
      })
  })
  .catch(err => {
    console.log(err)
  })
)

// if start / end is not yet marked, yell at the user
const getUndoneWarnings = (dayRecord) => {
  if (!dayRecord.start) {
    return 'Start of your work day is not marked yet!'
  }
  if (!dayRecord.end) {
    return 'The end of your work day is not marked! run moro with no arguments to set it'
  }
  return undefined
}
const calculateWorkHours = (date) => (
  getDateReport(date)
  .then((data) => {
    if (getUndoneWarnings(data)) {
      console.log(getUndoneWarnings(data))
      process.exit(0)
    }
    // console.log('data is: ', data)
    const getBreak = (data) => data.breakDuration

    // to assign hours to moment objects, we need the diff so current moment is fine
    const start = helpers.composeDateObject(data.start)
    const end = helpers.composeDateObject(data.end)

    const workHours = moment
      .duration(end.diff(start.add({minutes: getBreak(data)})))

    const hours = workHours.get('hours')
    const minutes = workHours.get('minutes')
    // to add negative sign
    const formattedWorkHours = `${hours} Hours and ${minutes} Minutes`
    return { date, formattedWorkHours }
  })
  .catch((err) => {
    console.log(err)
  })
)

const getFullReport = () => {
  return createTable
    .then(() => {
      return knex.select('date')
        .from('records')
        .whereNotNull('start')
        .whereNotNull('end')
        .map((row) => calculateWorkHours(row.date))
        .then((results) => {
          helpers.printAllDaysReport(results)
        })
        .catch((err) => { console.error(err) })
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  getDateReport,
  updateDatabase,
  calculateWorkHours,
  getFullReport,
  removeDatabase
}
