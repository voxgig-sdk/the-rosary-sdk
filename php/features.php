<?php
declare(strict_types=1);

// TheRosary SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class TheRosaryFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new TheRosaryBaseFeature();
            case "test":
                return new TheRosaryTestFeature();
            default:
                return new TheRosaryBaseFeature();
        }
    }
}
