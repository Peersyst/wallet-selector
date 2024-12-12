# NEAR Wallet Selector

NEAR Wallet Selector makes it easy for users to interact with your dApp by providing an abstraction over various wallets within the NEAR ecosystem:

- [Bitget Wallet](https://www.npmjs.com/package/@peersyst/ws-bitget-wallet) - Injected wallet.
- [Bitte Wallet](https://www.npmjs.com/package/@peersyst/ws-bitte-wallet) - Browser wallet.
- [Coin98 Wallet](https://www.npmjs.com/package/@peersyst/ws-coin98-wallet) - Injected wallet.
- [Ethereum wallets](https://www.npmjs.com/package/@peersyst/ws-ethereum-wallets) - Injected wallet.
- [Here Wallet](https://www.npmjs.com/package/@peersyst/ws-here-wallet) - Mobile wallet.
- [Ledger](https://www.npmjs.com/package/@peersyst/ws-ledger) - Hardware wallet.
- [Math Wallet](https://www.npmjs.com/package/@peersyst/ws-math-wallet) - Injected wallet.
- [Metamask Snap](https://www.npmjs.com/package/@peersyst/ws-near-snap) - Injected wallet.
- [Meteor Wallet](https://www.npmjs.com/package/@peersyst/ws-meteor-wallet) - Injected wallet.
- [Mintbase Wallet](https://www.npmjs.com/package/@peersyst/ws-mintbase-wallet) - Browser wallet.
- [My NEAR Wallet](https://www.npmjs.com/package/@peersyst/ws-my-near-wallet) - Browser wallet.
- [Narwallets](https://www.npmjs.com/package/@peersyst/ws-narwallets) - Injected wallet.
- [Near Mobile Wallet](https://www.npmjs.com/package/@peersyst/ws-near-mobile-wallet) - Mobile Wallet.
- [NearFi Wallet](https://www.npmjs.com/package/@peersyst/ws-nearfi) - Mobile wallet.
- [Neth](https://www.npmjs.com/package/@peersyst/ws-neth) - Injected wallet.
- [Nightly](https://www.npmjs.com/package/@peersyst/ws-nightly) - Injected wallet.
- [OKX Wallet](https://www.npmjs.com/package/@peersyst/ws-okx-wallet) - Injected wallet.
- [Ramper Wallet](https://www.npmjs.com/package/@peersyst/ws-ramper-wallet) - Injected wallet.
- [Sender](https://www.npmjs.com/package/@peersyst/ws-sender) - Injected wallet.
- [WalletConnect](https://www.npmjs.com/package/@peersyst/ws-wallet-connect) - Bridge wallet.
- [WELLDONE Wallet](https://www.npmjs.com/package/@peersyst/ws-welldone-wallet) - Injected wallet.
- [XDEFI Wallet](https://www.npmjs.com/package/@peersyst/ws-xdefi) - Injected wallet.

## Preview

[React](https://reactjs.org/) / [Next.js](https://nextjs.org/) and [Angular](https://angular.io/) variations of the [Guest Book](https://github.com/near-examples/guest-book/) dApp can be found in the [`examples`](/examples) directory. You can use these to gain a concrete understanding of how to integrate NEAR Wallet Selector into your own dApp.

![Preview](./images/preview.gif)

## Installation and Usage

The easiest way to use NEAR Wallet Selector is to install the [`core`](https://www.npmjs.com/package/@peersyst/ws-core) package from the NPM registry, some packages may require `near-api-js` v1.0.0 or above check them at [`packages`](./packages)

```bash
# Using Yarn
yarn add near-api-js

# Using NPM.
npm install near-api-js
```

```bash
# Using Yarn
yarn add @peersyst/ws-core

# Using NPM.
npm install @peersyst/ws-core
```

Next, you'll need to install the wallets you want to support:

```bash
# Using Yarn
yarn add \
  @peersyst/ws-bitget-wallet \
  @peersyst/ws-my-near-wallet \
  @peersyst/ws-sender \
  @peersyst/ws-nearfi \
  @peersyst/ws-here-wallet \
  @peersyst/ws-math-wallet \
  @peersyst/ws-nightly \
  @peersyst/ws-meteor-wallet \
  @peersyst/ws-okx-wallet \
  @peersyst/ws-narwallets \
  @peersyst/ws-welldone-wallet \
  @peersyst/ws-near-snap \
  @peersyst/ws-ledger \
  @peersyst/ws-wallet-connect \
  @peersyst/ws-coin98-wallet \
  @peersyst/ws-neth \
  @peersyst/ws-xdefi \
  @peersyst/ws-ramper-wallet \
  @peersyst/ws-near-mobile-wallet  \
  @peersyst/ws-bitget-wallet \
  @peersyst/ws-mintbase-wallet \
  @peersyst/ws-bitte-wallet \
  @peersyst/ws-ethereum-wallets


# Using NPM.
npm install \
  @peersyst/ws-bitget-wallet \
  @peersyst/ws-my-near-wallet \
  @peersyst/ws-sender \
  @peersyst/ws-nearfi \
  @peersyst/ws-here-wallet \
  @peersyst/ws-math-wallet \
  @peersyst/ws-nightly \
  @peersyst/ws-meteor-wallet \
  @peersyst/ws-okx-wallet \
  @peersyst/ws-narwallets \
  @peersyst/ws-welldone-wallet \
  @peersyst/ws-near-snap \
  @peersyst/ws-ledger \
  @peersyst/ws-wallet-connect \
  @peersyst/ws-coin98-wallet \
  @peersyst/ws-neth \
  @peersyst/ws-xdefi \
  @peersyst/ws-ramper-wallet \
  @peersyst/ws-near-mobile-wallet \
  @peersyst/ws-bitget-wallet \
  @peersyst/ws-mintbase-wallet \
  @peersyst/ws-bitte-wallet \
  @peersyst/ws-ethereum-wallets
```

Optionally, you can install our [`modal-ui`](https://www.npmjs.com/package/@peersyst/ws-modal-ui) or [`modal-ui-js`](https://www.npmjs.com/package/@peersyst/ws-modal-ui-js) package for a pre-built interface that wraps the `core` API and presents the supported wallets:

```bash
# Using Yarn
yarn add @peersyst/ws-modal-ui

# Using NPM.
npm install @peersyst/ws-modal-ui
```

Then in your dApp:

```ts
import { setupWalletSelector } from "@peersyst/ws-core";
import { setupModal } from "@peersyst/ws-modal-ui";
import { setupBitgetWallet } from "@peersyst/ws-bitget-wallet";
import { setupMyNearWallet } from "@peersyst/ws-my-near-wallet";
import { setupSender } from "@peersyst/ws-sender";
import { setupHereWallet } from "@peersyst/ws-here-wallet";
import { setupNearSnap } from "@peersyst/ws-near-snap";
import { setupMathWallet } from "@peersyst/ws-math-wallet";
import { setupNightly } from "@peersyst/ws-nightly";
import { setupMeteorWallet } from "@peersyst/ws-meteor-wallet";
import { setupOkxWallet } from "@peersyst/ws-okx-wallet";
import { setupNarwallets } from "@peersyst/ws-narwallets";
import { setupWelldoneWallet } from "@peersyst/ws-welldone-wallet";
import { setupLedger } from "@peersyst/ws-ledger";
import { setupWalletConnect } from "@peersyst/ws-wallet-connect";
import { setupNearFi } from "@peersyst/ws-nearfi";
import { setupCoin98Wallet } from "@peersyst/ws-coin98-wallet";
import { setupNeth } from "@peersyst/ws-neth";
import { setupXDEFI } from "@peersyst/ws-xdefi";
import { setupRamperWallet } from "@peersyst/ws-ramper-wallet";
import { setupNearMobileWallet } from "@peersyst/ws-near-mobile-wallet"; 
import { setupMintbaseWallet } from "@peersyst/ws-mintbase-wallet"; 
import { setupBitteWallet } from "@peersyst/ws-bitte-wallet";
import { setupEthereumWallets } from "@peersyst/ws-ethereum-wallets";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [
    setupBitgetWallet(),
    setupMyNearWallet(),
    setupSender(),
    setupHereWallet(),
    setupMathWallet(),
    setupNightly(),
    setupMeteorWallet(),
    setupNearSnap(),
    setupOkxWallet(),
    setupNarwallets(),
    setupWelldoneWallet(),
    setupLedger(),
    setupNearFi(),
    setupCoin98Wallet(),
    setupNeth(),
    setupXDEFI(),
    setupWalletConnect({
      projectId: "c4f79cc...",
      metadata: {
        name: "NEAR Wallet Selector",
        description: "Example dApp used by NEAR Wallet Selector",
        url: "https://github.com/Peersyst/wallet-selector",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    }),
    setupNearMobileWallet(),
    setupMintbaseWallet({
          networkId: "mainnet",
          walletUrl: "https://wallet.mintbase.xyz",
          callbackUrl: "https://www.mywebsite.com",
          deprecated: false,
    }),
    setupBitteWallet({
        networkId: "mainnet",
        walletUrl: "https://wallet.bitte.ai",
        callbackUrl: "https://www.mywebsite.com",
        deprecated: false,
    }),
    setupEthereumWallets({ wagmiConfig, web3Modal }),
  ],
});

const modal = setupModal(selector, {
  contractId: "guest-book.testnet"
});
```

## Wallet Package Documentation

Each wallet package contains its own `README` document, please refer inside the [packages folder](https://github.com/Peersyst/wallet-selector/tree/main/packages) for extra information.

## Contributing

Contributors may find the [`examples`](./examples) directory useful as it provides a quick and consistent way to manually test new changes and/or bug fixes.

More details around contributing to this project can be found [here](./CONTRIBUTING.md).

## Editor Setup

This project uses [ESLint](https://eslint.org/) (with [Prettier](https://prettier.io/)) to enforce a consistent coding style. It's important that you configure your editor correctly to avoid issues when you're ready to open a Pull Request.

Although this project uses Prettier, it's simply an "internal" dependency to our ESLint configuration. This is because we want Prettier to handle code styling while avoiding conflicts with ESLint which specifically focuses on potentially problematic code. As a result, **it's important that you switch off Prettier in your editor and ensure only ESLint is enabled**.

## License

This repository is distributed under the terms of both the MIT license and the Apache License (Version 2.0). See [LICENSE-MIT](LICENSE-MIT) and [LICENSE-APACHE](LICENSE-APACHE) for details.
