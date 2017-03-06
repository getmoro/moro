const knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: './data.db'
  },
  useNullAsDefault: true
})

// Create a table
const createTable = knex.schema.createTableIfNotExists('records', function (table) {
  table.increments('id')
  table.date('date')
  table.time('start')
  table.time('end')
  table.integer('breakDuration')
})
.catch((e) => console.log('Errors in createTable', e))

const updateDatabase = (
  date, start, end, breakDuration, action
) => {
// Then query the table...
  createTable
    .then(() => {
      return knex
        .select('*')
        .from('records')
        .where({date})
    })
    .then((row) => {
      if (row.length === 1) {
        // date is there, update the row
        switch (action) {
          case 'setStart':
            return knex('records').update({start}).where({date})
          case 'setEnd':
            return knex('records').update({end}).where({date})
          case 'setBreakDuration':
            return knex('records').update({breakDuration}).where({date})
        }
      } else {
        // date doesn't exist, insert it
        return knex.insert({date, start, end, breakDuration}).into('records')
      }
    })
    .then((row) => {
      console.log(row)
    })
  // Finally, add a .catch handler for the promise chain
    .catch(function (e) {
      console.error(e)
    })
    .then(() => {
      knex.destroy()
    })
}

const readData = (date) => {
// Then query the table...
  createTable
    .then(() => {
      return knex
        .select('*')
        .from('records')
        .where({date})
    })
    .map((row) => {
      console.log(row)
    })
    .then(() => {
      knex.destroy()
    })
}

module.exports = { updateDatabase, readData }
