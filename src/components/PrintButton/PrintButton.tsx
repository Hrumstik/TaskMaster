import React, { useState } from "react";

import { Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function PrintButton() {
  const [showPrintFeature, setShowPrintFeature] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<
    null | (EventTarget & HTMLDivElement)
  >(null);

  const showPrintMenu = (event: React.MouseEvent<HTMLDivElement>): void => {
    setShowPrintFeature(true);
    setAnchorEl(event.currentTarget);
  };

  const printThePage = (): void => {
    setShowPrintFeature(false);
    window.print();
  };

  return (
    <>
      <Typography onClick={showPrintMenu} color="text.secondary">
        ...
      </Typography>
      <Menu
        anchorEl={anchorEl}
        open={showPrintFeature}
        onClose={() => setShowPrintFeature(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={printThePage}>Print list</MenuItem>
      </Menu>
    </>
  );
}
