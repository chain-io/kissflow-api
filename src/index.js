const verify = require('./requests/verify')
const processes = require('./requests/processes')
const requests = require('./requests/requests')
const createRequest = require('./requests/createRequest')

module.exports = {
  verify,
  processes,
  requests,
  createRequest
}
