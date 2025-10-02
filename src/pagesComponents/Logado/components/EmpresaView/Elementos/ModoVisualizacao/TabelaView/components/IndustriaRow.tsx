import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material'
import React, { useState } from 'react'

import { formatCurrency } from '../../utils/currency'
import { IndustriaRowProps } from '../types'
import { EmpresasTable } from './EmpresasTable'
import { SegmentoSection } from './SegmentoSection'
import { IndustriaTitle, PercentageText, ValueText } from './styled'

export const IndustriaRow: React.FC<IndustriaRowProps> = ({
  industria,
  valorMercadoTotal,
  valorMercadoGeral,
  segmentos,
  hideSegmentos,
}) => {
  const [open, setOpen] = useState(false)
  const allEmpresas = segmentos.flatMap((seg) => seg.empresasDetalhes)

  const sortedSegmentos = [...segmentos].sort((a, b) => b.valorMercado - a.valorMercado)

  const empresas = hideSegmentos
    ? segmentos.flatMap((seg) =>
        seg.empresasDetalhes.map((empresa) => ({
          ...empresa,
          segmento: seg.segmento,
        })),
      )
    : []

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <IndustriaTitle variant="subtitle1">{industria}</IndustriaTitle>
        </TableCell>
        <TableCell align="right">
          <ValueText variant="subtitle1">{formatCurrency(valorMercadoTotal)}</ValueText>
        </TableCell>
        <TableCell align="right">
          <ValueText variant="subtitle1">
            {segmentos.reduce((acc, seg) => acc + seg.empresasDetalhes.length, 0)}
          </ValueText>
        </TableCell>
        <TableCell align="right">
          <PercentageText variant="subtitle1">
            {((valorMercadoTotal / valorMercadoGeral) * 100).toFixed(2)}%
          </PercentageText>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ m: 0 }}>
              {hideSegmentos ? (
                <EmpresasTable
                  empresas={empresas}
                  valorMercadoTotal={valorMercadoTotal}
                  showIndustryParticipation={true}
                  useIndustryTotal={true}
                />
              ) : (
                sortedSegmentos.map((segmento, index) => (
                  <SegmentoSection
                    key={index}
                    segmento={segmento}
                    valorMercadoIndustria={valorMercadoTotal}
                    valorMercadoTotal={valorMercadoGeral}
                  />
                ))
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
