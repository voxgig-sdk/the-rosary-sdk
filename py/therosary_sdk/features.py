# TheRosary SDK feature factory

from therosary_sdk.feature.base_feature import TheRosaryBaseFeature
from therosary_sdk.feature.ratelimit_feature import TheRosaryRatelimitFeature
from therosary_sdk.feature.retry_feature import TheRosaryRetryFeature
from therosary_sdk.feature.test_feature import TheRosaryTestFeature
from therosary_sdk.feature.timeout_feature import TheRosaryTimeoutFeature


_FEATURES = {
    "base": lambda: TheRosaryBaseFeature(),
    "ratelimit": lambda: TheRosaryRatelimitFeature(),
    "retry": lambda: TheRosaryRetryFeature(),
    "test": lambda: TheRosaryTestFeature(),
    "timeout": lambda: TheRosaryTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
