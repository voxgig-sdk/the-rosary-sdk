

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TheRosarySDK, BaseFeature, stdutil } from '../../..'

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.THE_ROSARY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'v1n.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"day","req":false,"short":"The day of the week or occasion","type":"`$STRING`","index$":0},{"active":true,"name":"mystery","req":false,"short":"The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)","type":"`$STRING`","index$":1},{"active":true,"name":"prayers","req":false,"short":"List of prayers in the rosary","type":"`$ARRAY`","index$":2}],"name":"v1n","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"monday","kind":"param","name":"day","orig":"day","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /v1/{day}","json":"{\"operationId\":\"getRosaryByDay\",\"parameters\":[{\"description\":\"Day of the week (monday, tuesday, wednesday, thursday, friday, saturday, sunday) or mystery type (joyful, sorrowful, glorious, luminous)\",\"example\":\"monday\",\"in\":\"path\",\"name\":\"day\",\"required\":true,\"schema\":{\"enum\":[\"monday\",\"tuesday\",\"wednesday\",\"thursday\",\"friday\",\"saturday\",\"sunday\",\"joyful\",\"sorrowful\",\"glorious\",\"luminous\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"day\":\"Monday\",\"mystery\":\"Joyful Mysteries\",\"prayers\":[{\"description\":\"The Angel Gabriel announces to Mary that she will conceive and bear a son\",\"title\":\"The Annunciation\"},{\"description\":\"Mary visits her cousin Elizabeth\",\"title\":\"The Visitation\"},{\"description\":\"Jesus is born in Bethlehem\",\"title\":\"The Nativity\"},{\"description\":\"Mary and Joseph present Jesus at the Temple\",\"title\":\"The Presentation\"},{\"description\":\"Mary and Joseph find the young Jesus in the Temple\",\"title\":\"The Finding in the Temple\"}]},\"schema\":{\"properties\":{\"day\":{\"description\":\"The day of the week or occasion\",\"example\":\"Monday\",\"type\":\"string\"},\"mystery\":{\"description\":\"The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)\",\"example\":\"Joyful Mysteries\",\"type\":\"string\"},\"prayers\":{\"description\":\"List of prayers in the rosary\",\"items\":{\"properties\":{\"description\":{\"description\":\"Description or meditation for the prayer\",\"example\":\"The Angel Gabriel announces to Mary that she will conceive and bear a son\",\"type\":\"string\"},\"title\":{\"description\":\"The title of the prayer or mystery\",\"example\":\"The Annunciation\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with rosary prayers for the specified day\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Resource not found\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"example\":\"The requested day could not be found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Day not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Resource not found\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"example\":\"The requested day could not be found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/{day}","segments":[{"lit":"v1"},{"var":"day"}],"select":{"exist":["day"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["v1"]]},"key$":"v1n","name__orig":"v1n","Name":"V1n","name_":"v1n","name-":"v1n","NAME":"V1N","index$":1}, {"active":true,"entity":"v1n","key$":"BasicV1nFlow","kind":"basic","name":"BasicV1nFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"v1n_ref01","srcdatavar":"v1n_ref01_data","suffix":"_dt0"},"match":{"id":"v1n01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-v1n_ref01"}}],"index$":0}]}, 'V1n')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let v1n_ref01_data = Object.values(setup.data.existing.v1n)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const v1n_ref01_ent = client.V1n()


  })
})



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
    ['v1n01','v1n02','v1n03','v101','v102','v103'],
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
  
