import React, { useContext, useEffect, useMemo, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import AppContext from '../context/AppContext';
import LogoIcon from '../icons/Logo';
import { truncateAddress } from '../utils/helpers';
import { getChainDisplayName, getChainInfoByName } from '../utils/chains';
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

const StyledChip = styled(Chip)(({ theme }) => ({
  color: 'inherit',
  paddingRight: '0.3rem',
  backgroundColor: alpha(theme.palette.primary.contrastText, 0.15),
  ':hover': {
    color: 'inherit',
    backgroundColor: `${alpha(theme.palette.primary.contrastText, 0.25)} !important`,
  },
  '& .MuiChip-deleteIcon': {
    fontSize: '1rem',
    color: 'inherit',
    ':hover': {
      color: 'inherit',
    },
  },
}));

export default function Header() {
  const { origin, originAddress, remote, remoteAddress, app, setRemote, setApp } = useContext(AppContext);
  const originType = useMemo(() => getChainInfoByName(origin)?.type, [origin]);
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

  const handleCopy = (text: string) => {
    setClipboard(text);
  };

  const handleDummyDelete = () => {
    // do nothing
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
            Safe Hyperlane Router
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
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="top" sx={{ mr: 2 }}>
            <Box>
              <Tooltip open={!!(clipboard && clipboard === originAddress)} title="Copied" placement="bottom" arrow>
                <div>
                  <CopyToClipboard text={originAddress || ''} onCopy={() => handleCopy(originAddress || '')}>
                    <StyledChip
                      variant="outlined"
                      label={`${getChainDisplayName(origin)}: ${truncateAddress(originAddress)}`}
                      onDelete={handleDummyDelete}
                      deleteIcon={<ContentCopyIcon color="inherit" fontSize="small" />}
                    />
                  </CopyToClipboard>
                </div>
              </Tooltip>
            </Box>
            <Box alignSelf="center" sx={{ ml: 1, mr: 1 }}>
              <KeyboardDoubleArrowRightIcon />
            </Box>
            <Box>
              <Tooltip open={!!(clipboard && clipboard === remoteAddress)} title="Copied" placement="bottom" arrow>
                <div>
                  <CopyToClipboard text={remoteAddress || ''} onCopy={() => handleCopy(remoteAddress || '')}>
                    <StyledChip
                      variant="outlined"
                      label={`${getChainDisplayName(remote)}: ${truncateAddress(remoteAddress)}`}
                      onDelete={handleDummyDelete}
                      deleteIcon={<ContentCopyIcon color="inherit" fontSize="small" />}
                    />
                  </CopyToClipboard>
                </div>
              </Tooltip>
            </Box>
          </Box>
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
                  {chain.name}
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
