import React, { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme, darkTheme } from "./themes/themes";
import Login from "./pages/Login";

interface CustomThemeProviderProps {
  children: ReactNode;
}

export default function App({ children }: CustomThemeProviderProps) {
  const lightThemeState = useSelector(
    ({ features }) => features.showLightTheme
  );
  const theme = lightThemeState ? defaultTheme : darkTheme;

  const [token, setToken] = useState<{}>();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
