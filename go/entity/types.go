// Typed models for the TheRosary SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Today is the typed data model for the today entity.
type Today struct {
	Description *string `json:"description,omitempty"`
	Title *string `json:"title,omitempty"`
}

// TodayListMatch mirrors the today fields as an all-optional match
// filter (Go analog of Partial<Today>).
type TodayListMatch struct {
	Description *string `json:"description,omitempty"`
	Title *string `json:"title,omitempty"`
}

// V1n is the typed data model for the v1n entity.
type V1n struct {
	Day *string `json:"day,omitempty"`
	Mystery *string `json:"mystery,omitempty"`
	Prayer *[]any `json:"prayer,omitempty"`
}

// V1nLoadMatch is the typed request payload for V1n.LoadTyped.
type V1nLoadMatch struct {
	Day string `json:"day"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
