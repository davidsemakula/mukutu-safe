import React, { useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk';

import AppContext from '../context/AppContext';
import SafeAppCard from './SafeAppCard';
import { getChainInfoByName, getDisplayName } from '../utils/chains';
import { fairSortApps, filterAppsByChain } from '../utils/apps';
import { ChainSafeAppData, UnSupportedReason } from '../utils/types';
import { getUnsupportedMessage } from '../utils/helpers';

type AppGroup = {
  title: string;
  apps: Array<ChainSafeAppData>;
};

export default function Home(): React.ReactElement {
  const { remote, isSupported, unSupportedReason, apps } = useContext(AppContext);
  const remoteChainName = useMemo(() => getChainInfoByName(remote)?.label ?? getDisplayName(remote), [remote]);
  const appGroups = useMemo<Array<AppGroup>>(() => {
    const potentialApps = filterAppsByChain(apps, remote);
    const chainApps = potentialApps.filter((item) => !item.onlySupportsRelatedChains), // Apps for this chain
      relatedChainApps = potentialApps.filter((item) => item.onlySupportsRelatedChains); // Apps for related chains

    const appGroups: Array<AppGroup> = [
      {
        title: `Apps for ${remoteChainName}`,
        apps: fairSortApps(chainApps),
      },
    ];

    if (relatedChainApps.length) {
      appGroups.push({
        title: `Apps for related chains`,
        apps: fairSortApps(relatedChainApps),
      });
    }

    return appGroups;
  }, [remote, apps, remoteChainName]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" component="h2" mb={2}>
        Apps
      </Typography>

      {!isSupported ? (
        <Box mb={3}>
          <Alert severity="warning">
            <Typography variant="body2" component="div">
              {getUnsupportedMessage(unSupportedReason)}
            </Typography>
            {unSupportedReason === UnSupportedReason.mainnet ? (
              <Typography variant="body2" component="div" fontWeight={500}>
                Mainnet support is coming soon! Check back here {/* or follow Mukutu's social channels */}for updates!
              </Typography>
            ) : null}
          </Alert>
        </Box>
      ) : null}

      {appGroups.length ? (
        appGroups.map((chainGroup) => {
          const groupApps = chainGroup.apps ?? [];
          return (
            <Box mb={4}>
              <Typography variant="body1" component="h3" fontWeight={500} mb={1}>
                {chainGroup.title}
              </Typography>
              <Grid container spacing={2}>
                {groupApps.map((app: SafeAppData) => (
                  <Grid item key={`app-${app?.id}`} xs={12} sm={6} md={4} lg={3} xl={1.5}>
                    <SafeAppCard app={app as SafeAppData} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })
      ) : (
        <div>
          <Alert severity="info">
            Oops, There aren't any supported Safe apps for {remoteChainName} yet. Check back soon!
          </Alert>
        </div>
      )}
    </Box>
  );
}
