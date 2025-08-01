import { SelectChangeEvent } from "@mui/material";

export interface PaginationControlsProps {
  page: number;
  totalPages: number;
  pageSize: number;
  validPageSizes: number[];
  handlePageChange: (_: React.ChangeEvent<unknown>, newPage: number) => void;
  handlePageSizeChange: (event: SelectChangeEvent<number>) => void;
}
