import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

import { formatCurrency } from '../../utils/currency'
import { useSortableData } from '../hooks/useSortableData'
import { EmpresaDetalhe } from '../types'
import { StyledTable, StyledTableSortLabel } from './styled'

interface EmpresasTableProps {
  empresas: EmpresaDetalhe[]
  valorMercadoTotal: number
  showIndustryParticipation: boolean
  useIndustryTotal?: boolean
}

export const EmpresasTable: React.FC<EmpresasTableProps> = ({
  empresas,
  valorMercadoTotal,
  showIndustryParticipation,
  useIndustryTotal = false,
}) => {
  const { orderBy, order, handleSort } = useSortableData('valorMercado')
  const router = useRouter()

  const sortedEmpresas = [...empresas].sort((a, b) => {
    if (orderBy === 'valorMercado') {
      return order === 'desc' ? b.valorMercado - a.valorMercado : a.valorMercado - b.valorMercado
    }

    const codigoA = a.codigos[0]
    const codigoB = b.codigos[0]

    if (orderBy === 'preco') {
      return order === 'desc' ? codigoB.preco - codigoA.preco : codigoA.preco - codigoB.preco
    }

    if (orderBy === 'variacao') {
      const variacaoA = codigoA.variacao ?? -Infinity
      const variacaoB = codigoB.variacao ?? -Infinity
      return order === 'desc' ? variacaoB - variacaoA : variacaoA - variacaoB
    }

    return 0
  })

  const handleDoubleClick = (codigo: string) => {
    router.push(`/empresa/${codigo}`)
  }

  return (
    <StyledTable size="small">
      <TableHead>
        <TableRow>
          <TableCell>Empresa</TableCell>
          <TableCell align="right">
            <StyledTableSortLabel
              active={orderBy === 'valorMercado'}
              direction={order}
              onClick={() => handleSort('valorMercado')}
              IconComponent={UnfoldMoreIcon}
            >
              Valor de Mercado
            </StyledTableSortLabel>
          </TableCell>
          {showIndustryParticipation && <TableCell align="right">Participação</TableCell>}
          <TableCell>Códigos</TableCell>
          <TableCell align="right">
            <StyledTableSortLabel
              active={orderBy === 'preco'}
              direction={order}
              onClick={() => handleSort('preco')}
              IconComponent={UnfoldMoreIcon}
            >
              Preço
            </StyledTableSortLabel>
          </TableCell>
          <TableCell align="right">
            <StyledTableSortLabel
              active={orderBy === 'variacao'}
              direction={order}
              onClick={() => handleSort('variacao')}
              IconComponent={UnfoldMoreIcon}
            >
              Variação
            </StyledTableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedEmpresas.map((empresa, index) => (
          <React.Fragment key={index}>
            {empresa.codigos.map((codigo, cIndex) => (
              <TableRow key={`${index}-${cIndex}`}>
                {cIndex === 0 && (
                  <>
                    <TableCell
                      rowSpan={empresa.codigos.length}
                      onDoubleClick={() => handleDoubleClick(empresa.codigos[0].codigo)}
                      sx={{ cursor: 'pointer' }}
                    >
                      {empresa.empresa}
                    </TableCell>
                    <TableCell align="right" rowSpan={empresa.codigos.length}>
                      {formatCurrency(empresa.valorMercado)}
                    </TableCell>
                    {showIndustryParticipation && (
                      <TableCell align="right" rowSpan={empresa.codigos.length}>
                        {`${((empresa.valorMercado / valorMercadoTotal) * 100).toFixed(2)}%`}
                      </TableCell>
                    )}
                  </>
                )}
                <TableCell onDoubleClick={() => handleDoubleClick(codigo.codigo)} sx={{ cursor: 'pointer' }}>
                  {codigo.codigo}
                </TableCell>
                <TableCell align="right">{`R$ ${codigo.preco.toFixed(2)}`.replace('.', ',')}</TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: codigo.variacao
                      ? codigo.variacao > 0
                        ? 'success.main'
                        : 'error.main'
                      : 'text.primary',
                  }}
                >
                  {codigo.variacao ? `${codigo.variacao > 0 ? '+' : ''}${codigo.variacao.toFixed(2)}%` : '-'}
                </TableCell>
              </TableRow>
            ))}
          </React.Fragment>
        ))}
      </TableBody>
    </StyledTable>
  )
}
