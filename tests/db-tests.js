import test from 'ava'
import {
  createTable,
  updateDatabase,
  getDateReport,
  removeDatabase,
  calculateWorkHours
} from '../db.js'

// natives
const path = require('path')
const fs = require('fs')

// packages
const osHomedir = require('os-homedir')

// constants
const { DB_FILE_FOR_TESTS } = require('../constants.json')

const knexForTestsInMemory = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: ''
  },
  useNullAsDefault: true
})

const knexForTestsInFile = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: path.join(osHomedir(), DB_FILE_FOR_TESTS)
  },
  useNullAsDefault: true
})

test.serial('db file is created properly', async t => {
  const dbFilePath = path.join(osHomedir(), DB_FILE_FOR_TESTS)
  await createTable(knexForTestsInFile)
  const fileGotCreated = fs.existsSync(dbFilePath)
  t.true(fileGotCreated)
})

test.serial('removeDatabase removes db file', async t => {
  const dbFilePath = path.join(osHomedir(), DB_FILE_FOR_TESTS)
  try {
    await removeDatabase(DB_FILE_FOR_TESTS)
  } catch (e) {
    console.log(e)
  }
  let fileGotRemoved = !fs.existsSync(dbFilePath)
  t.true(fileGotRemoved)
})

test('createTable makes tables alright', async t => {
  await createTable(knexForTestsInMemory)
  const hasRecordsTable = await knexForTestsInMemory.schema.hasTable('records')
  const hasNotesTable = await knexForTestsInMemory.schema.hasTable('notes')
  const hasBothTables = hasRecordsTable && hasNotesTable

  t.true(hasBothTables)
})
test('updateDatabase inserts and reads correctly', async t => {
  const options = {
    breakDuration: 25,
    date: '2017-03-11',
    end: '17:35',
    id: 1,
    notes: [],
    start: '09:15'
  }
  await updateDatabase(options, knexForTestsInMemory)
  const recordInDb = await getDateReport(options.date, knexForTestsInMemory)
  t.deepEqual(recordInDb, options)
})

test('calculateWorkHours works', async t => {
  const options = {
    breakDuration: 25,
    date: '2017-03-11',
    end: '17:35',
    id: 1,
    notes: [],
    start: '09:15'
  }
  const correctResult = { date: '2017-03-11',
    formattedWorkHours: '7 Hours and 55 Minutes' }
  await updateDatabase(options, knexForTestsInMemory)
  const calculatedWorkHours = await calculateWorkHours(options.date, knexForTestsInMemory)
  t.deepEqual(calculatedWorkHours, correctResult)
})
