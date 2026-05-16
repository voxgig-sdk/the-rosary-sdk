# TheRosary SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module TheRosaryFeatures
  def self.make_feature(name)
    case name
    when "base"
      TheRosaryBaseFeature.new
    when "test"
      TheRosaryTestFeature.new
    else
      TheRosaryBaseFeature.new
    end
  end
end
