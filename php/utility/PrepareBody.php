<?php
declare(strict_types=1);

// TheRosary SDK utility: prepare_body

class TheRosaryPrepareBody
{
    public static function call(TheRosaryContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
