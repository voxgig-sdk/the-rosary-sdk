package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "TheRosary",
			"slug": "the-rosary",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://the-rosary-api.vercel.app",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"today": map[string]any{},
				"v1n": map[string]any{},
			},
		},
		"entity": map[string]any{
			"today": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Description or meditation for the prayer",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "The title of the prayer or mystery",
						"type": "`$STRING`",
					},
				},
				"name": "today",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/today",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "today",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.prayers`",
								},
								"parts": []any{
									"v1",
									"today",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"v1n": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "day",
						"short": "The day of the week or occasion",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mystery",
						"short": "The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "prayers",
						"short": "List of prayers in the rosary",
						"type": "`$ARRAY`",
					},
				},
				"name": "v1n",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "monday",
											"kind": "param",
											"name": "day",
											"orig": "day",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/{day}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"var": "day",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"day",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"{day}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v1",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
