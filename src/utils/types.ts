import { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk';

export enum ChainName {
  // Mainnet
  arbitrum = 'arbitrum',
  aurora = 'aurora',
  avalanche = 'avalanche',
  bsc = 'bsc',
  celo = 'celo',
  ethereum = 'ethereum',
  evmos = 'evmos',
  fantom = 'fantom',
  harmony = 'harmony',
  optimism = 'optimism',
  moonbeam = 'moonbeam',
  polygon = 'polygon',

  // Testnet
  alfajores = 'alfajores',
  arbitrumgoerli = 'arbitrumgoerli',
  auroratestnet = 'auroratestnet',
  bsctestnet = 'bsctestnet',
  evmostestnet = 'evmostestnet',
  fantomtestnet = 'fantomtestnet',
  fuji = 'fuji',
  goerli = 'goerli',
  harmonytestnet = 'harmonytestnet',
  moonbasealpha = 'moonbasealpha',
  mumbai = 'mumbai',
  optimismgoerli = 'optimismgoerli',
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
