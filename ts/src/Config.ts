
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'TheRosary',
        slug: "the-rosary",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://the-rosary-api.vercel.app",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        today: {
        },
  
        v1n: {
        },
  
    }
  }


  entity = {
    "today": {
      "fields": [
        {
          "name": "description",
          "short": "Description or meditation for the prayer",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "short": "The title of the prayer or mystery",
          "type": "`$STRING`"
        }
      ],
      "name": "today",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/v1/today",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "today"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.prayers`"
              },
              "parts": [
                "v1",
                "today"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "v1n": {
      "fields": [
        {
          "name": "day",
          "short": "The day of the week or occasion",
          "type": "`$STRING`"
        },
        {
          "name": "mystery",
          "short": "The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)",
          "type": "`$STRING`"
        },
        {
          "name": "prayers",
          "short": "List of prayers in the rosary",
          "type": "`$ARRAY`"
        }
      ],
      "name": "v1n",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "monday",
                    "kind": "param",
                    "name": "day",
                    "orig": "day",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/{day}",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "var": "day"
                }
              ],
              "select": {
                "exist": [
                  "day"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "v1",
                "{day}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "v1"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

