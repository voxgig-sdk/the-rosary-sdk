
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


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description or meditation for the prayer"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "The title of the prayer or mystery"
        }
      ],
      "name": "today",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
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
              "parts": [
                "v1",
                "today"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.prayers`"
              },
              "args": {},
              "select": {}
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
          "title": "Day",
          "type": "`$STRING`",
          "short": "The day of the week or occasion"
        },
        {
          "name": "mystery",
          "title": "Mystery",
          "type": "`$STRING`",
          "short": "The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)"
        },
        {
          "name": "prayers",
          "title": "Prayers",
          "type": "`$ARRAY`",
          "short": "List of prayers in the rosary"
        }
      ],
      "name": "v1n",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
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
              "parts": [
                "v1",
                "{day}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "day",
                    "orig": "day",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "monday"
                  }
                ]
              },
              "select": {
                "exist": [
                  "day"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

