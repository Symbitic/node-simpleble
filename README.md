# Node-SimpleBLE

[![Tags](https://img.shields.io/github/release/Symbitic/node-simpleble)](https://github.com/Symbitic/node-simpleble/releases)
[![Checks](https://github.com/Symbitic/node-simpleble/actions/workflows/test.yml/badge.svg)](https://github.com/Symbitic/node-simpleble/actions/workflows/test.yml)
[![License](https://img.shields.io/github/license/Symbitic/node-simpleble)](https://github.com/Symbitic/node-simpleble/blob/master/LICENSE)

Bluetooth Low Energy (BLE) library for Node, Deno, and Bun using the excellent
[SimpleBLE](https://github.com/OpenBluetoothToolbox/SimpleBLE) library.

## Installing

How you install node-simpleble depends on which runtime you are using.

### Node.js

    npm install --save simpleble

```ts
import { resolveBindings } from "simpleble";
```

### Bun.sh

    bun install simpleble

```ts
import { resolveBindings } from "simpleble";
```

### Deno

```ts
import { resolveBindings } from "https://deno.land/x/simpleble@0.1.0/mod.ts";
```

## Documentation

Check out the latest documentation here:
<https://doc.deno.land/https://deno.land/x/simpleble/mod.ts>

## Building

Node-SimpleBLE depends on SimpleBLE, so make sure submodules are checked out first:

    git submodule init
    git submodule update

To build Node-SimpleBLE:

    npm run build

## Running

After building SimpleBLE and the bindings, run one of the examples:

    deno run -A --unstable https://deno.land/x/simpleble@0.1.0/examples/deno/simpleble-scan.ts
    deno run -A --unstable ./deno_dist/examples/deno/simpleble-scan.ts
    npx ts-node-esm ./examples/node/simpleble-scan.ts

## License

Released under the [MIT License](LICENSE).
