const index = require('../index')

describe('index', () => {
  it('should return function', () => {
    expect(Object.keys(index)).toEqual([
      'verify',
      'processes',
      'requests',
      'createRequest'
    ])
    Object.keys(index).forEach((fName) => {
      expect(typeof(index[fName])).toEqual('function')
    })
  })
})
