import { BaseTransaction } from '@gnosis.pm/safe-apps-sdk';

export const getInterchainAccountAddress = async (
  origin: string,
  remote: string,
  originAddress: string,
): Promise<string> => {
  return originAddress;
};

export const translateTransactions = (origin: string, remote: string, txs: Array<BaseTransaction>): Array<BaseTransaction> => {
  return txs;
};
