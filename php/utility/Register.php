<?php
declare(strict_types=1);

// TheRosary SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

TheRosaryUtility::setRegistrar(function (TheRosaryUtility $u): void {
    $u->clean = [TheRosaryClean::class, 'call'];
    $u->done = [TheRosaryDone::class, 'call'];
    $u->make_error = [TheRosaryMakeError::class, 'call'];
    $u->feature_add = [TheRosaryFeatureAdd::class, 'call'];
    $u->feature_hook = [TheRosaryFeatureHook::class, 'call'];
    $u->feature_init = [TheRosaryFeatureInit::class, 'call'];
    $u->fetcher = [TheRosaryFetcher::class, 'call'];
    $u->make_fetch_def = [TheRosaryMakeFetchDef::class, 'call'];
    $u->make_context = [TheRosaryMakeContext::class, 'call'];
    $u->make_options = [TheRosaryMakeOptions::class, 'call'];
    $u->make_request = [TheRosaryMakeRequest::class, 'call'];
    $u->make_response = [TheRosaryMakeResponse::class, 'call'];
    $u->make_result = [TheRosaryMakeResult::class, 'call'];
    $u->make_point = [TheRosaryMakePoint::class, 'call'];
    $u->make_spec = [TheRosaryMakeSpec::class, 'call'];
    $u->make_url = [TheRosaryMakeUrl::class, 'call'];
    $u->param = [TheRosaryParam::class, 'call'];
    $u->prepare_auth = [TheRosaryPrepareAuth::class, 'call'];
    $u->prepare_body = [TheRosaryPrepareBody::class, 'call'];
    $u->prepare_headers = [TheRosaryPrepareHeaders::class, 'call'];
    $u->prepare_method = [TheRosaryPrepareMethod::class, 'call'];
    $u->prepare_params = [TheRosaryPrepareParams::class, 'call'];
    $u->prepare_path = [TheRosaryPreparePath::class, 'call'];
    $u->prepare_query = [TheRosaryPrepareQuery::class, 'call'];
    $u->result_basic = [TheRosaryResultBasic::class, 'call'];
    $u->result_body = [TheRosaryResultBody::class, 'call'];
    $u->result_headers = [TheRosaryResultHeaders::class, 'call'];
    $u->transform_request = [TheRosaryTransformRequest::class, 'call'];
    $u->transform_response = [TheRosaryTransformResponse::class, 'call'];
});
