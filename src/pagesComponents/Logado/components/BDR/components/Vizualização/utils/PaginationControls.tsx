import React from 'react';
import {
    Pagination,
    PaginationItem,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    FormControl,
    Stack
} from '@mui/material';
import {
    FirstPage as FirstPageIcon,
    LastPage as LastPageIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

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

interface PaginationControlsProps {
    page: number;
    totalPages: number;
    pageSize: number;
    validPageSizes: number[];
    handlePageChange: (_: React.ChangeEvent<unknown>, newPage: number) => void;
    handlePageSizeChange: (event: SelectChangeEvent<number>) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
    page,
    totalPages,
    pageSize,
    validPageSizes,
    handlePageChange,
    handlePageSizeChange,
}) => {
    return (
        <PaginationContainer
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
            justifyContent="center"
        >
            <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handlePageChange}
                color="primary"
                renderItem={(item) => (
                    <PaginationItem
                        slots={{
                            first: FirstPageIcon,
                            last: LastPageIcon
                        }}
                        {...item}
                    />
                )}
                showFirstButton
                showLastButton
            />

            <PageSizeSelector variant="outlined" size="small">
                <InputLabel id="page-size-select-label">Por página</InputLabel>
                <Select
                    labelId="page-size-select-label"
                    id="page-size-select"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    label="Por página"
                    displayEmpty={false}
                    renderValue={(value) => `${value}`}
                >
                    {validPageSizes.map((size) => (
                        <MenuItem key={size} value={size}>
                            {size}
                        </MenuItem>
                    ))}
                </Select>
            </PageSizeSelector>
        </PaginationContainer>
    );
};