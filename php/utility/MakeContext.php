<?php
declare(strict_types=1);

// TheRosary SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TheRosaryMakeContext
{
    public static function call(array $ctxmap, ?TheRosaryContext $basectx): TheRosaryContext
    {
        return new TheRosaryContext($ctxmap, $basectx);
    }
}
