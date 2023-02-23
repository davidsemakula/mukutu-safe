import React from 'react';
import ReactDOM from 'react-dom';
import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { css } from '@emotion/react';

import App from './components/App';
import AppLoader from './components/AppLoader';

const inputGlobalStyles = (
  <GlobalStyles
    styles={css`
      html {
        height: 100%;
        font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Fira Sans',
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
    <SafeProvider loader={<AppLoader />}>
      <App />
    </SafeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
