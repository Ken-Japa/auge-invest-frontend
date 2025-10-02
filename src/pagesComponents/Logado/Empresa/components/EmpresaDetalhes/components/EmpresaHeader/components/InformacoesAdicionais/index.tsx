import CategoryIcon from '@mui/icons-material/Category'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GroupIcon from '@mui/icons-material/Group'
import NatureIcon from '@mui/icons-material/Nature'
import PublicIcon from '@mui/icons-material/Public'
import TimelineIcon from '@mui/icons-material/Timeline'
import { AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material'
import React from 'react'

import { CustomAccordion, ItemList } from './styled'

interface InformacoesAdicionaisProps {
  empresaInfo: any
}

export const InformacoesAdicionais: React.FC<InformacoesAdicionaisProps> = ({ empresaInfo }) => {
  if (!empresaInfo) return null

  const hasAdditionalInfo =
    empresaInfo.operating_markets ||
    empresaInfo.main_products ||
    empresaInfo.competitors ||
    empresaInfo.sustentabilidade?.initiatives ||
    empresaInfo.perspectives

  if (!hasAdditionalInfo) return null

  return (
    <CustomAccordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h4">Informações Adicionais</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {empresaInfo.operating_markets && (
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PublicIcon color="info" /> Mercados de Atuação
              </Typography>
              <ItemList component="ul">
                {empresaInfo.operating_markets.map((mercado: string, index: number) => (
                  <Typography component="li" variant="body2" key={index}>
                    {mercado}
                  </Typography>
                ))}
              </ItemList>
            </Grid>
          )}

          {empresaInfo.main_products && (
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CategoryIcon color="info" /> Produtos Principais
              </Typography>
              <ItemList component="ul">
                {empresaInfo.main_products.map((produto: string, index: number) => (
                  <Typography component="li" variant="body2" key={index}>
                    {produto}
                  </Typography>
                ))}
              </ItemList>
            </Grid>
          )}

          {empresaInfo.competitors && (
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GroupIcon color="info" /> Principais Concorrentes
              </Typography>
              <ItemList component="ul">
                {empresaInfo.competitors.map((concorrente: string, index: number) => (
                  <Typography component="li" variant="body2" key={index}>
                    {concorrente}
                  </Typography>
                ))}
              </ItemList>
            </Grid>
          )}

          {empresaInfo.sustentabilidade?.initiatives && (
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <NatureIcon color="success" /> Iniciativas de Sustentabilidade
              </Typography>
              <ItemList component="ul">
                {empresaInfo.sustentabilidade.initiatives.map((iniciativa: string, index: number) => (
                  <Typography component="li" variant="body2" key={index}>
                    {iniciativa}
                  </Typography>
                ))}
              </ItemList>
            </Grid>
          )}

          {empresaInfo.perspectives && (
            <Grid item xs={12}>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
              >
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TimelineIcon color="primary" /> Perspectivas Futuras
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, maxWidth: '100%' }}>
                  {empresaInfo.perspectives}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </AccordionDetails>
    </CustomAccordion>
  )
}
