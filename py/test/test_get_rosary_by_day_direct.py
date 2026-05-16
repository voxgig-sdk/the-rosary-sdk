# GetRosaryByDay direct test

import json
import pytest

from utility.voxgig_struct import voxgig_struct as vs
from therosary_sdk import TheRosarySDK
from core import helpers
from test import runner


class TestGetRosaryByDayDirect:

    def test_should_direct_list_get_rosary_by_day(self):
        setup = _get_rosary_by_day_direct_setup([
            {"id": "direct01"},
            {"id": "direct02"},
        ])
        _skip, _reason = runner.is_control_skipped("direct", "direct-list-get_rosary_by_day", "live" if setup["live"] else "unit")
        if _skip:
            # pytest already imported at module scope
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            for _live_key in ["get_rosary_by_day01"]:
                if setup["idmap"].get(_live_key) is None:
                    # pytest already imported at module scope
                    pytest.skip(f"live test needs {_live_key} via *_ENTID env var (synthetic IDs only)")
                    return

        client = setup["client"]

        params = {}
        if setup["live"]:
            params["id"] = setup["idmap"]["get_rosary_by_day01"]
        else:
            params["id"] = "direct01"

        result, err = client.direct({
            "path": "{id}",
            "method": "GET",
            "params": params,
        })
        if setup["live"]:
            # Live mode is lenient: synthetic IDs frequently 4xx and the
            # list-response shape varies wildly across public APIs. Skip
            # rather than fail when the call doesn't return a usable list.
            if err is not None:
                pytest.skip(f"list call failed (likely synthetic IDs against live API): {err}")
                return
            if not result.get("ok"):
                pytest.skip("list call not ok (likely synthetic IDs against live API)")
                return
            status = helpers.to_int(result["status"])
            if status < 200 or status >= 300:
                pytest.skip(f"expected 2xx status, got {status}")
                return
        else:
            assert err is None
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert isinstance(result["data"], list)
            assert len(result["data"]) == 2
            assert len(setup["calls"]) == 1



def _get_rosary_by_day_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "THEROSARY_TEST_GET_ROSARY_BY_DAY_ENTID": {},
        "THEROSARY_TEST_LIVE": "FALSE",
        "THEROSARY_APIKEY": "NONE",
    })

    live = env.get("THEROSARY_TEST_LIVE") == "TRUE"

    if live:
        merged_opts = {
            "apikey": env.get("THEROSARY_APIKEY"),
        }
        client = TheRosarySDK(merged_opts)
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = TheRosarySDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
