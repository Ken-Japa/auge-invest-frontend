import { Divider, Typography } from '@mui/material'

import { SectionTitle } from '../styled'

/**
 * @function DataSourcesSection
 * @description Componente que exibe a seção "Fontes Confiáveis para Coleta de Dados" do guia de análise fundamentalista.
 * @returns {JSX.Element} O componente renderizado.
 */
export const DataSourcesSection = () => {
  return (
    <>
      <SectionTitle>Fontes Confiáveis para Coleta de Dados</SectionTitle>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
        • Página de Relacionamento com o Investidor ou Resultados e Comunicados das Empresas <br />• CVM
        (Relatórios ITR e DFP)
      </Typography>
    </>
  )
}
