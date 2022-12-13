import React from 'react';
import { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk';

export type AppContextType = {
  // Data
  origin: string;
  originAddress: string;
  remote: string;
  remoteAddress: string;
  app: SafeAppData | undefined;
  apps: Array<SafeAppData>;
  isAppLoading: boolean;

  // Actions
  setApp: (app?: SafeAppData) => void;
  setRemote: (remote: string) => void;
  setIsAppLoading: (loading: boolean) => void;
};

const AppContext = React.createContext({
  // Data
  origin: '',
  originAddress: '',
  remote: '',
  remoteAddress: '',
  app: undefined,
  apps: [],
  isAppLoading: false,

  // Actions
  /* eslint-disable @typescript-eslint/no-empty-function */
  setRemote: () => {},
  setApp: () => {},
  setIsAppLoading: () => {},
  /* eslint-enable @typescript-eslint/no-empty-function */
} as AppContextType);

export default AppContext;
