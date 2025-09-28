import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Collapse, FormControl, IconButton,InputLabel, ListSubheader, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

interface SegmentDropdownProps {
  segmentsByIndustry: {
    industryId: string;
    industryLabel: string;
    color: string;
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
  const [openIndustries, setOpenIndustries] = useState<string[]>([]);

  const handleToggleIndustry = (industryId: string) => {
    setOpenIndustries(prev =>
      prev.includes(industryId) ? prev.filter(id => id !== industryId) : [...prev, industryId]
    );
  };


  return (
    <Box sx={{ minWidth: 200, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="segment-select-label">Segmentos:</InputLabel>
        <Select
          labelId="segment-select-label"
          value={selectedSegmentId || ''}
          label="Selecionar Segmento"
          onChange={(e) => {
            onSelectSegment(e.target.value as string);
          }}
        >
          <MenuItem value="">Todos</MenuItem>
          {segmentsByIndustry.map((industryGroup) => [
            <ListSubheader key={industryGroup.industryId} sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>

              <IconButton
                size="small"
                onClick={() => handleToggleIndustry(industryGroup.industryId)}
                sx={{ mr: 1 }}
              >
                {openIndustries.includes(industryGroup.industryId) ? <ExpandMoreIcon /> : <ChevronRightIcon />}
              </IconButton>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: industryGroup.color, mr: 1 }} />
              {industryGroup.industryLabel}
            </ListSubheader>,
            ...(openIndustries.includes(industryGroup.industryId) ?
              industryGroup.segments.map((segment) => (
                <MenuItem key={segment.id} value={segment.id} sx={{ pl: 4 }}>
                  {segment.label}
                </MenuItem>
              ))
              : []),
          ])}
        </Select>
      </FormControl>
    </Box>
  );
};