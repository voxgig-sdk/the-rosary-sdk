-- Typed models for the TheRosary SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Today
---@field description? string
---@field title? string

---@class TodayListMatch
---@field description? string
---@field title? string

---@class V1n
---@field day? string
---@field mystery? string
---@field prayer? table

---@class V1nLoadMatch
---@field day string

local M = {}

return M
