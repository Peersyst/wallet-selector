import { setupCoin98Wallet } from "@peersyst/ws-coin98-wallet";
import type {
  AccountState,
  InjectedWalletBehaviour,
  WalletSelector,
} from "@peersyst/ws-core";
import { setupWalletSelector } from "@peersyst/ws-core";
import { setupHereWallet } from "@peersyst/ws-here-wallet";
import { setupMathWallet } from "@peersyst/ws-math-wallet";
import { setupMeteorWallet } from "@peersyst/ws-meteor-wallet";
import { setupNarwallets } from "@peersyst/ws-narwallets";
import type { WalletSelectorModal } from "@peersyst/ws-modal-ui";
import { setupModal } from "@peersyst/ws-modal-ui";
import { setupNearFi } from "@peersyst/ws-nearfi";
import { setupNightly } from "@peersyst/ws-nightly";
import { setupSender } from "@peersyst/ws-sender";
import { setupBitgetWallet } from "@peersyst/ws-bitget-wallet";
import { setupWalletConnect } from "@peersyst/ws-wallet-connect";
import { setupWelldoneWallet } from "@peersyst/ws-welldone-wallet";
import { setupNearSnap } from "@peersyst/ws-near-snap";
import { setupNeth } from "@peersyst/ws-neth";
import { setupMyNearWallet } from "@peersyst/ws-my-near-wallet";
import { setupLedger } from "@peersyst/ws-ledger";
import { setupXDEFI } from "@peersyst/ws-xdefi";
import { setupRamperWallet } from "@peersyst/ws-ramper-wallet";
import { setupNearMobileWallet } from "@peersyst/ws-near-mobile-wallet";
import { setupMintbaseWallet } from "@peersyst/ws-mintbase-wallet";
import { setupBitteWallet } from "@peersyst/ws-bitte-wallet";
import { setupOKXWallet } from "@peersyst/ws-okx-wallet";
import { setupEthereumWallets } from "@peersyst/ws-ethereum-wallets";

import type { ReactNode } from "react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { distinctUntilChanged, map } from "rxjs";
import { createWeb3Modal } from "@web3modal/wagmi";
import type { GetAccountReturnType } from "@wagmi/core";
import {
  reconnect,
  http,
  createConfig,
  type Config,
  watchAccount,
} from "@wagmi/core";
import { type Chain } from "@wagmi/core/chains";
import { injected, walletConnect } from "@wagmi/connectors";

import { Loading } from "../components/Loading";
import { CONTRACT_ID } from "../constants";

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

interface WalletSelectorContextValue {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: Array<AccountState>;
  accountId: string | null;
}

const WalletSelectorContext =
  React.createContext<WalletSelectorContextValue | null>(null);

// Get a project ID at https://cloud.walletconnect.com
const projectId = "30147604c5f01d0bc4482ab0665b5697";

const near: Chain = {
  id: 398,
  name: "NEAR Protocol Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "NEAR",
    symbol: "NEAR",
  },
  rpcUrls: {
    default: { http: ["https://eth-rpc.testnet.near.org"] },
    public: { http: ["https://eth-rpc.testnet.near.org"] },
  },
  blockExplorers: {
    default: {
      name: "NEAR Explorer",
      url: "https://eth-explorer-testnet.near.org",
    },
  },
  testnet: true,
};

const wagmiConfig: Config = createConfig({
  chains: [near],
  transports: {
    [near.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId,
      metadata: {
        name: "NEAR Guest Book",
        description: "A guest book with comments stored on the NEAR blockchain",
        url: "https://near.github.io/wallet-selector",
        icons: ["https://near.github.io/wallet-selector/favicon.ico"],
      },
      showQrModal: false,
    }),
    injected({ shimDisconnect: true }),
  ],
});
reconnect(wagmiConfig);

const web3Modal = createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId,
  enableOnramp: false,
  allWallets: "SHOW",
});

export const WalletSelectorContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Log in with Ethereum flow: auto connect to ethereum-wallets without showing the NEAR modal.
  useEffect(() => {
    if (!selector) {
      return;
    }
    // Watch the connected Ethereum account and connect to the `ethereum-wallets` module automatically.
    watchAccount(wagmiConfig, {
      onChange: (data: GetAccountReturnType) => {
        if (!data.address || selector.store.getState().selectedWalletId) {
          return;
        }
        selector.wallet("ethereum-wallets").then((wallet) =>
          (wallet as InjectedWalletBehaviour).signIn({
            contractId: CONTRACT_ID,
          })
        );
      },
    });
  }, [selector]);

  const init = useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: "testnet",
      debug: true,
      modules: [
        setupMyNearWallet(),
        setupLedger(),
        setupSender(),
        setupBitgetWallet(),
        setupMathWallet(),
        setupNightly(),
        setupMeteorWallet(),
        setupNearSnap(),
        setupOKXWallet(),
        setupNarwallets(),
        setupWelldoneWallet(),
        setupHereWallet(),
        setupCoin98Wallet(),
        setupNearFi(),
        setupRamperWallet(),
        setupNeth({
          gas: "300000000000000",
          bundle: false,
        }),
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
        setupMintbaseWallet({ contractId: CONTRACT_ID }),
        setupBitteWallet({ contractId: CONTRACT_ID }),
        setupEthereumWallets({ wagmiConfig, web3Modal }),
      ],
    });
    const _modal = setupModal(_selector, {
      contractId: CONTRACT_ID,
    });
    const state = _selector.store.getState();
    setAccounts(state.accounts);

    // this is added for debugging purpose only
    // for more information (https://github.com/Peersyst/wallet-selector/pull/764#issuecomment-1498073367)
    window.selector = _selector;
    window.modal = _modal;

    setSelector(_selector);
    setModal(_modal);
    setLoading(false);
  }, []);

  useEffect(() => {
    init().catch((err) => {
      console.error(err);
      alert("Failed to initialise wallet selector");
    });
  }, [init]);

  useEffect(() => {
    if (!selector) {
      return;
    }

    const subscription = selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        console.log("Accounts Update", nextAccounts);

        setAccounts(nextAccounts);
      });

    const onHideSubscription = modal!.on("onHide", ({ hideReason }) => {
      console.log(`The reason for hiding the modal ${hideReason}`);
    });

    return () => {
      subscription.unsubscribe();
      onHideSubscription.remove();
    };
  }, [selector, modal]);

  const walletSelectorContextValue = useMemo<WalletSelectorContextValue>(
    () => ({
      selector: selector!,
      modal: modal!,
      accounts,
      accountId: accounts.find((account) => account.active)?.accountId || null,
    }),
    [selector, modal, accounts]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <WalletSelectorContext.Provider value={walletSelectorContextValue}>
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);

  if (!context) {
    throw new Error(
      "useWalletSelector must be used within a WalletSelectorContextProvider"
    );
  }

  return context;
}
