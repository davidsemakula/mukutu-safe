import * as ethers from 'ethers';
import _ from 'lodash';
import { ChainNameToDomainId, hyperlaneCoreAddresses } from '@hyperlane-xyz/sdk';
import { BaseTransaction } from '@gnosis.pm/safe-apps-sdk';

import { allChains, getChainInfoByName } from '../utils/chains';
import { ChainName, ChainType, SimpleChainInfo } from '../utils/types';

const SUPPORTED_CHAINS: Array<string> = [
  // Mainnet
  ChainName.ethereum,
  ChainName.polygon,
  // Alphabetical order for the rest
  ChainName.arbitrum,
  ChainName.avalanche,
  ChainName.bsc,
  ChainName.celo,
  ChainName.evmos,
  //ChainName.harmony,
  ChainName.moonbeam,
  ChainName.optimism,

  // Testnet
  ChainName.goerli,
  ChainName.mumbai,
  // Alphabetical order for the rest
  ChainName.alfajores,
  ChainName.arbitrumgoerli,
  ChainName.bsctestnet,
  ChainName.evmostestnet,
  ChainName.fuji,
  //ChainName.harmonytestnet,
  ChainName.moonbasealpha,
  ChainName.optimismgoerli,
];

export function isSupportedChain(name: string): boolean {
  return SUPPORTED_CHAINS.includes(name);
}

export function getSupportedChains(): Array<SimpleChainInfo> {
  return _.orderBy(
    allChains.filter((chain) => SUPPORTED_CHAINS.includes(chain.name)),
    [(item) => SUPPORTED_CHAINS.indexOf(item.name)],
    ['asc'],
  );
}

export function getDefaultRemoteChain(origin?: string): string {
  if (origin) {
    const originType = getChainInfoByName(origin)?.type;
    if (originType === ChainType.TESTNET) {
      return origin !== ChainName.goerli ? ChainName.goerli : ChainName.mumbai;
    }
    return origin !== ChainName.ethereum ? ChainName.ethereum : ChainName.polygon;
  }
  return '';
}

function getRouterAddress(origin: string): string {
  return hyperlaneCoreAddresses[origin]?.interchainAccountRouter;
}

export async function getInterchainAccountAddress(
  origin: string,
  remote: string,
  originAddress: string,
): Promise<string> {
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
}

export function isTransactionSupported(tx: BaseTransaction): boolean {
  return ['0', 0, null, undefined].includes(tx.value);
}

export function isTransactionBatchSupported(txs: Array<BaseTransaction>): boolean {
  return txs.filter((tx) => !isTransactionSupported(tx)).length === 0;
}

export function translateTransactions(
  origin: string,
  remote: string,
  txs: Array<BaseTransaction>,
): Array<BaseTransaction> {
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
          // TODO: value is not handled because Hyperlane Interchain Accounts can't handle value calls
          data: tx.data,
        })),
      ]),
    },
  ];
}

export function getOriginExplorerUrl(origin: string, txHash: string) {
  const chain = getChainInfoByName(origin);
  if (chain?.blockExplorerUrl) {
    return `${chain.blockExplorerUrl}${/\/$/.test(chain.blockExplorerUrl) ? '' : '/'}tx/${txHash}`;
  }
  return '';
}

export function getInterchainExplorerUrl(origin: string, remote: string, txHash: string) {
  return txHash ? `https://explorer.hyperlane.xyz/?search=${txHash}` || getOriginExplorerUrl(origin, txHash) : '';
}
