import { BaseTransaction } from '@gnosis.pm/safe-apps-sdk';

import { allChains, SimpleChainInfo } from '../utils/chains';

export const getSupportedChains = (): Array<SimpleChainInfo> => {
  return allChains;
};

export const getInterchainAccountAddress = async (
  origin: string,
  remote: string,
  originAddress: string,
): Promise<string> => {
  return originAddress;
};

export const translateTransactions = (
  origin: string,
  remote: string,
  txs: Array<BaseTransaction>,
): Array<BaseTransaction> => {
  return txs;
};
