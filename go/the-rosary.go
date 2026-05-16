package voxgigtherosarysdk

import (
	"github.com/voxgig-sdk/the-rosary-sdk/core"
	"github.com/voxgig-sdk/the-rosary-sdk/entity"
	"github.com/voxgig-sdk/the-rosary-sdk/feature"
	_ "github.com/voxgig-sdk/the-rosary-sdk/utility"
)

// Type aliases preserve external API.
type TheRosarySDK = core.TheRosarySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TheRosaryEntity = core.TheRosaryEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TheRosaryError = core.TheRosaryError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGetRosaryByDayEntityFunc = func(client *core.TheRosarySDK, entopts map[string]any) core.TheRosaryEntity {
		return entity.NewGetRosaryByDayEntity(client, entopts)
	}
	core.NewTodayEntityFunc = func(client *core.TheRosarySDK, entopts map[string]any) core.TheRosaryEntity {
		return entity.NewTodayEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTheRosarySDK = core.NewTheRosarySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
