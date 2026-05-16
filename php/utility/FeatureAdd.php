<?php
declare(strict_types=1);

// TheRosary SDK utility: feature_add

class TheRosaryFeatureAdd
{
    public static function call(TheRosaryContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
