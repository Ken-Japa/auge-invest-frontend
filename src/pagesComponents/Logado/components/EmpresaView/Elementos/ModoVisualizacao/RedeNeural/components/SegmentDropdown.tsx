import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface SegmentDropdownProps {
  segmentsByIndustry: {
    industryId: string;
    industryLabel: string;
    segments: { id: string; label: string; }[];
  }[];
  onSelectSegment: (segmentId: string) => void;
  selectedSegmentId: string | null;
}

export const SegmentDropdown: React.FC<SegmentDropdownProps> = ({
  segmentsByIndustry,
  onSelectSegment,
  selectedSegmentId,
}) => {


  return (
    <Box sx={{ minWidth: 200, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="segment-select-label">Segmentos:</InputLabel>
        <Select
          labelId="segment-select-label"
          value={selectedSegmentId || ''}
          label="Selecionar Segmento"
          onChange={(e) => {
            console.log('SegmentDropdown onChange:', e.target.value);
            onSelectSegment(e.target.value as string);
          }}
        >
          <MenuItem value="">Todos</MenuItem>
          {segmentsByIndustry.map((industryGroup) => (
            industryGroup.segments.map((segment) => (
              <MenuItem key={segment.id} value={segment.id}>
                {segment.label}
              </MenuItem>
            ))
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};