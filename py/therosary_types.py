# Typed models for the TheRosary SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Today:
    description: Optional[str] = None
    title: Optional[str] = None


@dataclass
class TodayListMatch:
    description: Optional[str] = None
    title: Optional[str] = None


@dataclass
class V1n:
    day: Optional[str] = None
    mystery: Optional[str] = None
    prayer: Optional[list] = None


@dataclass
class V1nLoadMatch:
    day: str

