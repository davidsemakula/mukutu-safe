import _ from 'lodash';
import { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk';
import { ChainSafeAppData } from './types';
import { allChains, getChainInfoByName, getRelatedChains, SimpleChainInfo } from './chains';

export const chainAgnosticApps: Array<Partial<SafeAppData>> = [
  {
    id: 29,
    name: 'Transaction Builder',
  },
  {
    id: 111,
    name: 'WalletConnect',
  },
];

export const safeSpecificApps: Array<Partial<SafeAppData>> = [
  {
    id: 49,
    name: 'Zodiac',
  },
  {
    id: 72,
    name: 'Zodiac Exit App',
  },
  {
    id: 95,
    name: '$SAFE Claiming App',
  },
];

enum chainIds {
  fuji = '43113',
  goerli = '5',
  moonbeam = '1284',
  moonriver = '1285',
  moonbasealpha = '1287',
  mumbai = '80001',
}

export const unofficiallySupportedApps: Array<Partial<SafeAppData>> = [
  // https://moonbeam.network/blog/voting-snapshot/
  {
    id: 61,
    name: 'Snapshot',
    chainIds: [chainIds.moonbeam, chainIds.moonriver, chainIds.moonbasealpha],
  },
  // https://moonbeam.network/community/projects/sushiswap/
  {
    id: 35,
    name: 'Sushi',
    chainIds: [chainIds.moonbeam, chainIds.moonriver],
  },
  {
    id: 88,
    name: 'Revoke.cash',
    chainIds: [chainIds.moonbeam, chainIds.moonriver, chainIds.moonbasealpha],
  },

  /// Listed by not working
  // https://moonbeam.network/community/projects/curve-finance/
  // implements domain whitelist
  {
    id: 20,
    name: 'Curve',
    chainIds: [chainIds.moonbeam],
  },
  // https://moonbeam.network/community/projects/balancer/
  // not clear if supports Moonbeam
  {
    id: 93,
    name: 'Balancer',
    chainIds: [chainIds.moonbeam],
  },
  // https://moonbeam.network/community/projects/insurace/
  // not clear if supports Moonbeam
  {
    id: 56,
    name: 'InsurAce',
    chainIds: [chainIds.moonbeam],
  },
  {
    id: 48,
    name: 'Superfluid',
    chainIds: [chainIds.fuji, chainIds.goerli, chainIds.mumbai],
  },
];

export const filterAppsByChain = (apps: Array<SafeAppData>, chain: string): Array<ChainSafeAppData> => {
  const chainId = getChainInfoByName(chain)?.id.toString();
  const relatedChainIds = getRelatedChains(chain)
    .map((chain) => chain.id?.toString())
    .filter(Boolean) as Array<string>;
  return apps
    .map((app, idx) => {
      // Check domain support
      const isSupportedDomain =
        app.accessControl.type === 'NO_RESTRICTIONS' ||
        (app.accessControl.type === 'DOMAIN_ALLOWLIST' &&
          Array.isArray(app.accessControl.value) &&
          app.accessControl.value.includes(window.location.origin));

      if (isSupportedDomain) {
        // Always include chain-agnostic apps
        const isChainAgnosticApp =
          chainAgnosticApps.filter((item) => item.id === app.id || item.name === app.name).length > 0;
        if (isChainAgnosticApp) {
          return app;
        } else {
          // Exclude Safe-specific apps (e.g. Zodiac and Safe governance apps)
          const isSafeSpecificApp =
            safeSpecificApps.filter((item) => item.id === app.id || item.name === app.name).length > 0;
          if (!isSafeSpecificApp) {
            // Check chain support
            const appChainIds =
              app.chainIds && Array.isArray(app.chainIds) ? app.chainIds.map((i) => i.toString()) : [];
            const isChainSupported = chainId && appChainIds.includes(chainId),
              isRelatedChainSupported = _.intersection(relatedChainIds, appChainIds).length > 0;

            const unofficialApp = unofficiallySupportedApps.find(
              (item) => (item.id === app.id || item.name === app.name) && item.chainIds,
            );
            const unofficialAppChainIds =
              unofficialApp && unofficialApp.chainIds && Array.isArray(unofficialApp.chainIds)
                ? unofficialApp.chainIds.map((i) => i.toString())
                : [];
            const isChainUnofficiallySupported = chainId && unofficialAppChainIds.includes(chainId),
              isRelatedChainUnofficiallySupported = _.intersection(relatedChainIds, unofficialAppChainIds).length > 0;

            if (
              isChainSupported ||
              isRelatedChainSupported ||
              isChainUnofficiallySupported ||
              isRelatedChainUnofficiallySupported
            ) {
              const supportedRelatedChainsIds = _.intersection(
                relatedChainIds,
                _.uniq([...appChainIds, ...unofficialAppChainIds].map((i) => i.toString())),
              );
              let supportedRelatedChains: Array<SimpleChainInfo> = [];
              if (supportedRelatedChainsIds.length) {
                supportedRelatedChains = allChains.filter((item) =>
                  supportedRelatedChainsIds.includes(item.id.toString()),
                );
              }
              return {
                ...app,
                onlySupportsRelatedChains: !isChainSupported && !isChainUnofficiallySupported,
                supportedRelatedChains: supportedRelatedChains,
                index: idx,
              } as ChainSafeAppData;
            }
          }
        }
      }
      return null;
    })
    .filter(Boolean) as Array<SafeAppData>;
};
