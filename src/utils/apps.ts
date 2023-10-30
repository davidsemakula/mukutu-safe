import _ from 'lodash';
import { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk';
import { ChainName, ChainSafeAppData, SimpleChainInfo } from './types';
import { allChains, getChainId, getChainInfoByName, getRelatedChains } from './chains';

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

function chainNamesToIds(names: string[]): string[] {
  return names
    .map((name) => {
      const id = getChainId(name);
      return id ? id.toString() : undefined;
    })
    .filter(Boolean) as string[];
}

export const unofficiallySupportedApps: Array<Partial<SafeAppData>> = [
  {
    id: 18,
    name: 'Aave v3',
    chainIds: chainNamesToIds([
      ChainName.goerli,
      ChainName.arbitrumgoerli,
      ChainName.optimismgoerli,
      ChainName.mumbai,
      ChainName.fuji,
    ]),
  },
  {
    id: 88,
    name: 'Revoke.cash',
    chainIds: chainNamesToIds([
      ChainName.goerli,
      ChainName.arbitrumgoerli,
      ChainName.optimismgoerli,
      ChainName.mumbai,
      ChainName.basegoerli,
      ChainName.fuji,
    ]),
  },
  {
    id: 141,
    name: 'Sablier V2',
    chainIds: chainNamesToIds([ChainName.goerli]),
  },
  {
    id: 48,
    name: 'Superfluid',
    chainIds: chainNamesToIds([
      ChainName.goerli,
      ChainName.arbitrumgoerli,
      ChainName.optimismgoerli,
      ChainName.mumbai,
      ChainName.basegoerli,
      ChainName.fuji,
    ]),
  },
  {
    id: 35,
    name: 'Sushi',
    chainIds: chainNamesToIds([ChainName.goerli, ChainName.mumbai]),
  },
  {
    id: 38,
    name: 'Uniswap',
    chainIds: chainNamesToIds([
      ChainName.goerli,
      ChainName.arbitrumgoerli,
      ChainName.optimismgoerli,
      ChainName.mumbai,
      ChainName.fuji,
    ]),
  },
];

export function filterAppsByChain(apps: Array<SafeAppData>, chain: string): Array<ChainSafeAppData> {
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
                _.uniq([...appChainIds, ...unofficialAppChainIds]),
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
}

export function fairSortApps(apps: Array<SafeAppData>): Array<ChainSafeAppData> {
  return _.sortBy(apps, [apps.length > 10 ? 'id' : 'name'], ['asc']);
}
