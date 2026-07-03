package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/the-rosary-sdk/go"
	"github.com/voxgig-sdk/the-rosary-sdk/go/core"

	vs "github.com/voxgig-sdk/the-rosary-sdk/go/utility/struct"
)

func TestTodayEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Today(nil)
		if ent == nil {
			t.Fatal("expected non-nil TodayEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := todayBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "today." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set THEROSARY_TEST_TODAY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		todayRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.today", setup.data)))
		var todayRef01Data map[string]any
		if len(todayRef01DataRaw) > 0 {
			todayRef01Data = core.ToMapAny(todayRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = todayRef01Data

		// LIST
		todayRef01Ent := client.Today(nil)
		todayRef01Match := map[string]any{}

		todayRef01ListResult, err := todayRef01Ent.List(todayRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, todayRef01ListOk := todayRef01ListResult.([]any)
		if !todayRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", todayRef01ListResult)
		}

	})
}

func todayBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "today", "TodayTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read today test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse today test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"today01", "today02", "today03"},
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
	entidEnvRaw := os.Getenv("THEROSARY_TEST_TODAY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"THEROSARY_TEST_TODAY_ENTID": idmap,
		"THEROSARY_TEST_LIVE":      "FALSE",
		"THEROSARY_TEST_EXPLAIN":   "FALSE",
		"THEROSARY_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["THEROSARY_TEST_TODAY_ENTID"])
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
