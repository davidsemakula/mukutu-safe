import React from 'react';
import ReactDOM from 'react-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { css } from '@emotion/react';

import App from './components/App';

const inputGlobalStyles = (
  <GlobalStyles
    styles={css`
      html {
        height: 100%;
        font-family: Averta, Roboto, 'Helvetica Neue', Arial, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Fira Sans',
          'Droid Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      body {
        height: 100%;
        margin: 0;
        padding: 0;
      }

      #root {
        height: 100%;
      }
    `}
  />
);

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    {inputGlobalStyles}
    <SafeProvider
      loader={
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      }
    >
      <App />
    </SafeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
