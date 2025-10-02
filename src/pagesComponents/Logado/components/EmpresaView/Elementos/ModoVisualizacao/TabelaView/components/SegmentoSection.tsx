import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material'
import React, { useState } from 'react'

import { formatCurrency } from '../../utils/currency'
import { SegmentoSectionProps } from '../types'

import { EmpresasTable } from './EmpresasTable'
import { PercentageText, SegmentoTitle, ValueText } from './styled'

export const SegmentoSection: React.FC<SegmentoSectionProps> = ({
  segmento,
  valorMercadoIndustria,
  valorMercadoTotal,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell width="30%">
          <SegmentoTitle variant="subtitle2">{segmento.segmento}</SegmentoTitle>
        </TableCell>
        <TableCell align="right" width="25%">
          <ValueText variant="subtitle2">{formatCurrency(segmento.valorMercado)}</ValueText>
        </TableCell>
        <TableCell align="right" width="20%">
          <ValueText variant="subtitle2">{segmento.empresasDetalhes.length}</ValueText>
        </TableCell>
        <TableCell align="right" width="25%">
          <PercentageText variant="subtitle2">
            {((segmento.valorMercado / valorMercadoIndustria) * 100).toFixed(2)}%
          </PercentageText>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 0, width: '100%' }}>
              <EmpresasTable
                empresas={segmento.empresasDetalhes}
                valorMercadoTotal={segmento.valorMercado}
                showIndustryParticipation={true}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
