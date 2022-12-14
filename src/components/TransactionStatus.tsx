import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CancelIcon from '@mui/icons-material/Cancel';
import LaunchIcon from '@mui/icons-material/Launch';

import AppContext from '../context/AppContext';
import { getInterchainExplorerUrl } from '../services/interchain';

export enum Status {
  composing = 'composing',
  initiating = 'initiating',
  canceled = 'canceled',
  completed = 'completed',
  failed = 'failed',
  unsupported = 'unsupported',
}

export type TransactionStatusProps = {
  status: Status;
  setStatus: (status: Status) => void;
  txHash?: string;
};

export default function TransactionStatus({
  status,
  setStatus,
  txHash,
}: TransactionStatusProps): React.ReactElement | null {
  const { origin, remote, setApp } = useContext(AppContext);

  let message = '',
    info: string | React.ReactElement | null = null,
    icon = null,
    positiveFn = null,
    positiveMsg = '',
    negativeFn = null,
    negativeMsg = '';

  const goHome = () => {
    setApp();
  };

  const tryAgain = () => {
    setStatus(Status.composing);
  };

  switch (status) {
    case Status.initiating: {
      message = 'Submitting transaction ...';
      icon = <CircularProgress />;
      break;
    }
    case Status.canceled: {
      message = 'The transaction was cancelled.';
      icon = <CancelIcon color="error" fontSize="large" />;
      positiveFn = tryAgain;
      positiveMsg = 'Try again';
      negativeFn = goHome;
      negativeMsg = 'Cancel';
      break;
    }
    case Status.completed: {
      message = 'Transaction submitted successfully!';
      icon = <CheckCircleIcon color="success" fontSize="large" />;
      positiveFn = goHome;
      positiveMsg = 'New transaction';

      if (txHash) {
        const explorerUrl = getInterchainExplorerUrl(origin, remote, txHash);
        if (explorerUrl) {
          info = (
            <Box>
              <Link href={explorerUrl} target="_blank">
                View in Explorer <LaunchIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
              </Link>
            </Box>
          );
        } else {
          info = (
            <Typography variant="body1" component="div">
              Origin Transaction Hash: {txHash}
            </Typography>
          );
        }
      }
      break;
    }
    case Status.failed: {
      message = 'Transaction submission failed.';
      icon = <ErrorIcon color="error" fontSize="large" />;
      positiveFn = tryAgain;
      positiveMsg = 'Try again';
      negativeFn = goHome;
      negativeMsg = 'Cancel';
      break;
    }
    case Status.unsupported: {
      message = "This type of transaction isn't supported yet.";
      info = (
        <Typography align="center">
          Transactions that require transfer of native tokens from remote Interchain Accounts are not yet supported.
          <br />
          Try transactions that use{' '}
          <Link href="https://ethereum.org/en/developers/docs/standards/tokens/erc-20/" target="">
            non-native tokens (e.g ERC20 tokens)
          </Link>{' '}
          or{' '}
          <Link href="https://academy.binance.com/en/articles/what-are-wrapped-tokens" target="_blank">
            wrapped native tokens
          </Link>{' '}
          .
        </Typography>
      );
      icon = <CancelIcon color="error" fontSize="large" />;
      positiveFn = tryAgain;
      positiveMsg = 'Try again';
      negativeFn = goHome;
      negativeMsg = 'Cancel';
      break;
    }
    default: {
      break;
    }
  }

  if (!message) {
    // i.e Status.composing
    return null;
  }

  return (
    <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {icon}
      <Typography variant="h5" component="div" sx={{ mt: 1, mb: info ? 1 : 2 }}>
        {message}
      </Typography>
      {info ? <Box sx={{ mb: 3 }}>{info}</Box> : null}
      <Stack spacing={2} direction="row">
        {positiveFn ? (
          <Button variant="contained" onClick={positiveFn}>
            {positiveMsg || 'Continue'}
          </Button>
        ) : null}
        {negativeFn ? (
          <Button variant="outlined" onClick={negativeFn}>
            {negativeMsg || 'Cancel'}
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
}
