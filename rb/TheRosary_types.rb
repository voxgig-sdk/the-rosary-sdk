# frozen_string_literal: true

# Typed models for the TheRosary SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Today entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Today = Struct.new(
  :description,
  :title,
  keyword_init: true
)

# Match filter for Today#list (any subset of Today fields).
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
TodayListMatch = Struct.new(
  :description,
  :title,
  keyword_init: true
)

# V1n entity data model.
#
# @!attribute [rw] day
#   @return [String, nil]
#
# @!attribute [rw] mystery
#   @return [String, nil]
#
# @!attribute [rw] prayer
#   @return [Array, nil]
V1n = Struct.new(
  :day,
  :mystery,
  :prayer,
  keyword_init: true
)

# Request payload for V1n#load.
#
# @!attribute [rw] day
#   @return [String]
V1nLoadMatch = Struct.new(
  :day,
  keyword_init: true
)

