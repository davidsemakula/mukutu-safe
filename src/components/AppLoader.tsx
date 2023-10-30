import React, { HTMLInputTypeAttribute, useMemo, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { getSupportedChains } from '../services/interchain';
import { getChainInfoByName, getDisplayName } from '../utils/chains';
import useIsMobile from '../hooks/useIsMobile';
import { ChainName, ChainType, SimpleChainInfo } from '../utils/types';

export default function AppLoader() {
  const isTopWindow = window.self === window.top;
  const isMobile = useIsMobile();
  // TODO: Switch to a mainnet as the default when ready for release
  const [origin, setOrigin] = useState<ChainName>(ChainName.goerli);
  const selectableChains: Array<SimpleChainInfo | string> = useMemo(() => {
    const supportedChains = getSupportedChains();
    const mainnetChains = supportedChains.filter((chain) => chain.type === ChainType.MAINNET);
    const testnetChains = supportedChains.filter((chain) => ChainName.goerli === chain.name);
    return ['Mainnets', ...mainnetChains, 'Testnets', ...testnetChains];
  }, []);

  const handleOriginChange = (event: SelectChangeEvent<HTMLInputTypeAttribute>) => {
    setOrigin(event.target.value as ChainName);
  };

  const originShortName = useMemo(() => {
    const chain = getChainInfoByName(origin);
    return chain?.shortName;
  }, [origin]);

  return (
    <Stack minHeight="100%">
      {!isTopWindow ? <LinearProgress /> : null}
      {isTopWindow ? (
        <Stack flexGrow={1} justifyContent="center" alignItems="center" sx={{ bgcolor: '#eef2ff' }}>
          <Container>
            <Paper sx={{ p: { xs: 2, sm: 4 } }}>
              <Typography variant={isMobile ? 'h5' : 'h4'} mb={1}>
                Welcome to Mukutu Router
              </Typography>
              <Typography mb={3}>
                The easiest way to manage assets and interact with smart contracts and dapps on multiple chains from one{' '}
                <a href="https://app.safe.global/">Safe</a> account.
              </Typography>

              <FormControl sx={{ minWidth: 120, mb: 2 }} size="small">
                <InputLabel id="origin-select">Origin Chain</InputLabel>
                <Select
                  labelId="origin-select"
                  id="origin-select"
                  value={origin}
                  label="Origin Chain"
                  onChange={handleOriginChange}
                >
                  {selectableChains.map((chain, idx) =>
                    typeof chain === 'string' ? (
                      <ListSubheader key={`subheader-${idx}-${chain}`} disableSticky={true}>
                        {chain}
                      </ListSubheader>
                    ) : (
                      <MenuItem key={`chain-${idx}-${chain.name}`} value={chain.name}>
                        {chain.label ?? getDisplayName(chain.name)}
                      </MenuItem>
                    ),
                  )}
                </Select>
              </FormControl>

              <Box>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  href={`https://app.safe.global/share/safe-app?appUrl=${encodeURIComponent(
                    window.location.hostname === 'localhost' ? window.location.origin : 'https://safe.mukutu.tech',
                  )}&chain=${originShortName}`}
                  disabled={!origin || !originShortName}
                >
                  Go to Safe
                </Button>
              </Box>
            </Paper>
          </Container>
        </Stack>
      ) : null}
    </Stack>
  );
}
