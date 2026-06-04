-- V1n entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("the-rosary_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("V1nEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:V1n(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = v1n_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "v1n." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set THEROSARY_TEST_V_N_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local v1n_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.v1n")))
    local v1n_ref01_data = nil
    if #v1n_ref01_data_raw > 0 then
      v1n_ref01_data = helpers.to_map(v1n_ref01_data_raw[1][2])
    end

    -- LOAD
    local v1n_ref01_ent = client:V1n(nil)
    local v1n_ref01_match_dt0 = {}
    local v1n_ref01_data_dt0_loaded, err = v1n_ref01_ent:load(v1n_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(v1n_ref01_data_dt0_loaded)

  end)
end)

function v1n_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/v1n/V1nTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read v1n test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "v1n01", "v1n02", "v1n03", "v101", "v102", "v103" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("THEROSARY_TEST_V_N_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["THEROSARY_TEST_V_N_ENTID"] = idmap,
    ["THEROSARY_TEST_LIVE"] = "FALSE",
    ["THEROSARY_TEST_EXPLAIN"] = "FALSE",
  })

  local idmap_resolved = helpers.to_map(
    env["THEROSARY_TEST_V_N_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["THEROSARY_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["THEROSARY_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["THEROSARY_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
