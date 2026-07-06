<?php
declare(strict_types=1);

// Typed models for the TheRosary SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Today entity data model. */
class Today
{
    public ?string $description = null;
    public ?string $title = null;
}

/** Request payload for Today#list. */
class TodayListMatch
{
    public ?string $description = null;
    public ?string $title = null;
}

/** V1n entity data model. */
class V1n
{
    public ?string $day = null;
    public ?string $mystery = null;
    public ?array $prayer = null;
}

/** Request payload for V1n#load. */
class V1nLoadMatch
{
    public string $day;
}

