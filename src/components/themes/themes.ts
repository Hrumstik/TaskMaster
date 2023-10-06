import { createTheme, PaletteOptions } from "@mui/material/styles";

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#2564CF",
    },
    secondary: {
      main: "#414141",
    },
    text: {
      primary: "#414141",
      secondary: "#2564CF",
      focused: "#080808",
      searchItem: "#ffffff",
    },
    icons: {
      primary: "#414141",
      secondary: "#2564CF",
      searchItem: "#ffffff",
    },
    background: {
      default: "#FFF",
      paper: "#FAF9F8",
      search: "#e0dada",
      search_hover: "#f5f5f5",
      searchItem: "#2564CF",
      searchItemActive: "#0732f2",
    },
  } as PaletteOptions,
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#800080",
    },
    secondary: {
      main: "#FFFFFF",
    },
    text: {
      primary: "#d0cae8",
      secondary: "#6d59ba",
      focused: "#f7f5f5",
      searchItem: "#ffffff",
    },
    icons: {
      primary: "#d0cae8",
      secondary: "#6d59ba",
    },
    background: {
      default: "#242130",
      paper: "#1d1b29",
      search: "#111212",
      search_hover: "#000000",
      searchItem: "#800080",
      searchItemActive: "#3f0e4f",
    },
  } as PaletteOptions,
});
