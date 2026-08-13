# TheRosary SDK feature factory

from therosary_sdk.feature.base_feature import TheRosaryBaseFeature
from therosary_sdk.feature.test_feature import TheRosaryTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TheRosaryBaseFeature(),
        "test": lambda: TheRosaryTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
