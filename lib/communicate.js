'use strict'

const axios = require('axios').default

const test = (args, options, logger) => {
  axios.get('http://localhost:3000/test')
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

module.exports = {
  test
}
