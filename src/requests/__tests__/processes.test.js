jest.mock('request-promise-native')
const rp = require('request-promise-native')
const processes = require('../processes')

describe('processes', () => {
  let apiKey
  let accountId
  let expectedResponse

  beforeEach(() => {
    apiKey = 'api123'
    accountId = 'acct123'
    expectedResponse = [{
      Id: 'Travel_Claim'
    }]
  })

  it('should list processes', () => {
    rp.mockReturnValue(Promise.resolve(expectedResponse))

    return processes({ apiKey, accountId })
    .then((result) => {
      expect(result).toEqual(expectedResponse)
      expect(rp).toHaveBeenCalledWith({
        headers: {
          api_key: 'api123'
        },
        uri: 'https://acct123.appspot.com/api/1/process',
        json: true
      })
    })
  })
})
