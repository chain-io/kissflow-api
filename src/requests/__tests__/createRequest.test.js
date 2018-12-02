jest.mock('request-promise-native')
const rp = require('request-promise-native')
const createRequest = require('../createRequest')

describe('createRequest', () => {
  let apiKey
  let accountId
  let opts
  let expectedResponse

  beforeEach(() => {
    apiKey = 'api123'
    accountId = 'acct123'
    opts = {
      processName: 'A B',
      data: {
        field1: 'ab c',
        field2: 100
      },
      submit: true
    }
    expectedResponse = [{
      Id: '123'
    }]
    rp.mockReturnValue(Promise.resolve(expectedResponse))
  })

  it('should submit request', () => {
    return createRequest({ apiKey, accountId }, opts)
    .then((result) => {
      expect(result).toEqual(expectedResponse)
      expect(rp).toHaveBeenCalledWith({
        headers: {
          api_key: 'api123'
        },
        form: {
          field1: 'ab c',
          field2: 100
        },
        method: 'POST',
        uri: 'https://acct123.appspot.com/api/1/A%20B/submit',
        json: true
      })
    })
  })

  it('should submit without data', () => {
    delete opts.data
    return createRequest({ apiKey, accountId }, opts)
    .then((result) => {
      expect(result).toEqual(expectedResponse)
      expect(rp).toHaveBeenCalledWith({
        headers: {
          api_key: 'api123'
        },
        method: 'POST',
        uri: 'https://acct123.appspot.com/api/1/A%20B/submit',
        json: true
      })
    })
  })

  it('should create without submitting', () => {
    delete opts.submit
    return createRequest({ apiKey, accountId }, opts)
    .then((result) => {
      expect(result).toEqual(expectedResponse)
      expect(rp).toHaveBeenCalledWith({
        headers: {
          api_key: 'api123'
        },
        form: {
          field1: 'ab c',
          field2: 100
        },
        method: 'POST',
        uri: 'https://acct123.appspot.com/api/1/A%20B/create',
        json: true
      })
    })
  })
})
