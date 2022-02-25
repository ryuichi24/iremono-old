import 'styled-components';
import { Theme } from '@mui/material/styles';
import { TypeBackground, CommonColors } from '@mui/material/styles/createPalette';

// https://medium.com/@abdurakhimov.sardor/how-to-use-and-customize-material-ui-version-5-with-styled-components-295e62562e61

interface CustomTheme {
  shadows: string[];
}

declare module '@mui/material/styles' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

declare module '@mui/material/styles/createPalette' {
  export interface TypeBackground {
    primary: string;
    secondary: string;
  }

  export interface CommonColors {
    grey: string;
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
