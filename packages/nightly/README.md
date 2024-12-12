# @peersyst/ws-nightly


This is the [Nightly](https://wallet.nightly.app/) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry, this package requires `near-api-js` v1.0.0 or above:

```bash
# Using Yarn
yarn add near-api-js

# Using NPM.
npm install near-api-js
```

```bash
# Using Yarn
yarn add @peersyst/ws-nightly

# Using NPM.
npm install @peersyst/ws-nightly
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@peersyst/ws-core";
import { setupNightly } from "@peersyst/ws-nightly";

// Nightly for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const nightly = setupNightly({
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [nightly],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/nightly-icon.png`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupNightly } from "@peersyst/ws-nightly";
import nightlyIconUrl from "@peersyst/ws-nightly/assets/nightly.png";

const nightly = setupNightly({
  iconUrl: nightlyIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
