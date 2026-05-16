# TheRosary SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

TheRosaryUtility.registrar = ->(u) {
  u.clean = TheRosaryUtilities::Clean
  u.done = TheRosaryUtilities::Done
  u.make_error = TheRosaryUtilities::MakeError
  u.feature_add = TheRosaryUtilities::FeatureAdd
  u.feature_hook = TheRosaryUtilities::FeatureHook
  u.feature_init = TheRosaryUtilities::FeatureInit
  u.fetcher = TheRosaryUtilities::Fetcher
  u.make_fetch_def = TheRosaryUtilities::MakeFetchDef
  u.make_context = TheRosaryUtilities::MakeContext
  u.make_options = TheRosaryUtilities::MakeOptions
  u.make_request = TheRosaryUtilities::MakeRequest
  u.make_response = TheRosaryUtilities::MakeResponse
  u.make_result = TheRosaryUtilities::MakeResult
  u.make_point = TheRosaryUtilities::MakePoint
  u.make_spec = TheRosaryUtilities::MakeSpec
  u.make_url = TheRosaryUtilities::MakeUrl
  u.param = TheRosaryUtilities::Param
  u.prepare_auth = TheRosaryUtilities::PrepareAuth
  u.prepare_body = TheRosaryUtilities::PrepareBody
  u.prepare_headers = TheRosaryUtilities::PrepareHeaders
  u.prepare_method = TheRosaryUtilities::PrepareMethod
  u.prepare_params = TheRosaryUtilities::PrepareParams
  u.prepare_path = TheRosaryUtilities::PreparePath
  u.prepare_query = TheRosaryUtilities::PrepareQuery
  u.result_basic = TheRosaryUtilities::ResultBasic
  u.result_body = TheRosaryUtilities::ResultBody
  u.result_headers = TheRosaryUtilities::ResultHeaders
  u.transform_request = TheRosaryUtilities::TransformRequest
  u.transform_response = TheRosaryUtilities::TransformResponse
}
