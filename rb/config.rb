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
              "title" => "Description",
              "type" => "`$STRING`",
              "short" => "Description or meditation for the prayer",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
              "short" => "The title of the prayer or mystery",
            },
          ],
          "name" => "today",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
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
                  "parts" => [
                    "v1",
                    "today",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.prayers`",
                  },
                  "args" => {},
                  "select" => {},
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
              "title" => "Day",
              "type" => "`$STRING`",
              "short" => "The day of the week or occasion",
            },
            {
              "name" => "mystery",
              "title" => "Mystery",
              "type" => "`$STRING`",
              "short" => "The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)",
            },
            {
              "name" => "prayers",
              "title" => "Prayers",
              "type" => "`$ARRAY`",
              "short" => "List of prayers in the rosary",
            },
          ],
          "name" => "v1n",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
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
                  "parts" => [
                    "v1",
                    "{day}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "day",
                        "orig" => "day",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "monday",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "day",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
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
