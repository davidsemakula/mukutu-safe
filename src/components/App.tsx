import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import AppContext from '../context/AppContext';
import Header from './Header';
import Home from './Home';
import SafeApp from './SafeApp';
import { getChainInfoById, SimpleChainInfo } from '../utils/chains';
import { getDefaultRemoteChain, getInterchainAccountAddress } from '../services/interchain';

export default function App(): React.ReactElement {
  const { connected, safe } = useSafeAppsSDK();
  const originInfo: SimpleChainInfo | undefined = useMemo(() => getChainInfoById(safe.chainId), [safe.chainId]);
  const origin = originInfo?.name ?? '';
  const originAddress = safe?.safeAddress ?? '';

  const [remote, setRemote] = useState<string>(getDefaultRemoteChain(origin));
  const [remoteAddress, setRemoteAddress] = useState<string>('');

  const [app, setApp] = useState<SafeAppData | undefined>();
  const [apps, setApps] = useState<Array<SafeAppData>>([]);
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    axios
      .get(`https://safe-config.safe.global/api/v1/safe-apps/`)
      .then((res) => {
        if (res?.data && Array.isArray(res?.data)) {
          setApps(res.data as Array<SafeAppData>);
        }
      })
      .catch(() => {
        //
      });
  }, []);

  useEffect(() => {
    getInterchainAccountAddress(origin, remote, originAddress as string).then((address) => {
      setRemoteAddress(address);
    });
  }, [origin, remote, originAddress]);

  useEffect(() => {
    if (!app && isAppLoading) {
      setIsAppLoading(false);
    }
  }, [app, isAppLoading]);

  useEffect(() => {
    if (remote && app) {
      // Hack to trigger an app reload when remote chain changes
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 100);
    }
  }, [remote, app]);

  return (
    <AppContext.Provider
      value={{
        // Data
        origin,
        originAddress,
        remote,
        remoteAddress,
        app,
        apps,
        isAppLoading,

        // Actions
        setRemote,
        setApp,
        setIsAppLoading,
      }}
    >
      <Stack justifyContent="top" alignItems="none" minHeight="100%">
        <Box flexGrow={0}>
          <Header />
        </Box>
        {!connected || isAppLoading || isRefreshing ? (
          <Box flexGrow={0}>
            <LinearProgress />
          </Box>
        ) : null}
        {!isRefreshing ? ( // Hack to trigger an app reload when remote chain changes
          <Stack flexGrow={1} justifyContent="top" alignItems="none" sx={{ bgcolor: '#eef2ff' }}>
            {app ? <SafeApp /> : <Home />}
          </Stack>
        ) : null}
      </Stack>
    </AppContext.Provider>
  );
}
