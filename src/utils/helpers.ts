export const truncateAddress = (address: string | undefined): string => {
  return address && address.length > 10 ? [address.slice(0, 6), address.slice(-4)].join('...') : address || '';
};

export const trimTrailingSlash = (url: string): string => {
  return url.replace(/\/$/, '');
};

export const isSameUrl = (url1: string, url2: string): boolean => {
  return trimTrailingSlash(url1) === trimTrailingSlash(url2);
};
