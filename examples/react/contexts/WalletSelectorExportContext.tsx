import type { ReactNode } from "react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { map, distinctUntilChanged } from "rxjs";
import { setupWalletSelector } from "@peersyst/ws-core";
import type { WalletSelector, AccountState } from "@peersyst/ws-core";
import { setupExportSelectorModal } from "@peersyst/ws-account-export";
import type { WalletSelectorModal } from "@peersyst/ws-account-export";
import { setupHereWallet } from "@peersyst/ws-here-wallet";
import { setupSender } from "@peersyst/ws-sender";
import { setupBitgetWallet } from "@peersyst/ws-bitget-wallet";
import { setupMathWallet } from "@peersyst/ws-math-wallet";
import { setupNightly } from "@peersyst/ws-nightly";
import { setupMeteorWallet } from "@peersyst/ws-meteor-wallet";
import { setupWelldoneWallet } from "@peersyst/ws-welldone-wallet";
import { setupNearFi } from "@peersyst/ws-nearfi";
import { setupWalletConnect } from "@peersyst/ws-wallet-connect";
import { setupCoin98Wallet } from "@peersyst/ws-coin98-wallet";
import { Loading } from "../components/Loading";
import { setupMyNearWallet } from "@peersyst/ws-my-near-wallet";
import { setupLedger } from "@peersyst/ws-ledger";
import { setupRamperWallet } from "@peersyst/ws-ramper-wallet";
import { setupNearMobileWallet } from "@peersyst/ws-near-mobile-wallet";
import { setupMintbaseWallet } from "@peersyst/ws-mintbase-wallet";
import { setupBitteWallet } from "@peersyst/ws-bitte-wallet";
import { CONTRACT_ID } from "../constants";

declare global {
  interface Window {
    importSelector: WalletSelector;
    exportModal: WalletSelectorModal;
  }
}

interface ExportAccountSelectorContextValue {
  importSelector: WalletSelector;
  exportModal: WalletSelectorModal;
  accounts: Array<AccountState>;
  accountId: string | null;
}

const ExportAccountSelectorContext =
  React.createContext<ExportAccountSelectorContextValue | null>(null);

export const ExportAccountSelectorContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [importSelector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        setupWelldoneWallet(),
        setupHereWallet(),
        setupCoin98Wallet(),
        setupNearFi(),
        setupRamperWallet(),
        setupMintbaseWallet({ contractId: CONTRACT_ID }),
        setupBitteWallet({ contractId: CONTRACT_ID }),
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
      ],
    });
    /**
     * Insert list of accounts to be imported here
     * accounts: [{ accountId: "test.testnet", privateKey: "ed25519:..."}, ...]
     */
    const _modal = setupExportSelectorModal(_selector, {
      accounts: [],
      onComplete: (completeProps) => {
        console.log(
          `${completeProps.accounts} exported to ${completeProps.walletName}`
        );
      },
    });
    const state = _selector.store.getState();
    setAccounts(state.accounts);

    // this is added for debugging purpose only
    // for more information (https://github.com/Peersyst/wallet-selector/pull/764#issuecomment-1498073367)
    window.importSelector = _selector;
    window.exportModal = _modal;

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
    if (!importSelector) {
      return;
    }

    const subscription = importSelector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        setAccounts(nextAccounts);
      });

    return () => subscription.unsubscribe();
  }, [importSelector]);

  const exportWalletSelectorContextValue =
    useMemo<ExportAccountSelectorContextValue>(
      () => ({
        importSelector: importSelector!,
        exportModal: modal!,
        accounts,
        accountId:
          accounts.find((account) => account.active)?.accountId || null,
      }),
      [importSelector, modal, accounts]
    );

  if (loading) {
    return <Loading />;
  }

  return (
    <ExportAccountSelectorContext.Provider
      value={exportWalletSelectorContextValue}
    >
      {children}
    </ExportAccountSelectorContext.Provider>
  );
};

export function useExportAccountSelector() {
  const context = useContext(ExportAccountSelectorContext);

  if (!context) {
    throw new Error(
      "useExportAccountSelector must be used within a ExportAccountSelectorContextProvider"
    );
  }

  return context;
}
