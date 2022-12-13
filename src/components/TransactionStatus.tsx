import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CancelIcon from '@mui/icons-material/Cancel';

import AppContext from '../context/AppContext';

export enum Status {
  composing = 'composing',
  initiating = 'initiating',
  canceled = 'canceled',
  completed = 'completed',
  failed = 'failed',
}

export type TransactionStatusProps = {
  status: Status;
  setStatus: (status: Status) => void;
};

export default function TransactionStatus({ status, setStatus }: TransactionStatusProps): React.ReactElement | null {
  const { setApp } = useContext(AppContext);

  let message = '',
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
      <Typography variant="h5" component="div" sx={{ mt: 1, mb: 2 }}>
        {message}
      </Typography>
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
