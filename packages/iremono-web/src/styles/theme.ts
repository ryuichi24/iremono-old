import { createTheme } from '@mui/material/styles';

export const getTheme = (currentMode: 'dark' | 'light' = 'light') =>
  createTheme({
    palette: {
      mode: currentMode,
      ...(currentMode === 'light'
        ? {
            background: {
              default: '#F9FAFC',
              paper: '#FFFFFF',
              primary: '#f3f4f9',
              secondary: '#FFFFFF',
            },
            primary: {
              main: '#0061d5',
            },
            secondary: {
              main: '#50d4a4',
            },
            common: {
              grey: '#94a4c4',
            },
            text: {
              secondary: '#525151',
            },
          }
        : {
            background: {
              default: '#F9FAFC',
              paper: '#FFFFFF',
              primary: '#1e2732',
              secondary: '#222b36',
            },
            primary: {
              main: '#0061d5',
            },
            secondary: {
              main: '#50d4a4',
            },
            common: {
              grey: '#7b808a',
            },
            text: {
              secondary: '#bfbfbf',
            },
          }),
    },
    shape: {
      borderRadius: '5px',
    },
    shadows: [
      'none',
      '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
      '0px 1px 2px rgba(100, 116, 139, 0.12)',
      '0px 1px 4px rgba(100, 116, 139, 0.12)',
      '0px 1px 5px rgba(100, 116, 139, 0.12)',
      '0px 1px 6px rgba(100, 116, 139, 0.12)',
      '0px 2px 6px rgba(100, 116, 139, 0.12)',
      '0px 3px 6px rgba(100, 116, 139, 0.12)',
      '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
      '0px 5px 12px rgba(100, 116, 139, 0.12)',
      '0px 5px 14px rgba(100, 116, 139, 0.12)',
      '0px 5px 15px rgba(100, 116, 139, 0.12)',
      '0px 6px 15px rgba(100, 116, 139, 0.12)',
      '0px 7px 15px rgba(100, 116, 139, 0.12)',
      '0px 8px 15px rgba(100, 116, 139, 0.12)',
      '0px 9px 15px rgba(100, 116, 139, 0.12)',
      '0px 10px 15px rgba(100, 116, 139, 0.12)',
      '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
      '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
      '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
      '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
      '0px 25px 50px rgba(100, 116, 139, 0.25)',
      '0px 25px 50px rgba(100, 116, 139, 0.25)',
      '0px 25px 50px rgba(100, 116, 139, 0.25)',
      '0px 25px 50px rgba(100, 116, 139, 0.25)',
    ],
  });
