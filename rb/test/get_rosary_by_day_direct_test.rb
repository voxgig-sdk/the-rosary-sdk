# GetRosaryByDay direct test

require "minitest/autorun"
require "json"
require_relative "../TheRosary_sdk"
require_relative "runner"

class GetRosaryByDayDirectTest < Minitest::Test
  def test_direct_list_get_rosary_by_day
    setup = get_rosary_by_day_direct_setup([
      { "id" => "direct01" },
      { "id" => "direct02" },
    ])
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-list-get_rosary_by_day", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    if setup[:live]
      ["get_rosary_by_day01"].each do |_live_key|
        if setup[:idmap][_live_key].nil?
          skip "live test needs #{_live_key} via *_ENTID env var (synthetic IDs only)"
          return
        end
      end
    end
    client = setup[:client]

    params = {}
    if setup[:live]
      params["id"] = setup[:idmap]["get_rosary_by_day01"]
    else
      params["id"] = "direct01"
    end

    result, err = client.direct({
      "path" => "{id}",
      "method" => "GET",
      "params" => params,
    })
    if setup[:live]
      # Live mode is lenient: synthetic IDs frequently 4xx and the list-
      # response shape varies wildly across public APIs. Skip rather than
      # fail when the call doesn't return a usable list.
      if !err.nil?
        skip("list call failed (likely synthetic IDs against live API): #{err}")
        return
      end
      unless result["ok"]
        skip("list call not ok (likely synthetic IDs against live API)")
        return
      end
      status = Helpers.to_int(result["status"])
      if status < 200 || status >= 300
        skip("expected 2xx status, got #{status}")
        return
      end
    else
      assert_nil err
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert result["data"].is_a?(Array)
      assert_equal 2, result["data"].length
      assert_equal 1, setup[:calls].length
    end
  end

end


def get_rosary_by_day_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "THEROSARY_TEST_GET_ROSARY_BY_DAY_ENTID" => {},
    "THEROSARY_TEST_LIVE" => "FALSE",
    "THEROSARY_APIKEY" => "NONE",
  })

  live = env["THEROSARY_TEST_LIVE"] == "TRUE"

  if live
    merged_opts = {
      "apikey" => env["THEROSARY_APIKEY"],
    }
    client = TheRosarySDK.new(merged_opts)
    return {
      client: client,
      calls: calls,
      live: true,
      idmap: {},
    }
  end

  mock_fetch = ->(url, init) {
    calls.push({ "url" => url, "init" => init })
    return {
      "status" => 200,
      "statusText" => "OK",
      "headers" => {},
      "json" => ->() {
        if !mockres.nil?
          return mockres
        end
        return { "id" => "direct01" }
      },
      "body" => "mock",
    }, nil
  }

  client = TheRosarySDK.new({
    "base" => "http://localhost:8080",
    "system" => {
      "fetch" => mock_fetch,
    },
  })

  {
    client: client,
    calls: calls,
    live: false,
    idmap: {},
  }
end
