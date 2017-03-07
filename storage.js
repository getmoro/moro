const moment = require('moment')

const knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: './data.db'
  },
  useNullAsDefault: true
})

// Create a table
const createTable = knex.schema.createTableIfNotExists('records', (table) => {
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
      // date is there, update the row
      if (row.length === 1) {
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

const getDateReport = (date) => (
  // Then query the table...
  createTable
  .then(() => {
    return knex
      .select('*')
      .from('records')
      .where({date})
  })
  .then((row) => row[0])
  .catch(err => {
    console.log(err)
  })
)

const calculateWorkHours = (date) => (
  getDateReport(date)
    .then((data) => {
      let workHoursIsNegative = false
      // console.log('data is: ', data)
      const getStartHour = (data) => data.start.split(':')[0]
      const getStartMinute = (data) => data.start.split(':')[1]
      const getEndHour = (data) => data.end.split(':')[0]
      const getEndMinute = (data) => data.end.split(':')[1]
      const getBreak = (data) => data.breakDuration

      // to assign hours to moment objects, we need the diff so current moment is fine
      const start = moment({
        hour: getStartHour(data), minute: getStartMinute(data)
      })
      const end = moment({
        hour: getEndHour(data), minute: getEndMinute(data)
      })
      const workHours = moment.duration(end.diff(start)).subtract(getBreak(data))

      // to show negative work hours
      if (start.isAfter(end)) {
        workHoursIsNegative = true
      }

      const workHoursHumanized = `${workHoursIsNegative ? '- (minus)' : ''} ${workHours.humanize()}`
      console.log('You have worked: ', workHoursHumanized, '')
      return workHoursHumanized
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      knex.destroy()
    })
)

module.exports = { updateDatabase, calculateWorkHours }
