# TheRosary SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "TheRosary",
            "slug": "the-rosary",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://the-rosary-api.vercel.app",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "today": {},
                "v1n": {},
            },
        },
        "entity": {
      "today": {
        "fields": [
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Description or meditation for the prayer",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "short": "The title of the prayer or mystery",
          },
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
                    "lit": "v1",
                  },
                  {
                    "lit": "today",
                  },
                ],
                "parts": [
                  "v1",
                  "today",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.prayers`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "v1n": {
        "fields": [
          {
            "name": "day",
            "title": "Day",
            "type": "`$STRING`",
            "short": "The day of the week or occasion",
          },
          {
            "name": "mystery",
            "title": "Mystery",
            "type": "`$STRING`",
            "short": "The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)",
          },
          {
            "name": "prayers",
            "title": "Prayers",
            "type": "`$ARRAY`",
            "short": "List of prayers in the rosary",
          },
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
                    "lit": "v1",
                  },
                  {
                    "var": "day",
                  },
                ],
                "parts": [
                  "v1",
                  "{day}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "day",
                      "orig": "day",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "monday",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "day",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
