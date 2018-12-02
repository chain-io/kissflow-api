const index = require('../index')

describe('index', () => {
  it('should return function', () => {
    expect(Object.keys(index)).toEqual([
      'verify',
      'processes',
      'requests'
    ])
    Object.keys(index).forEach((fName) => {
      expect(typeof(index[fName])).toEqual('function')
    })
  })
})
