import React, { useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import _ from 'lodash';
import { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk';

import AppContext from '../context/AppContext';
import SafeAppCard from './SafeAppCard';
import { filterAppsByChainAndName } from '../utils/helpers';
import { getChainDisplayName, getChainInfoByName, getRelatedChains } from '../utils/chains';

export default function Home(): React.ReactElement {
  const { remote, apps } = useContext(AppContext);
  const remoteChain = useMemo(() => getChainInfoByName(remote), [remote]);
  const relatedChains = useMemo(() => getRelatedChains(remote), [remote]);
  const filteredApps = useMemo(
    () =>
      _.orderBy(
        filterAppsByChainAndName(
          apps,
          [remoteChain?.id, ...relatedChains.map((chain) => chain.id)].filter(Boolean) as Array<number>,
          ['WalletConnect', 'Zodiac'],
          ['Transaction Builder'],
        ), // Prioritize more useful apps
        [
          (o) => {
            const idx = ['Transaction Builder', 'Superfluid'].indexOf(o.name);
            return idx > -1 ? idx : 1000;
          },
          'name',
        ],
        ['asc', 'asc'],
      ),
    [remoteChain?.id, apps, relatedChains],
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Apps
      </Typography>
      {filteredApps.length ? (
        <Grid container spacing={2}>
          {filteredApps.map((app: SafeAppData) => (
            <Grid key={`app-${app?.id}`} xs={12} sm={6} md={4} lg={3} xl={2}>
              <SafeAppCard app={app as SafeAppData} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>
          <Alert severity="info">
            Oops, There aren't any supported Safe apps for {getChainDisplayName(remote)} yet. Check back soon!
          </Alert>
        </div>
      )}
    </Box>
  );
}
