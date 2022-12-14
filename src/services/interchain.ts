import { BaseTransaction } from '@gnosis.pm/safe-apps-sdk';

import { allChains, ChainName, ChainType, getChainInfoByName, SimpleChainInfo } from '../utils/chains';

export const getSupportedChains = (): Array<SimpleChainInfo> => {
  return allChains;
};

export const getDefaultRemoteChain = (origin?: string): string => {
  if (origin) {
    const originType = getChainInfoByName(origin)?.type;
    if (originType === ChainType.TESTNET) {
      return origin !== ChainName.goerli ? ChainName.goerli : ChainName.mumbai;
    }
    return origin !== ChainName.ethereum ? ChainName.ethereum : ChainName.polygon;
  }
  return '';
};

export const getInterchainAccountAddress = async (
  origin: string,
  remote: string,
  originAddress: string,
): Promise<string> => {
  return originAddress;
};

export const isTransactionSupported = (tx: BaseTransaction): boolean => {
  return ['0', 0, null, undefined].includes(tx.value);
};

export const isTransactionBatchSupported = (txs: Array<BaseTransaction>): boolean => {
  return txs.filter((tx) => !isTransactionSupported(tx)).length === 0;
};

export const translateTransactions = (
  origin: string,
  remote: string,
  txs: Array<BaseTransaction>,
): Array<BaseTransaction> => {
  return txs;
};

export const getOriginExplorerUrl = (origin: string, txHash: string) => {
  const chain = getChainInfoByName(origin);
  if (chain?.blockExplorerUrl) {
    return `${chain.blockExplorerUrl}${/\/$/.test(chain.blockExplorerUrl) ? '' : '/'}tx/${txHash}`;
  }
  return '';
};

export const getInterchainExplorerUrl = (origin: string, remote: string, txHash: string) => {
  return txHash ? getOriginExplorerUrl(origin, txHash) : '';
};
