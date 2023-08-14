import React from "react";
import { createRoot } from "react-dom/client";
import type {
  SignInMessageParams,
  WalletSelector,
} from "@near-wallet-selector/core";

import type { WalletSelectorModal, ModalOptions } from "./modal.types";
import { Modal } from "./components/Modal";
import { EventEmitter } from "@near-wallet-selector/core";
import type { ModalEvents } from "./modal.types";

const MODAL_ELEMENT_ID = "near-wallet-selector-modal";

let modalInstance: WalletSelectorModal | null = null;

/**
 * Initiates a modal instance
 * @param {WalletSelector} selector Selector
 * @param {ModalOptions} options Modal options
 * @returns {WalletSelectorModal} Returns a WalletSelectorModal object
 */
export const setupModal = (
  selector: WalletSelector,
  options: ModalOptions
): WalletSelectorModal => {
  const el = document.createElement("div");
  el.id = MODAL_ELEMENT_ID;
  if (!document.getElementById(MODAL_ELEMENT_ID)) {
    document.body.appendChild(el);
  }

  const container = document.getElementById(MODAL_ELEMENT_ID);
  const root = createRoot(container!);
  const emitter = new EventEmitter<ModalEvents>();

  const render = (
    visible = false,
    message: SignInMessageParams | null = null
  ) => {
    root.render(
      <Modal
        selector={selector}
        options={options}
        visible={visible}
        hide={() => render(false)}
        emitter={emitter}
        message={message}
      />
    );
  };

  if (!modalInstance) {
    modalInstance = {
      show: () => {
        render(true);
      },
      hide: () => {
        render(false);
      },
      signInMessage(message: SignInMessageParams) {
        render(true, message);
      },
      on: (eventName, callback) => {
        return emitter.on(eventName, callback);
      },
      off: (eventName, callback) => {
        emitter.off(eventName, callback);
      },
    };
  }

  return modalInstance;
};
