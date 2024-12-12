import type { HereInitializeOptions } from "@here-wallet/core";
import type { WalletBehaviourFactory, InjectedWallet } from "@peersyst/ws-core";

export type SelectorInit = WalletBehaviourFactory<
  InjectedWallet,
  { walletOptions?: HereInitializeOptions }
>;
