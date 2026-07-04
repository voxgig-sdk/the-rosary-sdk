<?php
declare(strict_types=1);

// V1n entity test

require_once __DIR__ . '/../therosary_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class V1nEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = TheRosarySDK::test(null, null);
        $ent = $testsdk->V1n(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = v1n_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "v1n." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set THEROSARY_TEST_V_N_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $v1n_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.v1n")));
        $v1n_ref01_data = null;
        if (count($v1n_ref01_data_raw) > 0) {
            $v1n_ref01_data = Helpers::to_map($v1n_ref01_data_raw[0][1]);
        }

        // LOAD
        $v1n_ref01_ent = $client->V1n(null);
        $v1n_ref01_match_dt0 = [];
        $v1n_ref01_data_dt0_loaded = $v1n_ref01_ent->load($v1n_ref01_match_dt0, null);
        $this->assertNotNull($v1n_ref01_data_dt0_loaded);

    }
}

function v1n_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/v1n/V1nTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = TheRosarySDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["v1n01", "v1n02", "v1n03", "v101", "v102", "v103"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("THEROSARY_TEST_V_N_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "THEROSARY_TEST_V_N_ENTID" => $idmap,
        "THEROSARY_TEST_LIVE" => "FALSE",
        "THEROSARY_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["THEROSARY_TEST_V_N_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["THEROSARY_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new TheRosarySDK(Helpers::to_map($merged_opts));
    }

    $live = $env["THEROSARY_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["THEROSARY_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
