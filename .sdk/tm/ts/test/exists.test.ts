
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TheRosarySDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TheRosarySDK.test()
    equal(null !== testsdk, true)
  })

})
