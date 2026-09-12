"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'TheRosary',
        slug: "the-rosary",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://the-rosary-api.vercel.app",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            today: {},
            v1n: {},
        }
    };
    entity = {
        "today": {
            "fields": [
                {
                    "name": "description",
                    "short": "Description or meditation for the prayer",
                    "type": "`$STRING`"
                },
                {
                    "name": "title",
                    "short": "The title of the prayer or mystery",
                    "type": "`$STRING`"
                }
            ],
            "name": "today",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/today",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "lit": "today"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.prayers`"
                            },
                            "parts": [
                                "v1",
                                "today"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "v1n": {
            "fields": [
                {
                    "name": "day",
                    "short": "The day of the week or occasion",
                    "type": "`$STRING`"
                },
                {
                    "name": "mystery",
                    "short": "The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)",
                    "type": "`$STRING`"
                },
                {
                    "name": "prayers",
                    "short": "List of prayers in the rosary",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "v1n",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "monday",
                                        "kind": "param",
                                        "name": "day",
                                        "orig": "day",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/v1/{day}",
                            "segments": [
                                {
                                    "lit": "v1"
                                },
                                {
                                    "var": "day"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "day"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "v1",
                                "{day}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "v1"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map