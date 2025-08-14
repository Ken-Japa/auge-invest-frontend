import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const WalletSectionContainer = styled(Box)({});

export const WalletSectionHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const LoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
});

export const NoWalletsMessage = styled(Box)({
  textAlign: "center",
});
