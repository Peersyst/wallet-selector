# @peersyst/ws-xdefi

This is the [XDEFI](https://www.xdefi.io/) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v1.0.0 or above:

```bash
# Using Yarn
yarn add near-api-js@^1.0.0

# Using NPM.
npm install near-api-js@^1.0.0
```
```bash
# Using Yarn
yarn add @peersyst/ws-xdefi

# Using NPM.
npm install @peersyst/ws-xdefi
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@peersyst/ws-core";
import { setupXDEFI } from "@peersyst/ws-xdefi";

// XDEFI for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const xdefi = setupXDEFI({
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [xdefi],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/xdefi-icon.png`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupXDEFI } from "@peersyst/ws-xdefi";
import xdefiIconUrl from "@peersyst/ws-xdefi/assets/xdefi-icon.png";

const xdefi = setupXDEFI({
  iconUrl: xdefiIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
