// Typed models for the TheRosary SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Today {
  description?: string
  title?: string
}

export type TodayListMatch = Partial<Today>

export interface V1n {
  day?: string
  mystery?: string
  prayer?: any[]
}

export interface V1nLoadMatch {
  day: string
}

