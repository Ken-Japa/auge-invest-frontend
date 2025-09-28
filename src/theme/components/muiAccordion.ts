import { Components } from "@mui/material";

import { borderRadius, shadows, spacing,transitions } from '../variables';

export const muiAccordion: Components["MuiAccordion"] = {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.sm,
      boxShadow: 'none',
      border: '1px solid',
      borderColor: 'divider',
      '&:before': {
        display: 'none',
      },
      '&.Mui-expanded': {
        margin: 0,
        marginBottom: spacing.lg,
      },
      marginBottom: spacing.md,
      overflow: 'hidden',
      transition: transitions.medium,
    }
  }
};

export const muiAccordionSummary: Components["MuiAccordionSummary"] = {
  styleOverrides: {
    root: {
      padding: `${spacing.sm} ${spacing.md}`,
      '& .MuiAccordionSummary-content': {
        margin: `${spacing.sm} 0`,
      },
    }
  }
};

export const muiAccordionDetails: Components["MuiAccordionDetails"] = {
  styleOverrides: {
    root: {
      padding: spacing.md,
      borderTop: '1px solid',
      borderColor: 'divider',
    }
  }
};