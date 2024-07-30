import { blue } from "@mui/material/colors";
import {
  experimental_extendTheme as extendTheme,
  PaletteColorOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    gradientColor?: PaletteColorOptions;
  }
}

export const gray = {
  50: "#FBFCFE",
  100: "#EAF0F5",
  200: "#D6E2EB",
  300: "#BFCCD9",
  400: "#94A6B8",
  500: "#5B6B7C",
  600: "#4C5967",
  700: "#364049",
  800: "#131B20",
  900: "#090E10",
};
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: blue[500],
        },
        text: {
          primary: gray[800],
          secondary: gray[600],
        },
        gradientColor: {
          main: "#CEE5FD",
        },
        background: {
          default: "#fff",
          paper: "#fff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: blue[800],
        },
        text: {
          primary: "#fff",
          secondary: gray[400],
        },
        gradientColor: {
          main: "#08295c",
        },
        background: {
          default: "#000",
          paper: "#000",
        },
      },
    },
  },
  typography: {
    fontFamily: "sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    body2: {
      fontFamily: "sans-serif",
      fontSize: 15,
      fontWeight: 500,
      lineHeight: 1.43,
      letterSpacing: "0.00938em",
    },
    body1: {
      fontFamily: "sans-serif",
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.63,
      letterSpacing: "0.00938em",
    },
    caption: {
      fontFamily: "sans-serif",
      fontSize: 15,
      fontWeight: 400,
      lineHeight: 1.63,
      letterSpacing: "1.5px",
    },
  },
});
export default theme;
