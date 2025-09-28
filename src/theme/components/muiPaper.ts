import { Components } from "@mui/material";

import { borderRadius, shadows } from '../variables';

export const muiPaper: Components["MuiPaper"] = {
  styleOverrides: {
    root: {
      backgroundImage: 'none',
      borderRadius: borderRadius.md,
      boxShadow: shadows.sm,
    }
  }
};