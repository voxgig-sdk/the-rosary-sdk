# TheRosary SDK utility: prepare_body
require_relative 'media'
module TheRosaryUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return TheRosaryUtilities.raw_body(ctx.reqdata) if TheRosaryUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
