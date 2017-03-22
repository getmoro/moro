'use strict'

import test from 'ava'
import {
  printSingleDayReport,
  printAllDaysReport
} from '../lib/utils/helpers.js'

const moment = require('moment')

const sampleDayRecord = {
  id: 1,
  date: '2017-03-10',
  start: '05:15',
  end: '05:15',
  breakDuration: 30,
  notes: [ { id: 1, date: '2017-03-10', createdat: '06:29', note: 'hello' } ],
  dayReport: '0 Hours and -30 Minutes'
}

const sampleFullReprotRecord = [{
  date: '2017-03-10',
  workHours: moment.duration(moment('2017-03-10 17:10').diff(moment('2017-03-10 09:15')))
}, {
  date: '2017-03-11',
  workHours: moment.duration(moment('2017-03-11 17:10').diff(moment('2017-03-11 09:15')))
}]

test('singleDayReport runs without crashing', t => {
  t.pass(printSingleDayReport(sampleDayRecord))
})

test('printAllDaysReport runs without crashing', t => {
  t.pass(printAllDaysReport(sampleFullReprotRecord))
})
