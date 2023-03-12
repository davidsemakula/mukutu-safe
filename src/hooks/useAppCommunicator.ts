// Inspired by https://github.com/safe-global/web-core/blob/dev/src/components/safe-apps/AppFrame/useAppCommunicator.ts
import type { MutableRefObject } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { getAddress } from 'ethers/lib/utils';
import { BigNumber } from '@ethersproject/bignumber';
import { JsonRpcProvider } from '@ethersproject/providers';
import type { SafeAppData, TransactionDetails } from '@safe-global/safe-gateway-typescript-sdk';
import type { Permission, PermissionRequest } from '@gnosis.pm/safe-apps-sdk/dist/src/types/permissions';
import type {
  AddressBookItem,
  BaseTransaction,
  EIP712TypedData,
  EnvironmentInfo,
  GetBalanceParams,
  GetTxBySafeTxHashParams,
  RequestId,
  RPCPayload,
  SafeInfo,
  SendTransactionRequestParams,
  SendTransactionsParams,
  SignMessageParams,
  SignTypedMessageParams,
  ChainInfo,
  SafeBalances,
} from '@gnosis.pm/safe-apps-sdk';
import { Methods } from '@gnosis.pm/safe-apps-sdk';

import AppCommunicator from '../services/AppCommunicator';
import { SimpleChainInfo } from '../utils/types';

type JsonRpcResponse = {
  jsonrpc: string;
  id: number;
  result?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  error?: string;
};

export type SafePermissionsRequest = {
  origin: string;
  requestId: string;
  request: PermissionRequest[];
};

export type UseAppCommunicatorHandlers = {
  onConfirmTransactions: (txs: BaseTransaction[], requestId: RequestId, params?: SendTransactionRequestParams) => void;
  onSignMessage: (
    message: string | EIP712TypedData,
    requestId: string,
    method: Methods.signMessage | Methods.signTypedMessage,
  ) => void;
  onGetTxBySafeTxHash: (transactionId: string) => Promise<TransactionDetails>;
  onGetEnvironmentInfo: () => EnvironmentInfo;
  onGetSafeBalances: (currency: string) => Promise<SafeBalances>;
  onGetSafeInfo: () => SafeInfo;
  onGetChainInfo: () => ChainInfo | undefined;
  onGetPermissions: (origin: string) => Permission[];
  onSetPermissions: (permissionsRequest?: SafePermissionsRequest) => void;
  onRequestAddressBook: (origin: string) => AddressBookItem[];
};

const useAppCommunicator = (
  iframeRef: MutableRefObject<HTMLIFrameElement | null>,
  app: SafeAppData | undefined,
  chain: SimpleChainInfo | undefined,
  handlers: UseAppCommunicatorHandlers,
): AppCommunicator | undefined => {
  const [communicator, setCommunicator] = useState<AppCommunicator | undefined>(undefined);
  const safeAppWeb3Provider = useMemo(() => {
    if (chain?.rpcUrl) {
      return new JsonRpcProvider(chain.rpcUrl);
    }
  }, [chain]);

  useEffect(() => {
    let communicatorInstance: AppCommunicator;

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const initCommunicator = (iframeRef: MutableRefObject<HTMLIFrameElement>, app?: SafeAppData) => {
      communicatorInstance = new AppCommunicator(iframeRef, {
        onMessage: (msg) => {
          //
        },
        onError: (error, data) => {
          //
        },
      });

      setCommunicator(communicatorInstance);
    };
    /* eslint-enable @typescript-eslint/no-unused-vars */

    if (app) {
      initCommunicator(iframeRef as MutableRefObject<HTMLIFrameElement>, app);
    }

    return () => {
      communicatorInstance?.clear();
    };
  }, [app, iframeRef]);

  // Adding communicator logic for the required SDK Methods
  // We don't need to unsubscribe from the events because there can be just one subscription
  // per event type and the next effect run will simply replace the handlers
  useEffect(() => {
    communicator?.on(Methods.getTxBySafeTxHash, (msg) => {
      const { safeTxHash } = msg.data.params as GetTxBySafeTxHashParams;
      return handlers.onGetTxBySafeTxHash(safeTxHash);
    });

    communicator?.on(Methods.getEnvironmentInfo, handlers.onGetEnvironmentInfo);

    communicator?.on(Methods.getSafeInfo, handlers.onGetSafeInfo);

    communicator?.on(Methods.getSafeBalances, (msg) => {
      const { currency = 'usd' } = msg.data.params as GetBalanceParams;
      return handlers.onGetSafeBalances(currency);
    });

    communicator?.on(Methods.rpcCall, async (msg) => {
      const params = msg.data.params as RPCPayload;
      try {
        return await safeAppWeb3Provider?.send(params.call, params.params);
      } catch (err) {
        throw new Error((err as JsonRpcResponse).error);
      }
    });

    communicator?.on(Methods.sendTransactions, (msg) => {
      const { txs, params } = msg.data.params as SendTransactionsParams;

      const transactions = txs.map(({ to, value, data }) => {
        return {
          to: getAddress(to),
          value: BigNumber.from(value).toString(),
          data,
        };
      });

      handlers.onConfirmTransactions(transactions, msg.data.id, params);
    });

    communicator?.on(Methods.signMessage, (msg) => {
      const { message } = msg.data.params as SignMessageParams;

      handlers.onSignMessage(message, msg.data.id, Methods.signMessage);
    });

    communicator?.on(Methods.signTypedMessage, (msg) => {
      const { typedData } = msg.data.params as SignTypedMessageParams;

      handlers.onSignMessage(typedData, msg.data.id, Methods.signTypedMessage);
    });

    communicator?.on(Methods.getChainInfo, handlers.onGetChainInfo);

    communicator?.on(Methods.wallet_getPermissions, (msg) => {
      return handlers.onGetPermissions(msg.origin);
    });

    communicator?.on(Methods.wallet_requestPermissions, (msg) => {
      handlers.onSetPermissions({
        origin: msg.origin,
        request: msg.data.params as PermissionRequest[],
        requestId: msg.data.id,
      });
    });

    communicator?.on(Methods.requestAddressBook, (msg) => {
      return handlers.onRequestAddressBook(msg.origin);
    });
  }, [safeAppWeb3Provider, handlers, chain, communicator]);

  return communicator;
};

export default useAppCommunicator;
