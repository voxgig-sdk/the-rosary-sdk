# ProjectName SDK exists test

import pytest
from therosary_sdk import TheRosarySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TheRosarySDK.test(None, None)
        assert testsdk is not None
