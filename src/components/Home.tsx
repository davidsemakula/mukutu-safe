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
import { ChainSafeAppData } from '../utils/types';

type AppGroup = {
  title: string;
  apps: Array<ChainSafeAppData>;
};

export default function Home(): React.ReactElement {
  const { remote, apps } = useContext(AppContext);
  const remoteChainName = useMemo(() => getChainInfoByName(remote)?.label ?? getDisplayName(remote), [remote]);
  const chainGroups = useMemo<Array<AppGroup>>(() => {
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
      {chainGroups.length ? (
        chainGroups.map((chainGroup) => {
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
