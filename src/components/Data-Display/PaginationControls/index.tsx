import { FirstPage as FirstPageIcon, LastPage as LastPageIcon } from '@mui/icons-material'
import { InputLabel, MenuItem, Pagination, PaginationItem, Select } from '@mui/material'
import React from 'react'

import { PageSizeSelector, PaginationContainer } from './styled'
import { PaginationControlsProps } from './types'

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
              last: LastPageIcon,
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
  )
}
