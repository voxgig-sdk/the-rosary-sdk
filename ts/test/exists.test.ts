
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TheRosarySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TheRosarySDK.test()
    equal(testsdk instanceof TheRosarySDK, true,
      'TheRosarySDK.test() must return a client synchronously')
  })

})
