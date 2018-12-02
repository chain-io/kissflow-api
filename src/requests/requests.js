const rp = require('request-promise-native')
const { makeHeaders, makeUri } = require('../utils')

const makeUriComponents = (opts) => {
  const fullOpts = Object.assign({ pageSize: 50, pageNumber: 1 }, opts)
  const components = [
    fullOpts.processName,
    'list'
  ]
  if (fullOpts.processStep) {
    components.push(fullOpts.processStep)
  }
  return components.concat([`p${fullOpts.pageNumber}`, fullOpts.pageSize])
}

module.exports = async (auth, opts) => rp({
  headers: makeHeaders(auth),
  uri: makeUri(auth, makeUriComponents(opts)),
  json: true
})
