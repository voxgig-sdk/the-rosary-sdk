# TheRosary SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module TheRosaryFeatures
  def self.make_feature(name)
    case name
    when "base"
      TheRosaryBaseFeature.new
    when "ratelimit"
      TheRosaryRatelimitFeature.new
    when "retry"
      TheRosaryRetryFeature.new
    when "test"
      TheRosaryTestFeature.new
    when "timeout"
      TheRosaryTimeoutFeature.new
    else
      TheRosaryBaseFeature.new
    end
  end
end
