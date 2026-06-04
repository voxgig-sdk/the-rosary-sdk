# TheRosary SDK

Fetch Catholic rosary prayers in JSON by day, mystery, novena, or arbitrary date

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About The Rosary Api

[The Rosary Api](https://therosaryapi.cf/) is a small JSON service that returns the text (and, for some endpoints, audio links) of Catholic rosary prayers. It is run as a personal project by Eric Kouassi and described by the maintainer as a goodwill effort to help people pray the rosary online.

What you get from the API:

- Today / yesterday / tomorrow's rosary (`/v1/today`, `/v1/yesterday`, `/v1/tomorrow`).
- The rosary for a specific weekday (`/v1/monday` … `/v1/sunday`).
- The rosary for an arbitrary date via `/v1/date/:MMDDYY`.
- The four sets of mysteries: `/v1/joyful`, `/v1/glorious`, `/v1/sorrowful`, `/v1/luminous`.
- A random rosary (`/v1/random`) and a listing endpoint (`/v1/list`).
- Novena prayers via `/v1/novena`, `/v1/novena/:MMDDYY`, and `/v1/54daynovena`.

Operational notes: no authentication is required, CORS is enabled, and both HTTP and HTTPS are supported. The maintainer states there are no usage limits as long as the service is not abused. The community catalogue page reports ~100% uptime and sub-300 ms typical response times.

## Try it

**TypeScript**
```bash
npm install the-rosary
```

**Python**
```bash
pip install the-rosary-sdk
```

**PHP**
```bash
composer require voxgig/the-rosary-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/the-rosary-sdk/go
```

**Ruby**
```bash
gem install the-rosary-sdk
```

**Lua**
```bash
luarocks install the-rosary-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { TheRosarySDK } from 'the-rosary'

const client = new TheRosarySDK({})

// List all todays
const todays = await client.Today().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o the-rosary-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "the-rosary": {
      "command": "/abs/path/to/the-rosary-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Today** | Day-relative rosary prayers — endpoints like `/v1/today`, `/v1/yesterday`, `/v1/tomorrow`, and the weekday paths `/v1/monday` … `/v1/sunday`. | `/v1/today` |
| **V1n** | Versioned (v1) prayer collections keyed by name or date — the mystery sets (`/v1/joyful`, `/v1/glorious`, `/v1/sorrowful`, `/v1/luminous`), `/v1/random`, `/v1/list`, dated lookups (`/v1/date/:MMDDYY`), and the novena endpoints (`/v1/novena`, `/v1/novena/:MMDDYY`, `/v1/54daynovena`). | `/v1/{day}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from therosary_sdk import TheRosarySDK

client = TheRosarySDK({})

# List all todays
todays, err = client.Today(None).list(None, None)
```

### PHP

```php
<?php
require_once 'therosary_sdk.php';

$client = new TheRosarySDK([]);

// List all todays
[$todays, $err] = $client->Today(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/the-rosary-sdk/go"

client := sdk.NewTheRosarySDK(map[string]any{})

// List all todays
todays, err := client.Today(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "TheRosary_sdk"

client = TheRosarySDK.new({})

# List all todays
todays, err = client.Today(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("the-rosary_sdk")

local client = sdk.new({})

-- List all todays
local todays, err = client:Today(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = TheRosarySDK.test()
const result = await client.Today().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = TheRosarySDK.test(None, None)
result, err = client.Today(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = TheRosarySDK::test(null, null);
[$result, $err] = $client->Today(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Today(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = TheRosarySDK.test(nil, nil)
result, err = client.Today(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Today(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the The Rosary Api

- Upstream: [https://therosaryapi.cf/](https://therosaryapi.cf/)

- Maintainer states the API is a personal goodwill project, not built to make money.
- Non-commercial use only; attribution is optional.
- No formal open-source licence is published on the project page.
- Please avoid abusive request patterns out of courtesy to the maintainer.

---

Generated from the The Rosary Api OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
