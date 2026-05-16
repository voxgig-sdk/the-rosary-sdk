<?php
declare(strict_types=1);

// TheRosary SDK utility: result_headers

class TheRosaryResultHeaders
{
    public static function call(TheRosaryContext $ctx): ?TheRosaryResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
