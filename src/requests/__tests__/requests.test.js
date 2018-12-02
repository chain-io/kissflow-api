jest.mock('request-promise-native')
const rp = require('request-promise-native')
const requests = require('../requests')

describe('requests', () => {
  let apiKey
  let accountId
  let opts
  let expectedResponse

  beforeEach(() => {
    apiKey = 'api123'
    accountId = 'acct123'
    opts = {
      processName: 'A B',
      processStep: 'C',
      pageNumber: 2,
      pageSize: 10
    }
    expectedResponse = [{
      Id: '123'
    }]
    rp.mockReturnValue(Promise.resolve(expectedResponse))
  })

  it('should list requests', () => {
    return requests({ apiKey, accountId }, opts)
    .then((result) => {
      expect(result).toEqual(expectedResponse)
      expect(rp).toHaveBeenCalledWith({
        headers: {
          api_key: 'api123'
        },
        uri: 'https://acct123.appspot.com/api/1/A%20B/list/C/p2/10',
        json: true
      })
    })
  })

  it('should default pageSize', () => {
    delete opts.pageSize
    return requests({ apiKey, accountId }, opts)
    .then((result) => {
      expect(result).toEqual(expectedResponse)
      expect(rp).toHaveBeenCalledWith({
        headers: {
          api_key: 'api123'
        },
        uri: 'https://acct123.appspot.com/api/1/A%20B/list/C/p2/50',
        json: true
      })
    })
  })

  it('should default pageNumber', () => {
    delete opts.pageNumber
    return requests({ apiKey, accountId }, opts)
    .then((result) => {
      expect(result).toEqual(expectedResponse)
      expect(rp).toHaveBeenCalledWith({
        headers: {
          api_key: 'api123'
        },
        uri: 'https://acct123.appspot.com/api/1/A%20B/list/C/p1/10',
        json: true
      })
    })
  })

  it('should work without processStep', () => {
    delete opts.processStep
    return requests({ apiKey, accountId }, opts)
    .then((result) => {
      expect(result).toEqual(expectedResponse)
      expect(rp).toHaveBeenCalledWith({
        headers: {
          api_key: 'api123'
        },
        uri: 'https://acct123.appspot.com/api/1/A%20B/list/p2/10',
        json: true
      })
    })
  })
})
