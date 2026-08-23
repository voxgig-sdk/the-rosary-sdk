
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
     test:     {
      "options": {
        "active": false
      }
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
              "parts": [
                "v1",
                "today"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.prayers`"
              }
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
              "parts": [
                "v1",
                "{day}"
              ],
              "select": {
                "exist": [
                  "day"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

