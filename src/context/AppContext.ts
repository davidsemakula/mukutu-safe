import React from 'react';
import { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk';
import { UnSupportedReason } from '../utils/types';

export type AppContextType = {
  // Data
  origin: string;
  originAddress: string;
  remote: string;
  remoteAddress: string;
  isSupported: boolean;
  unSupportedReason?: UnSupportedReason;
  app: SafeAppData | undefined;
  apps: Array<SafeAppData>;
  isAppLoading: boolean;

  // Actions
  setApp: (app?: SafeAppData) => void;
  setRemote: (remote: string) => void;
  setIsAppLoading: (loading: boolean) => void;
};

const AppContext = React.createContext<AppContextType>({
  // Data
  origin: '',
  originAddress: '',
  remote: '',
  remoteAddress: '',
  isSupported: false,
  unSupportedReason: undefined,
  app: undefined,
  apps: [],
  isAppLoading: false,

  // Actions
  /* eslint-disable @typescript-eslint/no-empty-function */
  setRemote: () => {},
  setApp: () => {},
  setIsAppLoading: () => {},
  /* eslint-enable @typescript-eslint/no-empty-function */
});

export default AppContext;
