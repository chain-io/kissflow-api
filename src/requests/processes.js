const rp = require('request-promise-native')
const { makeHeaders, makeUri } = require('../utils')

module.exports = async (auth) => rp({
  headers: makeHeaders(auth),
  uri: makeUri(auth, ['process']),
  json: true
})
