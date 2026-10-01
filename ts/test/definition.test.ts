import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "today",
    "accessor": "Today",
    "op": "list",
    "method": "GET",
    "path": "/v1/today",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "day": "Monday",
      "mystery": "Joyful Mysteries",
      "prayers": [
        {
          "title": "The Annunciation",
          "description": "The Angel Gabriel announces to Mary that she will conceive and bear a son"
        },
        {
          "title": "The Visitation",
          "description": "Mary visits her cousin Elizabeth"
        },
        {
          "title": "The Nativity",
          "description": "Jesus is born in Bethlehem"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "v1n",
    "accessor": "V1n",
    "op": "load",
    "method": "GET",
    "path": "/v1/{day}",
    "args": [
      {
        "name": "day",
        "wire": "day",
        "value": "monday"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "day": "Monday",
      "mystery": "Joyful Mysteries",
      "prayers": [
        {
          "title": "The Annunciation",
          "description": "The Angel Gabriel announces to Mary that she will conceive and bear a son"
        },
        {
          "title": "The Visitation",
          "description": "Mary visits her cousin Elizabeth"
        },
        {
          "title": "The Nativity",
          "description": "Jesus is born in Bethlehem"
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
