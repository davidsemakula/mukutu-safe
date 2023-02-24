import React from 'react';
import { createTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { css } from '@emotion/react';

export const inputGlobalStyles = (
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

export const theme = createTheme({
  palette: {
    mode: 'light',
    // Colors from https://tailwindcss.com/docs/customizing-colors
    primary: {
      main: '#4f46e5', // Indigo 600
    },
    secondary: {
      main: '#5b21b6', // Violet 800
    },
  },
});
