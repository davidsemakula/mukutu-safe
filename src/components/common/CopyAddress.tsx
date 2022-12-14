import React, { useEffect, useState, useRef } from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { getChainDisplayName } from '../../utils/chains';
import { truncateAddress } from '../../utils/helpers';

const StyledChip = styled(Chip)(({ theme }) => ({
  color: 'inherit',
  paddingRight: '0.3rem',
  backgroundColor: alpha(theme.palette.primary.contrastText, 0.15),
  cursor: 'pointer',
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

type CopyAddressProps = {
  address: string;
  chain: string;
};

export default function CopyAddress({ address, chain }: CopyAddressProps): React.ReactElement {
  const [copied, setCopied] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const handleCopy = () => {
    setCopied(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleDummyDelete = () => {};

  useEffect(() => {
    const clearTimer = (id?: NodeJS.Timeout) => {
      id && clearTimeout(id);
    };
    if (copied) {
      clearTimer(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
    return () => {
      clearTimer(timerRef.current);
    };
  }, [copied]);

  return (
    <Box>
      <Tooltip open={copied} title="Copied" placement="bottom" arrow>
        <div>
          <CopyToClipboard text={address} onCopy={handleCopy}>
            <div style={{ position: 'relative' }}>
              <StyledChip
                variant="outlined"
                label={`${getChainDisplayName(chain)}: ${truncateAddress(address)}`}
                onDelete={handleDummyDelete}
                deleteIcon={<ContentCopyIcon color="inherit" fontSize="small" />}
              />
              <div
                style={{
                  position: 'absolute',
                  width: 20,
                  height: 20,
                  top: 5,
                  right: 10,
                  backgroundColor: 'transparent',
                  opacity: 0,
                  cursor: 'pointer',
                }}
              />
            </div>
          </CopyToClipboard>
        </div>
      </Tooltip>
    </Box>
  );
}
