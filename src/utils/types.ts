import { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk';

export enum ChainName {
  // Testnet
  alfajores = 'alfajores',
  arbitrumgoerli = 'arbitrumgoerli',
  auroratestnet = 'auroratestnet',
  bsctestnet = 'bsctestnet',
  fantomtestnet = 'fantomtestnet',
  fuji = 'fuji',
  goerli = 'goerli',
  moonbasealpha = 'moonbasealpha',
  mumbai = 'mumbai',
  optimismgoerli = 'optimismgoerli',

  // Mainnet
  arbitrum = 'arbitrum',
  aurora = 'aurora',
  avalanche = 'avalanche',
  bsc = 'bsc',
  celo = 'celo',
  ethereum = 'ethereum',
  fantom = 'fantom',
  optimism = 'optimism',
  moonbeam = 'moonbeam',
  polygon = 'polygon',
}

export enum ChainType {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

export type SimpleChainInfo = {
  name: ChainName;
  id: number;
  label: string;
  rpcUrl: string;
  blockExplorerUrl: string;
  symbol: string;
  shortName?: string;
  currency?: string;
  decimals?: number;
  type: ChainType;
  relatedTo?: Array<string>;
};

export interface ChainSafeAppData extends SafeAppData {
  onlySupportsRelatedChains?: boolean;
  supportedRelatedChains?: Array<SimpleChainInfo>;
  index?: number;
}

export enum UnSupportedReason {
  mainnet = 'mainnet',
  origin = 'origin',
  remote = 'remote',
  origin_and_remote = 'origin_and_remote',
}
