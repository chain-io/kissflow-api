const utils = require('../utils')

describe('utils', () => {
  let auth

  beforeEach(() => {
    auth = {
      apiKey: 'api123',
      accountId: 'acct123'
    }
  })

  it('should make headers from auth', () => {
    expect(utils.makeHeaders(auth)).toEqual({
      api_key: 'api123'
    })
  })
  it('should make headers with email', () => {
    auth = Object.assign({ email: 'joe@sample.com' }, auth)
    expect(utils.makeHeaders(auth)).toEqual({
      api_key: 'api123',
      email_id: 'joe@sample.com'
    })
  })

  it('should make server from auth', () => {
    expect(utils.makeServer(auth)).toEqual('acct123.appspot.com')
  })

  it('should make uri from auth and components', () => {
    expect(utils.makeUri(auth, ['a', 'b c'])).toEqual(
      'https://acct123.appspot.com/api/1/a/b%20c'
    )
  })
})
