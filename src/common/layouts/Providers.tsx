import { blue } from '@material-ui/core/colors';
import { createGenerateClassName, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';

import { JssProvider, SheetsRegistry } from 'react-jss';

const generateClassName = createGenerateClassName();

const theme = createMuiTheme({
  palette: {
    primary: blue,
    type: 'light'
  },
  typography: {
    useNextVariants: true
  }
});

export const styleSheets = new SheetsRegistry();

export const Providers: React.FunctionComponent<any> = ({ children }) => {
  return (
    <JssProvider {...generateClassName} registry={styleSheets}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </JssProvider>
  );
};
