# TheRosary SDK exists test

require "minitest/autorun"
require_relative "../TheRosary_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = TheRosarySDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
