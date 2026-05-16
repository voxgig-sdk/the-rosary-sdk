<?php
declare(strict_types=1);

// TheRosary SDK base feature

class TheRosaryBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(TheRosaryContext $ctx, array $options): void {}
    public function PostConstruct(TheRosaryContext $ctx): void {}
    public function PostConstructEntity(TheRosaryContext $ctx): void {}
    public function SetData(TheRosaryContext $ctx): void {}
    public function GetData(TheRosaryContext $ctx): void {}
    public function GetMatch(TheRosaryContext $ctx): void {}
    public function SetMatch(TheRosaryContext $ctx): void {}
    public function PrePoint(TheRosaryContext $ctx): void {}
    public function PreSpec(TheRosaryContext $ctx): void {}
    public function PreRequest(TheRosaryContext $ctx): void {}
    public function PreResponse(TheRosaryContext $ctx): void {}
    public function PreResult(TheRosaryContext $ctx): void {}
    public function PreDone(TheRosaryContext $ctx): void {}
    public function PreUnexpected(TheRosaryContext $ctx): void {}
}
