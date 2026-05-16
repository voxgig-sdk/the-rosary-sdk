package = "voxgig-sdk-the-rosary"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/the-rosary-sdk.git"
}
description = {
  summary = "TheRosary SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["the-rosary_sdk"] = "the-rosary_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
