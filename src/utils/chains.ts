import { ChainInfo } from '@gnosis.pm/safe-apps-sdk';
import _ from 'lodash';

export enum ChainNames {
  // Testnet
  alfajores = 'alfajores',
  arbitrumgoerli = 'arbitrumgoerli',
  bsctestnet = 'bsctestnet',
  fuji = 'fuji',
  goerli = 'goerli',
  moonbasealpha = 'moonbasealpha',
  mumbai = 'mumbai',
  optimismgoerli = 'optimismgoerli',

  // Mainnet
  arbitrum = 'arbitrum',
  avalanche = 'avalanche',
  bsc = 'bsc',
  celo = 'celo',
  ethereum = 'ethereum',
  optimism = 'optimism',
  moonbeam = 'moonbeam',
  polygon = 'polygon',
}

export enum ChainType {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

export type SimpleChainInfo = {
  name: string;
  id: number;
  rpcUrl: string;
  blockExplorerUrl: string;
  symbol: string;
  shortName?: string;
  currency?: string;
  decimals?: number;
  type: ChainType;
  relatedTo?: Array<string>;
};

export const allChains: Array<SimpleChainInfo> = [
  // Testnet
  {
    name: ChainNames.alfajores,
    id: 44787,
    rpcUrl: 'https://alfajores-forno.celo-testnet.org',
    blockExplorerUrl: 'https://alfajores.celoscan.io',
    symbol: 'CELO',
    type: ChainType.TESTNET,
    relatedTo: [ChainNames.celo],
  },
  {
    name: ChainNames.arbitrumgoerli,
    id: 421613,
    rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
    blockExplorerUrl: 'https://goerli.arbiscan.io',
    symbol: 'AETH',
    type: ChainType.TESTNET,
    relatedTo: [ChainNames.arbitrum],
  },
  {
    name: ChainNames.bsctestnet,
    id: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s3.binance.org:8545',
    blockExplorerUrl: 'https://testnet.bscscan.com',
    symbol: 'BNB',
    shortName: 'bnb',
    currency: 'BNB',
    type: ChainType.TESTNET,
    relatedTo: [ChainNames.bsc],
  },
  {
    name: ChainNames.fuji,
    id: 43113,
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    blockExplorerUrl: 'https://testnet.snowtrace.io',
    symbol: 'AVAX',
    shortName: 'avax',
    currency: 'Avalanche',
    type: ChainType.TESTNET,
    relatedTo: [ChainNames.avalanche],
  },
  {
    name: ChainNames.goerli,
    id: 5,
    rpcUrl: 'https://rpc.ankr.com/eth_goerli',
    blockExplorerUrl: 'https://goerli.etherscan.io/',
    symbol: 'ETH',
    shortName: 'gor',
    currency: 'Görli Ether',
    type: ChainType.TESTNET,
    relatedTo: [ChainNames.ethereum],
  },
  {
    name: ChainNames.moonbasealpha,
    id: 1287,
    rpcUrl: 'https://rpc.api.moonbase.moonbeam.network',
    blockExplorerUrl: 'https://moonbase.moonscan.io/',
    symbol: 'DEV',
    shortName: 'mbase',
    type: ChainType.TESTNET,
    relatedTo: [ChainNames.moonbeam],
  },
  {
    name: ChainNames.mumbai,
    id: 80001,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
    symbol: 'MATIC',
    shortName: 'matic',
    currency: 'Matic',
    type: ChainType.TESTNET,
    relatedTo: [ChainNames.polygon],
  },
  {
    name: ChainNames.optimismgoerli,
    id: 420,
    rpcUrl: 'https://goerli.optimism.io',
    blockExplorerUrl: 'https://goerli-optimism.etherscan.io/',
    symbol: 'OP',
    type: ChainType.TESTNET,
    relatedTo: [ChainNames.optimism],
  },

  // Mainnet
  {
    name: ChainNames.arbitrum,
    id: 42161,
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorerUrl: 'https://arbiscan.io',
    symbol: 'AETH',
    shortName: 'arb1',
    currency: 'AETH',
    type: ChainType.MAINNET,
    relatedTo: [ChainNames.arbitrumgoerli],
  },
  {
    name: ChainNames.avalanche,
    id: 43114,
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorerUrl: 'https://snowtrace.io',
    symbol: 'AVAX',
    shortName: 'avax',
    currency: 'Avalanche',
    type: ChainType.MAINNET,
    relatedTo: [ChainNames.fuji],
  },
  {
    name: ChainNames.bsc,
    id: 56,
    rpcUrl: 'https://rpc.ankr.com/bsc',
    blockExplorerUrl: 'https://bscscan.com',
    symbol: 'BNB',
    shortName: 'bnb',
    currency: 'BNB',
    type: ChainType.MAINNET,
    relatedTo: [ChainNames.bsctestnet],
  },
  {
    name: ChainNames.celo,
    id: 42220,
    rpcUrl: 'https://forno.celo.org',
    blockExplorerUrl: 'https://celoscan.io',
    symbol: 'CELO',
    type: ChainType.MAINNET,
    relatedTo: [ChainNames.alfajores],
  },
  {
    name: ChainNames.ethereum,
    id: 1,
    rpcUrl: 'https://cloudflare-eth.com',
    blockExplorerUrl: 'https://etherscan.io',
    symbol: 'ETH',
    shortName: 'eth',
    currency: 'Ether',
    type: ChainType.MAINNET,
    relatedTo: [ChainNames.goerli],
  },
  {
    name: ChainNames.optimism,
    id: 10,
    rpcUrl: 'https://mainnet.optimism.io',
    blockExplorerUrl: 'https://optimistic.etherscan.io',
    symbol: 'OP',
    shortName: 'oeth',
    type: ChainType.MAINNET,
    relatedTo: [ChainNames.optimismgoerli],
  },
  {
    name: ChainNames.moonbeam,
    id: 1284,
    rpcUrl: 'https://rpc.api.moonbeam.network',
    blockExplorerUrl: 'https://moonscan.io/',
    symbol: 'GLMR',
    shortName: 'mbeam',
    type: ChainType.MAINNET,
    relatedTo: [ChainNames.moonbasealpha],
  },
  {
    name: ChainNames.polygon,
    id: 137,
    rpcUrl: 'https://rpc-mainnet.matic.quiknode.pro',
    blockExplorerUrl: 'https://polygonscan.com',
    symbol: 'MATIC',
    shortName: 'matic',
    currency: 'Matic',
    type: ChainType.MAINNET,
    relatedTo: [ChainNames.mumbai],
  },
];

export const getChainInfoById = (chainId: string | number): SimpleChainInfo | undefined => {
  return allChains.find((chain) => (chainId || '').toString() === (chain.id || '').toString());
};

export const getChainInfoByName = (chainName: string): SimpleChainInfo | undefined => {
  return allChains.find((chain) => (chainName || '').toString() === (chain.name || '').toString());
};

export const getDefaultRemoteChain = (origin?: string): string => {
  if (origin) {
    const originType = getChainInfoByName(origin)?.type;
    if (originType === ChainType.TESTNET) {
      return origin !== ChainNames.goerli ? ChainNames.goerli : ChainNames.fuji;
    }
    return origin !== ChainNames.ethereum ? ChainNames.ethereum : ChainNames.avalanche;
  }
  return '';
};

export const parseSafeChainInfo = (chain: SimpleChainInfo): ChainInfo => {
  const blockExplorerUrl = `${chain.blockExplorerUrl}${/\/$/.test(chain.blockExplorerUrl) ? '' : '/'}`;
  return {
    chainName: getChainDisplayName(chain.name),
    chainId: (chain.id || '').toString(),
    shortName: chain.shortName || chain.name.slice(0, 3),
    nativeCurrency: {
      name: chain.currency || chain.symbol,
      symbol: chain.symbol,
      decimals: chain.decimals || 18,
      logoUri: `https://safe-transaction-assets.safe.global/chains/${chain.id}/currency_logo.png`,
    },
    blockExplorerUriTemplate: {
      address: `${blockExplorerUrl}address/{{address}}`,
      txHash: `${blockExplorerUrl}tx/{{txHash}}`,
      api: `${blockExplorerUrl}api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}`,
    },
  };
};

export const getChainDisplayName = (name: string): string => {
  return name ? _.capitalize(name) : '';
};

export const getRelatedChains = (name: string): Array<SimpleChainInfo> => {
  return allChains.filter(
    (chain) =>
      name &&
      chain.name !== name &&
      chain.relatedTo &&
      Array.isArray(chain.relatedTo) &&
      chain.relatedTo.includes(name),
  );
};
