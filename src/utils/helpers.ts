import { UnSupportedReason } from './types';

export function truncateAddress(address: string | undefined): string {
  return address && address.length > 10 ? [address.slice(0, 6), address.slice(-4)].join('...') : address || '';
}

export function trimTrailingSlash(url: string): string {
  return url.replace(/\/$/, '');
}

export function isSameUrl(url1: string, url2: string): boolean {
  return trimTrailingSlash(url1) === trimTrailingSlash(url2);
}

export function getUnsupportedMessage(reason?: UnSupportedReason): string {
  const prefix = 'Mukutu Router is currently';
  switch (reason) {
    case UnSupportedReason.mainnet: {
      return `${prefix} only available on testnets.`;
    }
    case UnSupportedReason.origin: {
      return `${prefix} not available on the origin chain.`;
    }
    case UnSupportedReason.remote: {
      return `${prefix} not available on the remote chain.`;
    }
    case UnSupportedReason.origin_and_remote: {
      return `${prefix} not available on both the origin and remote chains.`;
    }
    default: {
      return `${prefix} not available on one of the selected chains.`;
    }
  }
}
