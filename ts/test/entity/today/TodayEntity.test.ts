

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TodayEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when THE_ROSARY_TEST_LIVE=TRUE.
  afterEach(liveDelay('THE_ROSARY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TheRosarySDK.test()
    const ent = testsdk.Today()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.THE_ROSARY_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'today.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description or meditation for the prayer","t":"`$STRING`","key$":"description","index$":0},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"The title of the prayer or mystery","t":"`$STRING`","key$":"title","index$":1}},"name":"today","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/today","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/today","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"today"}],"t":{"req":"`reqdata`","res":"`body.prayers`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"today","name__orig":"today","Name":"Today","name_":"today","name-":"today","NAME":"TODAY","index$":0}, {"active":true,"entity":"today","key$":"BasicTodayFlow","kind":"basic","name":"BasicTodayFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"today_ref01"}}],"index$":0}]}, 'Today', {"GET /v1/today":{"protocol":"http","operationId":"getTodayRosary","responses":{"200":{"description":"Successful response with today's rosary prayers","content":{"application/json":{"schema":{"type":"object","properties":{"day":{"description":"The day of the week or occasion","example":"Monday","key$":"day","type":"string"},"mystery":{"description":"The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)","example":"Joyful Mysteries","key$":"mystery","type":"string"},"prayers":{"description":"List of prayers in the rosary","items":{"properties":{"description":{"description":"Description or meditation for the prayer","example":"The Angel Gabriel announces to Mary that she will conceive and bear a son","type":"string","key$":"description"},"title":{"description":"The title of the prayer or mystery","example":"The Annunciation","type":"string","key$":"title"}},"type":"object","x-ref":"#/components/schemas/Prayer","index$":0},"key$":"prayers","type":"array"}},"x-ref":"#/components/schemas/RosaryResponse"},"example":{"day":"Monday","mystery":"Joyful Mysteries","prayers":[{"title":"The Annunciation","description":"The Angel Gabriel announces to Mary that she will conceive and bear a son"},{"title":"The Visitation","description":"Mary visits her cousin Elizabeth"},{"title":"The Nativity","description":"Jesus is born in Bethlehem"},{"title":"The Presentation","description":"Mary and Joseph present Jesus at the Temple"},{"title":"The Finding in the Temple","description":"Mary and Joseph find the young Jesus in the Temple"}]}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Resource not found"},"message":{"type":"string","description":"Detailed error message","example":"The requested day could not be found"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let today_ref01_data = Object.values(setup.data.existing.today)[0] as any

    // LIST
    const today_ref01_ent = client.Today()
    const today_ref01_match: any = {}

    const today_ref01_list = (await today_ref01_ent.list(today_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/today/TodayTestData.json')

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
    ['today01','today02','today03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'THE_ROSARY_TEST_TODAY_ENTID': idmap,
    'THE_ROSARY_TEST_LIVE': 'FALSE',
    'THE_ROSARY_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['THE_ROSARY_TEST_TODAY_ENTID']

  const live = 'TRUE' === env.THE_ROSARY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['THE_ROSARY_TEST_TODAY_ENTID']
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
  
