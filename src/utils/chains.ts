import { ChainInfo } from '@gnosis.pm/safe-apps-sdk';
import _ from 'lodash';

import { ChainName, ChainType, SimpleChainInfo } from './types';

export const allChains: Array<SimpleChainInfo> = [
  // Mainnet
  {
    name: ChainName.arbitrum,
    id: 42161,
    label: 'Arbitrum',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorerUrl: 'https://arbiscan.io',
    symbol: 'AETH',
    shortName: 'arb1',
    currency: 'AETH',
    type: ChainType.MAINNET,
    relatedTo: [ChainName.arbitrumgoerli],
  },
  {
    name: ChainName.aurora,
    id: 1313161554,
    label: 'Aurora',
    rpcUrl: 'https://mainnet.aurora.dev',
    blockExplorerUrl: 'https://aurorascan.dev/',
    symbol: 'Aurora ETH',
    shortName: 'aurora',
    currency: 'Aurora ETH',
    type: ChainType.MAINNET,
    relatedTo: [ChainName.auroratestnet],
  },
  {
    name: ChainName.avalanche,
    id: 43114,
    label: 'Avalanche',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorerUrl: 'https://snowtrace.io',
    symbol: 'AVAX',
    shortName: 'avax',
    currency: 'Avalanche',
    type: ChainType.MAINNET,
    relatedTo: [ChainName.fuji],
  },
  {
    name: ChainName.bsc,
    id: 56,
    label: 'BNB Chain',
    rpcUrl: 'https://rpc.ankr.com/bsc',
    blockExplorerUrl: 'https://bscscan.com',
    symbol: 'BNB',
    shortName: 'bnb',
    currency: 'BNB',
    type: ChainType.MAINNET,
    relatedTo: [ChainName.bsctestnet],
  },
  {
    name: ChainName.celo,
    id: 42220,
    label: 'Celo',
    rpcUrl: 'https://forno.celo.org',
    blockExplorerUrl: 'https://celoscan.io',
    symbol: 'CELO',
    type: ChainType.MAINNET,
    relatedTo: [ChainName.alfajores],
  },
  {
    name: ChainName.ethereum,
    id: 1,
    label: 'Ethereum',
    rpcUrl: 'https://cloudflare-eth.com',
    blockExplorerUrl: 'https://etherscan.io',
    symbol: 'ETH',
    shortName: 'eth',
    currency: 'Ether',
    type: ChainType.MAINNET,
    relatedTo: [ChainName.goerli],
  },
  {
    name: ChainName.evmos,
    id: 9001,
    label: 'Evmos',
    rpcUrl: 'https://eth.bd.evmos.org:8545',
    blockExplorerUrl: 'https://escan.live',
    symbol: 'EVMOS',
    shortName: 'evmos',
    currency: 'EVMOS',
    type: ChainType.MAINNET,
    relatedTo: [ChainName.evmostestnet],
  },
  {
    name: ChainName.fantom,
    id: 250,
    label: 'Fantom',
    rpcUrl: 'https://rpc.ftm.tools/',
    blockExplorerUrl: 'https://ftmscan.com',
    symbol: 'FTM',
    shortName: 'fantom',
    currency: 'FTM',
    type: ChainType.MAINNET,
    relatedTo: [ChainName.fantomtestnet],
  },
  {
    name: ChainName.harmony,
    id: 1666600000,
    label: 'Harmony',
    rpcUrl: 'https://api.harmony.one',
    blockExplorerUrl: 'https://explorer.harmony.one',
    symbol: 'ONE',
    shortName: 'hmy',
    currency: 'ONE',
    type: ChainType.MAINNET,
    relatedTo: [ChainName.harmonytestnet],
  },
  {
    name: ChainName.optimism,
    id: 10,
    label: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io',
    blockExplorerUrl: 'https://optimistic.etherscan.io',
    symbol: 'OP',
    shortName: 'oeth',
    type: ChainType.MAINNET,
    relatedTo: [ChainName.optimismgoerli],
  },
  {
    name: ChainName.moonbeam,
    id: 1284,
    label: 'Moonbeam',
    rpcUrl: 'https://rpc.api.moonbeam.network',
    blockExplorerUrl: 'https://moonscan.io/',
    symbol: 'GLMR',
    shortName: 'mbeam',
    type: ChainType.MAINNET,
    relatedTo: [ChainName.moonbasealpha],
  },
  {
    name: ChainName.polygon,
    id: 137,
    label: 'Polygon',
    rpcUrl: 'https://rpc-mainnet.matic.quiknode.pro',
    blockExplorerUrl: 'https://polygonscan.com',
    symbol: 'MATIC',
    shortName: 'matic',
    currency: 'Matic',
    type: ChainType.MAINNET,
    relatedTo: [ChainName.mumbai],
  },

  // Testnet
  {
    name: ChainName.alfajores,
    id: 44787,
    label: 'Celo Alfajores Testnet',
    rpcUrl: 'https://alfajores-forno.celo-testnet.org',
    blockExplorerUrl: 'https://alfajores.celoscan.io',
    symbol: 'CELO',
    type: ChainType.TESTNET,
    relatedTo: [ChainName.celo],
  },
  {
    name: ChainName.arbitrumgoerli,
    id: 421613,
    label: 'Arbitrum Goerli Testnet',
    rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
    blockExplorerUrl: 'https://goerli.arbiscan.io',
    symbol: 'AETH',
    type: ChainType.TESTNET,
    relatedTo: [ChainName.arbitrum],
  },
  {
    name: ChainName.auroratestnet,
    id: 1313161555,
    label: 'Aurora Testnet',
    rpcUrl: 'https://testnet.aurora.dev',
    blockExplorerUrl: 'https://testnet.aurorascan.dev/',
    symbol: 'Aurora ETH',
    shortName: 'aurora',
    currency: 'ETH',
    type: ChainType.TESTNET,
    relatedTo: [ChainName.aurora],
  },
  {
    name: ChainName.bsctestnet,
    id: 97,
    label: 'BNB Testnet',
    rpcUrl: 'https://data-seed-prebsc-1-s3.binance.org:8545',
    blockExplorerUrl: 'https://testnet.bscscan.com',
    symbol: 'BNB',
    shortName: 'bnb',
    currency: 'BNB',
    type: ChainType.TESTNET,
    relatedTo: [ChainName.bsc],
  },
  {
    name: ChainName.evmostestnet,
    id: 9000,
    label: 'Evmos Testnet',
    rpcUrl: 'https://eth.bd.evmos.dev:8545',
    blockExplorerUrl: 'https://evm.evmos.dev',
    symbol: 'tEVMOS',
    shortName: 'evmos-testnet',
    currency: 'tEVMOS',
    type: ChainType.TESTNET,
    relatedTo: [ChainName.evmos],
  },
  {
    name: ChainName.fantomtestnet,
    id: 4002,
    label: 'Fantom Opera Testnet',
    rpcUrl: 'https://rpc.ankr.com/fantom_testnet/',
    blockExplorerUrl: 'https://testnet.ftmscan.com/',
    symbol: 'FTM',
    shortName: 'fantom',
    currency: 'FTM',
    type: ChainType.TESTNET,
    relatedTo: [ChainName.fantom],
  },
  {
    name: ChainName.fuji,
    id: 43113,
    label: 'Avalanche Fuji (C-Chain)',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    blockExplorerUrl: 'https://testnet.snowtrace.io',
    symbol: 'AVAX',
    shortName: 'avax',
    currency: 'Avalanche',
    type: ChainType.TESTNET,
    relatedTo: [ChainName.avalanche],
  },
  {
    name: ChainName.goerli,
    id: 5,
    label: 'Goerli Testnet',
    rpcUrl: 'https://rpc.ankr.com/eth_goerli',
    blockExplorerUrl: 'https://goerli.etherscan.io/',
    symbol: 'ETH',
    shortName: 'gor',
    currency: 'Görli Ether',
    type: ChainType.TESTNET,
    relatedTo: [ChainName.ethereum],
  },
  {
    name: ChainName.harmonytestnet,
    id: 1666700000,
    label: 'Harmony Testnet',
    rpcUrl: 'https://api.s0.b.hmny.io',
    blockExplorerUrl: 'https://explorer.pops.one',
    symbol: 'ONE',
    shortName: 'hmyt',
    currency: 'ONE',
    type: ChainType.TESTNET,
    relatedTo: [ChainName.harmony],
  },
  {
    name: ChainName.moonbasealpha,
    id: 1287,
    label: 'Moonbase Alpha',
    rpcUrl: 'https://rpc.api.moonbase.moonbeam.network',
    blockExplorerUrl: 'https://moonbase.moonscan.io/',
    symbol: 'DEV',
    shortName: 'mbase',
    type: ChainType.TESTNET,
    relatedTo: [ChainName.moonbeam],
  },
  {
    name: ChainName.mumbai,
    id: 80001,
    label: 'Polygon Mumbai',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
    symbol: 'MATIC',
    shortName: 'matic',
    currency: 'Matic',
    type: ChainType.TESTNET,
    relatedTo: [ChainName.polygon],
  },
  {
    name: ChainName.optimismgoerli,
    id: 420,
    label: 'Optimism Goerli',
    rpcUrl: 'https://goerli.optimism.io',
    blockExplorerUrl: 'https://goerli-optimism.etherscan.io/',
    symbol: 'OP',
    type: ChainType.TESTNET,
    relatedTo: [ChainName.optimism],
  },
];

export function getChainInfoById(chainId: string | number): SimpleChainInfo | undefined {
  return allChains.find((chain) => (chainId || '').toString() === (chain.id || '').toString());
}

export function getChainInfoByName(chainName: string): SimpleChainInfo | undefined {
  return allChains.find((chain) => (chainName || '').toString() === (chain.name || '').toString());
}

export function parseSafeChainInfo(chain: SimpleChainInfo): ChainInfo {
  const blockExplorerUrl = `${chain.blockExplorerUrl}${/\/$/.test(chain.blockExplorerUrl) ? '' : '/'}`;
  return {
    chainName: getDisplayName(chain.name),
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
}

export function getDisplayName(name: string): string {
  return name ? _.capitalize(name) : '';
}

export function getRelatedChains(name: string): Array<SimpleChainInfo> {
  return allChains.filter(
    (chain) =>
      name &&
      chain.name !== name &&
      chain.relatedTo &&
      Array.isArray(chain.relatedTo) &&
      chain.relatedTo.includes(name),
  );
}

export function isMainnet(name: string): boolean {
  return getChainInfoByName(name)?.type === ChainType.MAINNET;
}
