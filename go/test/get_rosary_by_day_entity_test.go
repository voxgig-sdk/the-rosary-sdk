package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/the-rosary-sdk"
	"github.com/voxgig-sdk/the-rosary-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestGetRosaryByDayEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetRosaryByDay(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetRosaryByDayEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := get_rosary_by_dayBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_rosary_by_day." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set THEROSARY_TEST_GET_ROSARY_BY_DAY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		getRosaryByDayRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.get_rosary_by_day", setup.data)))
		var getRosaryByDayRef01Data map[string]any
		if len(getRosaryByDayRef01DataRaw) > 0 {
			getRosaryByDayRef01Data = core.ToMapAny(getRosaryByDayRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getRosaryByDayRef01Data

		// LIST
		getRosaryByDayRef01Ent := client.GetRosaryByDay(nil)
		getRosaryByDayRef01Match := map[string]any{
			"day": setup.idmap["day01"],
		}

		getRosaryByDayRef01ListResult, err := getRosaryByDayRef01Ent.List(getRosaryByDayRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, getRosaryByDayRef01ListOk := getRosaryByDayRef01ListResult.([]any)
		if !getRosaryByDayRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", getRosaryByDayRef01ListResult)
		}

	})
}

func get_rosary_by_dayBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_rosary_by_day", "GetRosaryByDayTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_rosary_by_day test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_rosary_by_day test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"get_rosary_by_day01", "get_rosary_by_day02", "get_rosary_by_day03", "day01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("THEROSARY_TEST_GET_ROSARY_BY_DAY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"THEROSARY_TEST_GET_ROSARY_BY_DAY_ENTID": idmap,
		"THEROSARY_TEST_LIVE":      "FALSE",
		"THEROSARY_TEST_EXPLAIN":   "FALSE",
		"THEROSARY_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["THEROSARY_TEST_GET_ROSARY_BY_DAY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["THEROSARY_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["THEROSARY_APIKEY"],
			},
			extra,
		})
		client = sdk.NewTheRosarySDK(core.ToMapAny(mergedOpts))
	}

	live := env["THEROSARY_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["THEROSARY_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
