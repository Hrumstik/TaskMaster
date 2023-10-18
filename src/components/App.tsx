import React, { ReactNode } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";

import { defaultTheme, darkTheme } from "./themes/themes";

interface CustomThemeProviderProps {
  children: ReactNode;
}

export default function App({ children }: CustomThemeProviderProps) {
  const lightThemeState = useSelector(
    ({ features }) => features.showLightTheme
  );
  const theme = lightThemeState ? defaultTheme : darkTheme;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
