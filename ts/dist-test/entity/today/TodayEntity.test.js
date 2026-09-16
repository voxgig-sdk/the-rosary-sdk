"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('TodayEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when THE_ROSARY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('THE_ROSARY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TheRosarySDK.test();
        const ent = testsdk.Today();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.THE_ROSARY_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'today.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "description", "req": false, "short": "Description or meditation for the prayer", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "title", "req": false, "short": "The title of the prayer or mystery", "type": "`$STRING`", "index$": 1 }], "name": "today", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /v1/today", "json": "{\"operationId\":\"getTodayRosary\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"day\":\"Monday\",\"mystery\":\"Joyful Mysteries\",\"prayers\":[{\"description\":\"The Angel Gabriel announces to Mary that she will conceive and bear a son\",\"title\":\"The Annunciation\"},{\"description\":\"Mary visits her cousin Elizabeth\",\"title\":\"The Visitation\"},{\"description\":\"Jesus is born in Bethlehem\",\"title\":\"The Nativity\"},{\"description\":\"Mary and Joseph present Jesus at the Temple\",\"title\":\"The Presentation\"},{\"description\":\"Mary and Joseph find the young Jesus in the Temple\",\"title\":\"The Finding in the Temple\"}]},\"schema\":{\"properties\":{\"day\":{\"description\":\"The day of the week or occasion\",\"example\":\"Monday\",\"type\":\"string\"},\"mystery\":{\"description\":\"The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)\",\"example\":\"Joyful Mysteries\",\"type\":\"string\"},\"prayers\":{\"description\":\"List of prayers in the rosary\",\"items\":{\"properties\":{\"description\":{\"description\":\"Description or meditation for the prayer\",\"example\":\"The Angel Gabriel announces to Mary that she will conceive and bear a son\",\"type\":\"string\"},\"title\":{\"description\":\"The title of the prayer or mystery\",\"example\":\"The Annunciation\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with today's rosary prayers\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Resource not found\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"example\":\"The requested day could not be found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v1/today", "segments": [{ "lit": "v1" }, { "lit": "today" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.prayers`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "today", "name__orig": "today", "Name": "Today", "name_": "today", "name-": "today", "NAME": "TODAY", "index$": 0 }, { "active": true, "entity": "today", "key$": "BasicTodayFlow", "kind": "basic", "name": "BasicTodayFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "today_ref01" } }], "index$": 0 }] }, 'Today');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let today_ref01_data = Object.values(setup.data.existing.today)[0];
        // LIST
        const today_ref01_ent = client.Today();
        const today_ref01_match = {};
        const today_ref01_list = (await today_ref01_ent.list(today_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/today/TodayTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TheRosarySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['today01', 'today02', 'today03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'THE_ROSARY_TEST_TODAY_ENTID': idmap,
        'THE_ROSARY_TEST_LIVE': 'FALSE',
        'THE_ROSARY_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['THE_ROSARY_TEST_TODAY_ENTID'];
    const live = 'TRUE' === env.THE_ROSARY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['THE_ROSARY_TEST_TODAY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TheRosarySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.THE_ROSARY_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=TodayEntity.test.js.map