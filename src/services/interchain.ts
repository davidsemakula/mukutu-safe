import * as ethers from 'ethers';
import { ChainNameToDomainId, hyperlaneCoreAddresses } from '@hyperlane-xyz/sdk';
import { BaseTransaction } from '@gnosis.pm/safe-apps-sdk';

import { allChains, getChainInfoByName, SimpleChainInfo } from '../utils/chains';

export const getSupportedChains = (): Array<SimpleChainInfo> => {
  return allChains;
};

const getRouterAddress = (origin: string): string => {
  return hyperlaneCoreAddresses[origin]?.interchainAccountRouter;
};

export const getInterchainAccountAddress = async (
  origin: string,
  remote: string,
  originAddress: string,
): Promise<string> => {
  const remoteInfo = getChainInfoByName(remote);
  const originDomain = ChainNameToDomainId[origin];
  const accountRouterAddress = getRouterAddress(origin);

  if (remoteInfo?.rpcUrl) {
    const accountRouterContract = new ethers.Contract(
      accountRouterAddress,
      ['function getInterchainAccount(uint32 _originDomain, address _sender) external view returns (address)'],
      new ethers.providers.JsonRpcProvider(remoteInfo.rpcUrl as string),
    );
    try {
      const address = await accountRouterContract.getInterchainAccount(originDomain, originAddress);
      if (address) {
        return address;
      }
    } catch (e) {
      console.error('interchainAccountAddress:error:', e);
    }
  }
  return '';
};

export const translateTransactions = (
  origin: string,
  remote: string,
  txs: Array<BaseTransaction>,
): Array<BaseTransaction> => {
  const routerAddress = getRouterAddress(origin);
  const destinationDomain = ChainNameToDomainId[remote];

  const routerInterface = new ethers.utils.Interface([
    'function dispatch(uint32 _destinationDomain, tuple(address to, bytes data)[] calldata calls) external returns (bytes32)',
  ]);

  return [
    {
      to: routerAddress,
      value: '0',
      data: routerInterface.encodeFunctionData('dispatch', [
        destinationDomain,
        txs.map((tx) => ({
          to: tx.to,
          // TODO: @david value is not handled because Hyperlane InterchainAccounts don't handle value calls
          data: tx.data,
        })),
      ]),
    },
  ];
};
