<?php
declare(strict_types=1);

// TheRosary SDK configuration

class TheRosaryConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "TheRosary",
                "slug" => "the-rosary",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://the-rosary-api.vercel.app",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "today" => [],
                    "v1n" => [],
                ],
            ],
            "entity" => [
        'today' => [
          'fields' => [
            [
              'name' => 'description',
              'short' => 'Description or meditation for the prayer',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'title',
              'short' => 'The title of the prayer or mystery',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'today',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/today',
                  'parts' => [
                    'v1',
                    'today',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.prayers`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'v1n' => [
          'fields' => [
            [
              'name' => 'day',
              'short' => 'The day of the week or occasion',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'mystery',
              'short' => 'The type of mystery (Joyful, Sorrowful, Glorious, or Luminous)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'prayers',
              'short' => 'List of prayers in the rosary',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'v1n',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'monday',
                        'kind' => 'param',
                        'name' => 'day',
                        'orig' => 'day',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/{day}',
                  'parts' => [
                    'v1',
                    '{day}',
                  ],
                  'select' => [
                    'exist' => [
                      'day',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'v1',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return TheRosaryFeatures::make_feature($name);
    }
}
