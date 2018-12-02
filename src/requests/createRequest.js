const rp = require('request-promise-native')
const { makeHeaders, makeUri } = require('../utils')

const makeComponents = (opts) => ([
  opts.processName,
  opts.submit ? 'submit' : 'create'
])

module.exports = async (auth, opts) => {
  const post = {
    method: 'POST',
    headers: makeHeaders(auth),
    uri: makeUri(auth, makeComponents(opts)),
    json: true
  }

  if (opts.data) {
    post.form = opts.data
  }
  return rp(post)
}
