import React from "react";

import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../../reducers/featuresSlice";

export default function ThemeButton() {
  const litghtThemeState: boolean = useSelector(
    ({ features }) => features.showLightTheme
  );

  const dispatch = useDispatch();

  return (
    <IconButton onClick={() => dispatch(toggleTheme())}>
      {litghtThemeState ? (
        <ModeNightIcon
          sx={{
            fontSize: 40,
            color: "icons.secondary",
          }}
        />
      ) : (
        <LightModeIcon
          sx={{
            fontSize: 40,
            color: "icons.secondary",
          }}
        />
      )}
    </IconButton>
  );
}
