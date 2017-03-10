import test from 'ava'
import {printSingleDayReport, printAllDaysReport} from './utils/helpers.js'

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
  formattedWorkHours: '0 Hours and -30 Minutes'
}]

test('singleDayReport runs without crashing', t => {
  t.pass(printSingleDayReport(sampleDayRecord))
})

test('printAllDaysReport runs without crashing', t => {
  t.pass(printAllDaysReport(sampleFullReprotRecord))
})
