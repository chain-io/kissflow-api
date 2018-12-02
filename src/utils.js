const makeHeaders = ({ apiKey, email }) => {
  const headers = {
    api_key: apiKey
  }
  if (email) {
    headers.email_id = email
  }
  return headers
}

const makeServer = ({ accountId }) => `${accountId}.appspot.com`

const makeUri = (auth, components) => {
  const path = components.map(c => encodeURI(c)).join('/')
  return `https://${makeServer(auth)}/api/1/${path}`
}

module.exports = {
  makeHeaders,
  makeServer,
  makeUri
}
