-- TheRosary SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "TheRosary",
      slug = "the-rosary",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://the-rosary-api.vercel.app",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["today"] = {},
        ["v1n"] = {},
      },
    },
    entity = {
      ["today"] = {
        ["fields"] = {
          {
            ["name"] = "description",
            ["short"] = "Description or meditation for the prayer",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "title",
            ["short"] = "The title of the prayer or mystery",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "today",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/today",
                ["parts"] = {
                  "v1",
                  "today",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.prayers`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["v1n"] = {
        ["fields"] = {
          {
            ["name"] = "day",
            ["short"] = "The day of the week or occasion",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "mystery",
            ["short"] = "The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "prayers",
            ["short"] = "List of prayers in the rosary",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "v1n",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "monday",
                      ["kind"] = "param",
                      ["name"] = "day",
                      ["orig"] = "day",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/{day}",
                ["parts"] = {
                  "v1",
                  "{day}",
                },
                ["select"] = {
                  ["exist"] = {
                    "day",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v1",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
