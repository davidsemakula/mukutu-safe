import React, { useContext, useEffect, useMemo, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import AppContext from '../context/AppContext';
import LogoIcon from '../icons/Logo';
import CopyAddress from './common/CopyAddress';
import { getChainInfoByName, getDisplayName } from '../utils/chains';
import { getSupportedChains } from '../services/interchain';

const StyledSelect = styled(Select)(({ theme }) => ({
  color: 'inherit',
  '& .MuiSelect-icon': {
    color: 'inherit',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    backgroundColor: alpha(theme.palette.primary.contrastText, 0.15),
    borderColor: alpha(theme.palette.primary.contrastText, 0.2),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.contrastText, 0.25),
    },
  },
}));

const StyledInputLabel = styled(InputLabel)({
  color: 'inherit',
  '&.Mui-focused': {
    color: 'inherit',
  },
});

export default function Header(): React.ReactElement {
  const { origin, originAddress, remote, remoteAddress, isSupported, app, setRemote, setApp } = useContext(AppContext);
  const [originType, originShortName] = useMemo(() => {
    const chain = getChainInfoByName(origin);
    return [chain?.type, chain?.shortName];
  }, [origin]);
  const remoteShortName = useMemo(() => getChainInfoByName(remote)?.shortName, [remote]);
  const selectableChains = useMemo(
    () => getSupportedChains().filter((chain) => chain.name !== origin && chain.type === originType),
    [origin, originType],
  );
  const [clipboard, setClipboard] = useState('');

  const goHome = () => {
    setApp();
  };

  const handleRemoteChange = (event: SelectChangeEvent<unknown>) => {
    setRemote(event.target.value as string);
  };

  useEffect(() => {
    if (clipboard) {
      setTimeout(() => {
        setClipboard('');
      }, 1000);
    }
  }, [clipboard]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <LogoIcon sx={{ mr: 1 }} />
          <Typography
            variant="body1"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, mr: 2, ':hover': { cursor: 'pointer' } }}
            onClick={goHome}
          >
            Mukutu Router
          </Typography>
          <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}
          <Box role="presentation">
            <Breadcrumbs aria-label="breadcrumb" color="inherit">
              <Typography
                color="inherit"
                sx={{ ':hover': { textDecoration: 'underline', cursor: 'pointer' } }}
                onClick={goHome}
              >
                Apps
              </Typography>
              {app ? (
                <Typography color="inherit" sx={{ opacity: 0.5 }}>
                  {app?.name || 'App'}
                </Typography>
              ) : null}
            </Breadcrumbs>
          </Box>
          <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}
          {isSupported ? (
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="top" sx={{ mr: 2 }}>
              <CopyAddress address={originAddress} prefix={originShortName ? originShortName : origin} />
              <Box alignSelf="center" sx={{ ml: 1, mr: 1 }}>
                <KeyboardDoubleArrowRightIcon />
              </Box>
              <CopyAddress address={remoteAddress} prefix={remoteShortName ? remoteShortName : remote} />
            </Box>
          ) : null}
          <FormControl sx={{ minWidth: 120 }} size="small">
            <StyledInputLabel id="remote-select">Remote</StyledInputLabel>
            <StyledSelect
              labelId="remote-select"
              id="remote-select"
              value={remote}
              label="Remote"
              onChange={handleRemoteChange}
            >
              {selectableChains.map((chain) => (
                <MenuItem key={`chain-${chain.name}`} value={chain.name}>
                  {chain.label ?? getDisplayName(chain.name)}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Spacer */}
    </Box>
  );
}
