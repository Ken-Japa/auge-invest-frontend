import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

import { formatCurrency } from '../../utils/currency'
import { SumarioData } from '../types'

interface FlatTableViewProps {
  data: SumarioData
  orderBy: string
  order: 'asc' | 'desc'
  handleSort: (property: string) => void
}

export const FlatTableView: React.FC<FlatTableViewProps> = ({ data, orderBy, order, handleSort }) => {
  const router = useRouter()

  const allEmpresas = data.sumario.flatMap((industria) =>
    industria.segmentos.flatMap((segmento) =>
      segmento.empresasDetalhes.map((empresa) => ({
        ...empresa,
        industria: industria.industria,
        segmento: segmento.segmento,
      })),
    ),
  )

  const sortedEmpresas = [...allEmpresas].sort((a, b) => {
    if (orderBy === 'valorMercado') {
      return order === 'desc' ? b.valorMercado - a.valorMercado : a.valorMercado - b.valorMercado
    }
    return 0
  })

  // Add navigation handler for company details
  const handleRowClick = (codigo: string) => {
    router.push(`/empresa/${codigo}`)
  }

  return (
    <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
      <TableHead>
        <TableRow>
          <TableCell>Empresa</TableCell>
          <TableCell>Indústria</TableCell>
          <TableCell>Segmento</TableCell>
          <TableCell align="right">
            <TableSortLabel
              active={orderBy === 'valorMercado'}
              direction={order}
              onClick={() => handleSort('valorMercado')}
              IconComponent={UnfoldMoreIcon}
            >
              Valor de Mercado
            </TableSortLabel>
          </TableCell>
          <TableCell align="right">Participação</TableCell>
          <TableCell>Códigos</TableCell>
          <TableCell align="right">Preço</TableCell>
          <TableCell align="right">Variação</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedEmpresas.map((empresa, index) => (
          <React.Fragment key={index}>
            {empresa.codigos.map((codigo, cIndex) => (
              <TableRow
                key={`${index}-${cIndex}`}
                hover
                onClick={() => handleRowClick(codigo.codigo)}
                sx={{ cursor: 'pointer' }}
              >
                {cIndex === 0 && (
                  <>
                    <TableCell rowSpan={empresa.codigos.length}>{empresa.empresa}</TableCell>
                    <TableCell rowSpan={empresa.codigos.length}>{empresa.industria}</TableCell>
                    <TableCell rowSpan={empresa.codigos.length}>{empresa.segmento}</TableCell>
                    <TableCell align="right" rowSpan={empresa.codigos.length}>
                      {formatCurrency(empresa.valorMercado)}
                    </TableCell>
                    <TableCell align="right" rowSpan={empresa.codigos.length}>
                      {((empresa.valorMercado / data.sumarioTotal.valorMercadoTotalGeral) * 100).toFixed(2)}%
                    </TableCell>
                  </>
                )}
                <TableCell>{codigo.codigo}</TableCell>
                <TableCell align="right">{codigo.preco.toFixed(2)}</TableCell>
                <TableCell align="right">
                  {codigo.variacao !== undefined ? `${codigo.variacao.toFixed(2)}%` : '-'}
                </TableCell>
              </TableRow>
            ))}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  )
}
