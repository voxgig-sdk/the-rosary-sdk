<?php
declare(strict_types=1);

// TheRosary SDK utility: done

class TheRosaryDone
{
    public static function call(TheRosaryContext $ctx): mixed
    {
        self::clean_explain($ctx);
        if ($ctx->result && $ctx->result->ok) {
            $resdata = $ctx->result->resdata;
            if (is_object($resdata)) {
                $resdata = (array)$resdata;
            }
            return $resdata;
        }
        return ($ctx->utility->make_error)($ctx, null);
    }

    // The record is an array the context owns (the caller's copy is its
    // own), so the cleaned copy is assigned back; err is pruned from it.
    public static function clean_explain(TheRosaryContext $ctx): void
    {
        if (!$ctx->ctrl->explain) {
            return;
        }
        $ctx->ctrl->explain = ($ctx->utility->clean)($ctx, $ctx->ctrl->explain);
        if (is_array($ctx->ctrl->explain['result'] ?? null)) {
            unset($ctx->ctrl->explain['result']['err']);
        }
    }
}
