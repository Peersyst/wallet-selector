import type { OnInit } from "@angular/core";
import type { AccountState, WalletSelector } from "@peersyst/ws-core";
import { setupWalletSelector } from "@peersyst/ws-core";
import type { WalletSelectorModal } from "@peersyst/ws-account-export";
import { setupSender } from "@peersyst/ws-sender";
import { setupBitgetWallet } from "@peersyst/ws-bitget-wallet";
import { setupXDEFI } from "@peersyst/ws-xdefi";
import { setupMathWallet } from "@peersyst/ws-math-wallet";
import { setupNightly } from "@peersyst/ws-nightly";
import { setupMeteorWallet } from "@peersyst/ws-meteor-wallet";
import { setupNarwallets } from "@peersyst/ws-narwallets";
import { setupWelldoneWallet } from "@peersyst/ws-welldone-wallet";
import { setupHereWallet } from "@peersyst/ws-here-wallet";
import { setupCoin98Wallet } from "@peersyst/ws-coin98-wallet";
import { setupNearFi } from "@peersyst/ws-nearfi";
import { setupNeth } from "@peersyst/ws-neth";
import { setupWalletConnect } from "@peersyst/ws-wallet-connect";
import { Component } from "@angular/core";
import { setupExportSelectorModal } from "@peersyst/ws-account-export";
import { setupMyNearWallet } from "@peersyst/ws-my-near-wallet";
import { setupRamperWallet } from "@peersyst/ws-ramper-wallet";
import { setupNearMobileWallet } from "@peersyst/ws-near-mobile-wallet";
import { setupLedger } from "@peersyst/ws-ledger";
import { setupMintbaseWallet } from "@peersyst/ws-mintbase-wallet";
import { setupBitteWallet } from "@peersyst/ws-bitte-wallet";
import { CONTRACT_ID } from "../../../constants";

declare global {
  interface Window {
    exportSelector: WalletSelector;
    exportModal: WalletSelectorModal;
  }
}

@Component({
  selector: "near-wallet-selector-wallet-selector-export",
  templateUrl: "./wallet-selector-export.component.html",
  styleUrls: ["./wallet-selector-export.component.scss"],
})
export class WalletSelectorExportComponent implements OnInit {
  exportSelector: WalletSelector;
  exportModal: WalletSelectorModal;
  accountId: string | null;
  accounts: Array<AccountState> = [];

  async ngOnInit() {
    await this.initialize().catch((err) => {
      console.error(err);
      alert("Failed to initialise wallet selector");
    });
  }

  async initialize() {
    const _selector = await setupWalletSelector({
      network: "testnet",
      debug: true,
      modules: [
        setupMyNearWallet(),
        setupLedger(),
        setupSender(),
        setupBitgetWallet(),
        setupXDEFI(),
        setupMathWallet(),
        setupNightly(),
        setupMeteorWallet(),
        setupNarwallets(),
        setupWelldoneWallet(),
        setupHereWallet(),
        setupCoin98Wallet(),
        setupNearFi(),
        setupNeth({
          bundle: false,
        }),
        setupWalletConnect({
          projectId: "c4f79cc...",
          metadata: {
            name: "NEAR Wallet Selector",
            description: "Example dApp used by NEAR Wallet Selector",
            url: "https://github.com/Peersyst/wallet-selector",
            icons: ["https://avatars.githubusercontent.com/u/37784886"],
          },
        }),
        setupRamperWallet(),
        setupNearMobileWallet(),
        setupMintbaseWallet({ contractId: CONTRACT_ID }),
        setupBitteWallet({ contractId: CONTRACT_ID }),
      ],
    });
    /**
     * Insert list of accounts to be imported here
     * accounts: [{ accountId: "test.testnet", privateKey: "ed25519:..."}, ...]
     */
    const _modal = setupExportSelectorModal(_selector, {
      accounts: [],
      onComplete: (completedAccounts) => {
        console.log("Transfer Completed: ", completedAccounts);
      },
    });
    const state = _selector.store.getState();

    this.accounts = state.accounts;
    this.accountId =
      state.accounts.find((account) => account.active)?.accountId || null;

    window.exportSelector = _selector;
    window.exportModal = _modal;

    this.exportSelector = _selector;
    this.exportModal = _modal;
  }

  show() {
    this.exportModal.show();
  }
}
