import { Components } from "@mui/material";

import { borderRadius, shadows } from '../variables';

export const muiCard: Components["MuiCard"] = {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.md,
      boxShadow: shadows.sm,
      overflow: 'hidden',
    }
  }
};