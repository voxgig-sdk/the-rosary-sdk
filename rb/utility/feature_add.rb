# TheRosary SDK utility: feature_add
module TheRosaryUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
