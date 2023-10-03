import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme, darkTheme } from "../themes/themes";

interface CustomThemeProviderProps {
  children: ReactNode;
}
export default function CustomThemeProvider({
  children,
}: CustomThemeProviderProps) {
  const lightThemeState = useSelector(
    ({ features }) => features.showLightTheme
  );
  const theme = lightThemeState ? defaultTheme : darkTheme;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
