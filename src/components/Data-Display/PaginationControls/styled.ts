import { FormControl, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PaginationContainer = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(3),
  paddingBottom: theme.spacing(2),
}));

export const PageSizeSelector = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
  },
}));
