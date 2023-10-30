import { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk';

export enum ChainName {
  // Mainnet
  arbitrum = 'arbitrum',
  aurora = 'aurora',
  avalanche = 'avalanche',
  base = 'base',
  bsc = 'bsc',
  celo = 'celo',
  ethereum = 'ethereum',
  fantom = 'fantom',
  gnosis = 'gnosis',
  optimism = 'optimism',
  polygon = 'polygon',
  polygon_zkevm = 'polygon_zkevm',
  zksync_era = 'zksync_era',

  // Testnet
  alfajores = 'alfajores',
  arbitrumgoerli = 'arbitrumgoerli',
  auroratestnet = 'auroratestnet',
  basegoerli = 'basegoerli',
  bsctestnet = 'bsctestnet',
  fantomtestnet = 'fantomtestnet',
  fuji = 'fuji',
  goerli = 'goerli',
  mumbai = 'mumbai',
  optimismgoerli = 'optimismgoerli',
  sepolia = 'sepolia',
  basesepolia = 'basesepolia',
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
