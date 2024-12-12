# @peersyst/ws-sender

This is the [Sender](https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg) package for NEAR Wallet Selector.

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
yarn add @peersyst/ws-sender

# Using NPM.
npm install @peersyst/ws-sender
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@peersyst/ws-core";
import { setupSender } from "@peersyst/ws-sender";

// Sender for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const sender = setupSender({
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [sender],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/sender-icon.png`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupSender } from "@peersyst/ws-sender";
import senderIconUrl from "@peersyst/ws-sender/assets/sender-icon.png";

const sender = setupSender({
  iconUrl: senderIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
