import type { OnInit } from "@angular/core";
import type { AccountState, WalletSelector } from "@peersyst/ws-core";
import { setupWalletSelector } from "@peersyst/ws-core";
import type { WalletSelectorModal } from "@peersyst/ws-modal-ui-js";
import { setupModal } from "@peersyst/ws-modal-ui-js";
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
import { setupNearSnap } from "@peersyst/ws-near-snap";
import { setupNeth } from "@peersyst/ws-neth";
import { setupWalletConnect } from "@peersyst/ws-wallet-connect";
import { Component } from "@angular/core";
import { setupMyNearWallet } from "@peersyst/ws-my-near-wallet";
import { setupRamperWallet } from "@peersyst/ws-ramper-wallet";
import { setupLedger } from "@peersyst/ws-ledger";
import { setupNearMobileWallet } from "@peersyst/ws-near-mobile-wallet";
import { setupMintbaseWallet } from "@peersyst/ws-mintbase-wallet";
import { setupBitteWallet } from "@peersyst/ws-bitte-wallet";
import { setupOKXWallet } from "@peersyst/ws-okx-wallet";
import { setupEthereumWallets } from "@peersyst/ws-ethereum-wallets";
import { createWeb3Modal } from "@web3modal/wagmi";
import { reconnect, http, createConfig, type Config } from "@wagmi/core";
import { type Chain } from "@wagmi/core/chains";
import { injected, walletConnect } from "@wagmi/connectors";
import { CONTRACT_ID } from "../../../constants";

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

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

@Component({
  selector: "near-wallet-selector-wallet-selector",
  templateUrl: "./wallet-selector.component.html",
  styleUrls: ["./wallet-selector.component.scss"],
})
export class WalletSelectorComponent implements OnInit {
  selector: WalletSelector;
  modal: WalletSelectorModal;
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
        setupOKXWallet(),
        setupNarwallets(),
        setupWelldoneWallet(),
        setupHereWallet(),
        setupCoin98Wallet(),
        setupNearFi(),
        setupNearSnap(),
        setupNeth({
          bundle: false,
        }),
        setupWalletConnect({
          projectId: "c8cb6204543639c31aef44ea4837a554", // Replace this with your own projectId form WalletConnect.
          // Overrides the default methods on wallet-connect.ts
          // the near_signMessage and near_verifyOwner are missing here.
          methods: [
            "near_signIn",
            "near_signOut",
            "near_getAccounts",
            "near_signTransaction",
            "near_signTransactions",
          ],
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
        setupEthereumWallets({ wagmiConfig, web3Modal }),
      ],
    });

    const _modal = setupModal(_selector, {
      contractId: CONTRACT_ID,
    });
    const state = _selector.store.getState();

    this.accounts = state.accounts;
    this.accountId =
      state.accounts.find((account) => account.active)?.accountId || null;

    window.selector = _selector;
    window.modal = _modal;

    this.selector = _selector;
    this.modal = _modal;
  }
}
