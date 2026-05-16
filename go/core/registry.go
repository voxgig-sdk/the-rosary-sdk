package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGetRosaryByDayEntityFunc func(client *TheRosarySDK, entopts map[string]any) TheRosaryEntity

var NewTodayEntityFunc func(client *TheRosarySDK, entopts map[string]any) TheRosaryEntity

