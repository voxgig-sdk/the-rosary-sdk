# TheRosary SDK feature factory

from feature.base_feature import TheRosaryBaseFeature
from feature.test_feature import TheRosaryTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TheRosaryBaseFeature(),
        "test": lambda: TheRosaryTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
