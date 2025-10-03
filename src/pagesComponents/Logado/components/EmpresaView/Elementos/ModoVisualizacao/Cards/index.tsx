import { Box, Grid, Typography } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import React, { useEffect, useState } from 'react'

import { PaginationControls } from '@/components/Data-Display/PaginationControls'

import { SumarioData } from '../TabelaView/types'
import { sumarioService } from '../utils/sumarioService'

import { CompanyCard } from './components/CompanyCard/index'
import { CardsContainer, LoadingContainer, StyledCircularProgress } from './styled'

interface CardsViewProps {
  onLoadingChange?: (loading: boolean) => void
  cardsPerPage?: number
}

export const CardsView: React.FC<CardsViewProps> = ({ onLoadingChange, cardsPerPage = 20 }) => {
  const [data, setData] = useState<SumarioData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(cardsPerPage)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        if (onLoadingChange) onLoadingChange(true)

        const sumarioData = await sumarioService.getSumarioData()
        setData(sumarioData)
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        setError('Falha ao carregar os dados')
      } finally {
        setIsLoading(false)
        if (onLoadingChange) onLoadingChange(false)
      }
    }

    fetchData()
  }, [onLoadingChange])

  if (isLoading) {
    return (
      <LoadingContainer>
        <StyledCircularProgress />
      </LoadingContainer>
    )
  }

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

  if (!data) return null

  // Flatten all companies for card display
  const allCompanies = data.sumario.flatMap((industria) =>
    industria.segmentos.flatMap((segmento) =>
      segmento.empresasDetalhes.map((empresa) => ({
        ...empresa,
        industria: industria.industria,
        segmento: segmento.segmento,
      })),
    ),
  )

  // Sort companies by market value (descending)
  const sortedCompanies = [...allCompanies].sort((a, b) => b.valorMercado - a.valorMercado)

  const totalPages = Math.ceil(sortedCompanies.length / pageSize)
  const currentCompanies = sortedCompanies.slice(currentPage * pageSize, (currentPage + 1) * pageSize)

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page - 1)
  }

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPageSize(event.target.value as number)
    setCurrentPage(0)
  }

  return (
    <Box>
      <CardsContainer>
        <Grid container spacing={3}>
          {currentCompanies.map((empresa, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <CompanyCard empresa={empresa} totalMarketValue={data.sumarioTotal.valorMercadoTotalGeral} />
            </Grid>
          ))}
        </Grid>
      </CardsContainer>
      <PaginationControls
        page={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        validPageSizes={[20, 50, 100]}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </Box>
  )
}

export default CardsView
