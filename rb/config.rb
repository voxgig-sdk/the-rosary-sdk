# TheRosary SDK configuration

module TheRosaryConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "TheRosary",
        "slug" => "the-rosary",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://the-rosary-api.vercel.app",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "today" => {},
          "v1n" => {},
        },
      },
      "entity" => {
        "today" => {
          "fields" => [
            {
              "name" => "description",
              "short" => "Description or meditation for the prayer",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "short" => "The title of the prayer or mystery",
              "type" => "`$STRING`",
            },
          ],
          "name" => "today",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/today",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "today",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.prayers`",
                  },
                  "parts" => [
                    "v1",
                    "today",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "v1n" => {
          "fields" => [
            {
              "name" => "day",
              "short" => "The day of the week or occasion",
              "type" => "`$STRING`",
            },
            {
              "name" => "mystery",
              "short" => "The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)",
              "type" => "`$STRING`",
            },
            {
              "name" => "prayers",
              "short" => "List of prayers in the rosary",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "v1n",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "monday",
                        "kind" => "param",
                        "name" => "day",
                        "orig" => "day",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/{day}",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "var" => "day",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "day",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "v1",
                    "{day}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "v1",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    TheRosaryFeatures.make_feature(name)
  end
end
