# TheRosary SDK utility: make_context
require_relative '../core/context'
module TheRosaryUtilities
  MakeContext = ->(ctxmap, basectx) {
    TheRosaryContext.new(ctxmap, basectx)
  }
end
