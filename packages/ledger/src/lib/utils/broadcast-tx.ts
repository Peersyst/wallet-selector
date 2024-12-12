import type { FinalExecutionOutcome, Network } from "@peersyst/ws-core";
import { providers } from "near-api-js";
import type { SignedTransaction } from "near-api-js/lib/transaction";

export interface BroadcastTxParams {
  signedTransaction: SignedTransaction;
  network: Network;
}

export const broadcastTx = async ({
  network,
  signedTransaction,
}: BroadcastTxParams): Promise<FinalExecutionOutcome> => {
  const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });
  return await provider.sendTransaction(signedTransaction);
};
