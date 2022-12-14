import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import {
  BaseTransaction,
  ChainInfo,
  EIP712TypedData,
  GatewayTransactionDetails,
  Methods,
  RequestId,
  SafeBalances,
  SafeInfo,
  SendTransactionRequestParams,
  SendTransactionsResponse,
} from '@gnosis.pm/safe-apps-sdk';
import { TransactionDetails } from '@safe-global/safe-gateway-typescript-sdk';

import AppContext from '../context/AppContext';
import useAppCommunicator, { UseAppCommunicatorHandlers } from '../hooks/useAppCommunicator';
import SafeAppFrame from './SafeAppFrame';
import TransactionStatus, { Status } from './TransactionStatus';
import { getChainInfoByName, parseSafeChainInfo, SimpleChainInfo } from '../utils/chains';
import { isSameUrl } from '../utils/helpers';
import { isTransactionBatchSupported, translateTransactions } from '../services/interchain';

export default function SafeApp(): React.ReactElement {
  const { sdk } = useSafeAppsSDK();
  const { origin, originAddress, remote, remoteAddress, app, setIsAppLoading } = useContext(AppContext);
  const remoteChain = useMemo(() => getChainInfoByName(remote), [remote]);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [status, setStatus] = useState<Status>(Status.composing);
  const [lastSafeTxHash, setLastSafeTxHash] = useState<string>('');
  const [lastTxHash, setLastTxHash] = useState<string>('');
  const txHashTimerRef = useRef<NodeJS.Timeout>();
  const txHashTimerTries = useRef<number>(0);

  const clearTxHashTimer = () => {
    if (txHashTimerRef.current) {
      clearInterval(txHashTimerRef.current);
    }
    txHashTimerTries.current = 0;
  };

  const communicator = useAppCommunicator(iframeRef, app, remoteChain, {
    onConfirmTransactions: async (
      txs: BaseTransaction[],
      requestId: RequestId,
      params?: SendTransactionRequestParams,
    ) => {
      setStatus(Status.initiating);
      setLastSafeTxHash('');
      setLastTxHash('');
      clearTxHashTimer();

      if (isTransactionBatchSupported(txs)) {
        try {
          const { safeTxHash } = await sdk.txs.send({
            txs: translateTransactions(origin, remote, txs),
            params,
          });
          communicator?.send({ safeTxHash }, requestId, false);
          setStatus(Status.completed);
          setLastSafeTxHash(safeTxHash);
        } catch (e) {
          communicator?.send(e, requestId, true);
          setStatus(Status.canceled);
        }
      } else {
        communicator?.send('Unsupported transaction type', requestId, true);
        setStatus(Status.unsupported);
      }
    },
    onSignMessage: async (
      message: string | EIP712TypedData,
      requestId: string,
      method: Methods.signMessage | Methods.signTypedMessage,
    ) => {
      try {
        const signingFn = sdk.txs[method] as (message: string | EIP712TypedData) => Promise<SendTransactionsResponse>;
        const { safeTxHash } = await signingFn(message);
        communicator?.send({ safeTxHash }, requestId, false);
      } catch (e) {
        communicator?.send(e, requestId, true);
      }
    },
    onGetTxBySafeTxHash: (transactionId: string): Promise<TransactionDetails | GatewayTransactionDetails> => {
      return sdk.txs.getBySafeTxHash(transactionId);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onGetSafeBalances: async (currency: string): Promise<SafeBalances> => {
      // TODO: @david Replace mock response with real list of user's assets
      return {
        fiatTotal: '0',
        items: [],
      };
    },
    onGetSafeInfo: (): SafeInfo => ({
      safeAddress: remoteAddress,
      chainId: remoteChain?.id as number,
      threshold: 1,
      owners: [originAddress],
      isReadOnly: false,
    }),
    onGetChainInfo: (): ChainInfo => parseSafeChainInfo(remoteChain as SimpleChainInfo),
  } as Partial<UseAppCommunicatorHandlers> as UseAppCommunicatorHandlers);

  useEffect(() => {
    setIsAppLoading(true);
    return () => {
      setIsAppLoading(false);
    };
  }, [setIsAppLoading]);

  const onIframeLoad = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || !isSameUrl(iframe?.src ?? '', app?.url ?? '')) {
      return;
    }
    setIsAppLoading(false);
  }, [app?.url, iframeRef, setIsAppLoading]);

  useEffect(() => {
    if (lastSafeTxHash && !lastTxHash) {
      txHashTimerRef.current = setInterval(() => {
        txHashTimerTries.current++;
        if (txHashTimerTries.current <= 30) {
          sdk.txs.getBySafeTxHash(lastSafeTxHash).then((safeTx) => {
            if (safeTx?.txHash) {
              setLastTxHash(safeTx.txHash);
              clearTxHashTimer();
            }
          });
        } else {
          clearTxHashTimer();
        }
      }, 2000);
    }
    return () => {
      clearTxHashTimer();
    };
  }, [lastSafeTxHash, lastTxHash, sdk.txs]);

  return (
    <>
      {status && status !== Status.composing ? (
        <TransactionStatus status={status} setStatus={setStatus} txHash={lastTxHash} />
      ) : null}
      {app?.url ? (
        <SafeAppFrame
          appUrl={app.url}
          title={app.name}
          allowedFeaturesList=""
          iframeRef={iframeRef}
          onLoad={onIframeLoad}
          hidden={status !== Status.composing}
        />
      ) : null}
    </>
  );
}
