import { Alert, CircularProgress } from '@mui/material'
import React, { useMemo, useState } from 'react'

import { OpcoesTable } from './components/OpcoesTable'
import { VencimentoTabs } from './components/VencimentoTabs'
import { DerivativosContainer, LoadingContainer, TitleTypography } from './styled'
import {
  calcularDiasAteVencimento,
  formatarVencimento,
  formatCurrency,
  getVencimentoColor,
} from './utils/derivativosUtils'
import { useDerivativosData } from './utils/useDerivativosData'

interface DerivativoItem {
  'COD Opcao': string
  'Call ou Put': string
  Tipo: string
  'ON ou PN': string
  Strike: string
  Vencimento: string
  'Ultimo Preco': number
  'Data Negocio': string | null
  'Hora Negocio': string
  'Oferta Compra': number
  'Oferta Venda': number
  Volume: number
  Contratos: number
  _id: string
}

interface DerivativosTabProps {
  codigoBase: string
}

export const DerivativosTab: React.FC<DerivativosTabProps> = ({ codigoBase }) => {
  const { loading, error, derivativos, hasDerivatives, allDerivativesLoaded } = useDerivativosData(codigoBase)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50)
  const [selectedVencimento, setSelectedVencimento] = useState<string>('')

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleVencimentoChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedVencimento(newValue)
  }

  // Extrair vencimentos únicos e ordenados
  const vencimentos = useMemo(() => {
    const uniqueVencimentos = Array.from(new Set(derivativos.map((d) => d['Vencimento']))).sort()

    // Se temos vencimentos e nenhum está selecionado, selecione o primeiro
    if (uniqueVencimentos.length > 0 && !selectedVencimento) {
      setSelectedVencimento(uniqueVencimentos[0])
    }

    return uniqueVencimentos
  }, [derivativos, selectedVencimento])

  // Filtrar derivativos pelo vencimento selecionado
  const derivativosFiltrados = useMemo(() => {
    if (!selectedVencimento) return []
    return derivativos.filter((d) => d['Vencimento'] === selectedVencimento)
  }, [derivativos, selectedVencimento])

  // Organizar derivativos em calls e puts por strike
  const derivativosOrganizados = useMemo(() => {
    if (!derivativosFiltrados.length) return { strikes: [], callsMap: {}, putsMap: {} }

    const callsMap: Record<string, DerivativoItem> = {}
    const putsMap: Record<string, DerivativoItem> = {}
    const strikesSet = new Set<string>()

    derivativosFiltrados.forEach((derivativo) => {
      const strike = derivativo['Strike']
      strikesSet.add(strike)

      // Verificar se é CALL ou PUT baseado no texto do campo
      if (derivativo['Call ou Put'].includes('COMPRA')) {
        callsMap[strike] = derivativo
      } else if (derivativo['Call ou Put'].includes('VENDA')) {
        putsMap[strike] = derivativo
      }
    })

    // Ordenar strikes numericamente
    const strikes = Array.from(strikesSet).sort((a, b) => parseFloat(a) - parseFloat(b))

    return { strikes, callsMap, putsMap }
  }, [derivativosFiltrados])

  return (
    <DerivativosContainer>
      <TitleTypography variant="h4" gutterBottom>
        Derivativos para {codigoBase}
      </TitleTypography>

      {loading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : derivativos.length === 0 ? (
        <Alert severity="info">Não há derivativos disponíveis para este ativo.</Alert>
      ) : (
        <>
          {/* Componente de tabs de vencimentos */}
          <VencimentoTabs
            vencimentos={vencimentos}
            selectedVencimento={selectedVencimento}
            onVencimentoChange={handleVencimentoChange}
            formatarVencimento={formatarVencimento}
            calcularDiasAteVencimento={calcularDiasAteVencimento}
            getVencimentoColor={getVencimentoColor}
          />

          {/* Tabela de opções organizadas */}
          {selectedVencimento && (
            <>
              {/* Componente de tabela de opções com paginação client-side */}
              <OpcoesTable
                strikes={derivativosOrganizados.strikes}
                callsMap={derivativosOrganizados.callsMap}
                putsMap={derivativosOrganizados.putsMap}
                formatCurrency={formatCurrency}
                totalItems={derivativosOrganizados.strikes.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </>
      )}
    </DerivativosContainer>
  )
}
