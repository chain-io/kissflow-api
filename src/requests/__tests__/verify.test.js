jest.mock('request-promise-native')
const rp = require('request-promise-native')
const verify = require('../verify')

describe('verify', () => {
  let apiKey
  let accountId

  beforeEach(() => {
    apiKey = 'api123'
    accountId = 'acct123'
  })

  it('should verify request', () => {
    rp.mockReturnValue(Promise.resolve({
      success: 'All O.K.'
    }))

    return verify({ apiKey, accountId })
    .then((result) => {
      expect(result).toBe(true)
      expect(rp).toHaveBeenCalledWith({
        headers: {
          api_key: 'api123'
        },
        uri: 'https://acct123.appspot.com/api/1/verify',
        json: true
      })
    })
  })

  it('should return false if response is not { success: "All O.K." }', () => {
    rp.mockReturnValue(Promise.resolve({
      something: 'else'
    }))

    return verify({ apiKey, accountId })
    .then((result) => {
      expect(result).toBe(false)
      expect(rp).toHaveBeenCalledWith({
        headers: {
          api_key: 'api123'
        },
        uri: 'https://acct123.appspot.com/api/1/verify',
        json: true
      })
    })
  })
})
