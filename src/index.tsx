import React from 'react';
import ReactDOM from 'react-dom';
import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import App from './components/App';
import AppLoader from './components/AppLoader';
import { inputGlobalStyles, theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    {inputGlobalStyles}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SafeProvider loader={<AppLoader />}>
        <App />
      </SafeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
