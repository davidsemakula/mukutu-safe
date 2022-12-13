import { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk';
import _ from 'lodash';

export const truncateAddress = (address: string | undefined): string => {
  return address && address.length > 10 ? [address.slice(0, 6), address.slice(-4)].join('...') : address || '';
};

export const filterAppsByChainAndName = (
  apps: Array<SafeAppData>,
  chainIds: Array<number>,
  excluded: Array<string>,
  alwaysIncluded: Array<string>,
): Array<SafeAppData> => {
  return apps.filter(
    (app) =>
      alwaysIncluded.includes(app.name) ||
      (chainIds &&
        app.chainIds &&
        Array.isArray(app.chainIds) &&
        _.intersection(
          chainIds.map((i) => i.toString()),
          app.chainIds,
        ).length > 0 &&
        !excluded.includes(app.name)),
  );
};

export const trimTrailingSlash = (url: string): string => {
  return url.replace(/\/$/, '');
};

export const isSameUrl = (url1: string, url2: string): boolean => {
  return trimTrailingSlash(url1) === trimTrailingSlash(url2);
};
