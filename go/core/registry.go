package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewTodayEntityFunc func(client *TheRosarySDK, entopts map[string]any) TheRosaryEntity

var NewV1nEntityFunc func(client *TheRosarySDK, entopts map[string]any) TheRosaryEntity

