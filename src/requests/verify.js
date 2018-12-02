const rp = require('request-promise-native')
const { makeHeaders, makeServer } = require('../utils')

module.exports = async (auth) => {
  const result = await rp({
    headers: makeHeaders(auth),
    uri: `https://${makeServer(auth)}/api/1/verify`,
    json: true
  })

  return result.success === 'All O.K.'
}
