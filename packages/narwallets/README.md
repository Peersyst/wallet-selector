# @peersyst/ws-narwallets

This is the [Narwallets](https://chrome.google.com/webstore/detail/narwallets-v4/lkpeokpdkmcdaiadpmnnpimlgmdobkdj) package for NEAR Wallet Selector.

## Installation and Usage

The easiest way to use this package is to install it from the NPM registry:

```bash
# Using Yarn
yarn add @peersyst/ws-narwallets

# Using NPM.
npm install @peersyst/ws-narwallets
```

Then use it in your dApp:

```ts
import { setupWalletSelector } from "@peersyst/ws-core";
import { setupNarwallets } from "@peersyst/ws-narwallets";

// Narwallets for Wallet Selector can be setup without any params or it can take few optional params, see options below.
const narwallets = setupNarwallets({
  iconUrl: "https://<Wallet Icon URL Here>" // optional
});

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [narwallets],
});
```

## Options

- `iconUrl`: (`string?`): Image URL for the icon shown in the modal. This can also be a relative path or base64 encoded image. Defaults to `./assets/narwallets-logo.png`.
- `deprecated`: (`boolean?`): Deprecated is optional. Default is `false`.

## Assets

Assets such as icons can be found in the `/assets` directory of the package. Below is an example using Webpack:

```ts
import { setupNarwallets } from "@peersyst/ws-narwallets";
import narwalletsIconUrl from "@peersyst/ws-narwallets/assets/narwallets-icon.png";

const narwallets = setupNarwallets({
  iconUrl: narwalletsIconUrl
});
```

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0).
