

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TheRosarySDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('V1nEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when THE_ROSARY_TEST_LIVE=TRUE.
  afterEach(liveDelay('THE_ROSARY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TheRosarySDK.test()
    const ent = testsdk.V1n()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TheRosarySDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.V1n().load({"day":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.THE_ROSARY_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'v1n.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"day":{"a":true,"h":"Day","n":"day","r":false,"sh":"The day of the week or occasion","t":"`$STRING`","key$":"day","index$":0},"mystery":{"a":true,"h":"Mystery","n":"mystery","r":false,"sh":"The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)","t":"`$STRING`","key$":"mystery","index$":1},"prayers":{"a":true,"h":"Prayers","n":"prayers","r":false,"sh":"List of prayers in the rosary","t":"`$ARRAY`","key$":"prayers","index$":2}},"name":"v1n","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/{day}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"monday","k":"param","n":"day","or":"day","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/{day}","q":{"exist":["day"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"var":"day"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"v1n","name__orig":"v1n","Name":"V1n","name_":"v1n","name-":"v1n","NAME":"V1N","index$":1}, {"active":true,"entity":"v1n","key$":"BasicV1nFlow","kind":"basic","name":"BasicV1nFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"v1n_ref01","srcdatavar":"v1n_ref01_data","suffix":"_dt0"},"m":{"id":"v1n01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-v1n_ref01"}}],"unreachable":true}]}, 'V1n', {"GET /v1/{day}":{"protocol":"http","parameters":[{"name":"day","in":"path","required":true,"description":"Day of the week (monday, tuesday, wednesday, thursday, friday, saturday, sunday) or mystery type (joyful, sorrowful, glorious, luminous)","schema":{"type":"string","enum":["monday","tuesday","wednesday","thursday","friday","saturday","sunday","joyful","sorrowful","glorious","luminous"]},"example":"monday","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let v1n_ref01_data = Object.values(setup.data.existing.v1n)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/v1n/V1nTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TheRosarySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['v1n01','v1n02','v1n03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'THE_ROSARY_TEST_V1N_ENTID': idmap,
    'THE_ROSARY_TEST_LIVE': 'FALSE',
    'THE_ROSARY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['THE_ROSARY_TEST_V1N_ENTID']

  const live = 'TRUE' === env.THE_ROSARY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['THE_ROSARY_TEST_V1N_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TheRosarySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.THE_ROSARY_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
