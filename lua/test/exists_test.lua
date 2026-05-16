-- ProjectName SDK exists test

local sdk = require("the-rosary_sdk")

describe("TheRosarySDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
