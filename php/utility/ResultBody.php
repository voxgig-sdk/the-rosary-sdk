<?php
declare(strict_types=1);

// TheRosary SDK utility: result_body

class TheRosaryResultBody
{
    public static function call(TheRosaryContext $ctx): ?TheRosaryResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
