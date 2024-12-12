import { setupWalletSelector } from "@peersyst/ws-core";
import { setupModal } from "@peersyst/ws-modal-ui-js";
import { setupMyNearWallet } from "@peersyst/ws-my-near-wallet";
import { setupHereWallet } from "@peersyst/ws-here-wallet";

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [setupMyNearWallet(), setupHereWallet()],
});

const modal = setupModal(selector, {
  contractId: "test.testnet",
});

window.selector = selector;
window.modal = modal;

document.getElementById('open-walletselector-button').addEventListener('click', () => modal.show());

