import { Grid } from '@mui/material'
import { lazy, Suspense } from 'react'

import { FIIExtended } from '../../../../../components/FIIs/types'
import { DetailContainer, DetailPaper, SectionDivider } from '../../styled'

import FIIHeader from './FIIHeader'
import FIIInfoSection from './FIIInfoSection'

const LazyFIIDividendos = lazy(() => import('../FIIDividendos'))
const LazyFIIDescription = lazy(() => import('./FIIDescription'))

interface FIIContentProps {
  fii: FIIExtended
}

export const FIIContent = ({ fii }: FIIContentProps) => (
  <DetailContainer>
    <DetailPaper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FIIHeader nomeFII={fii.nomeFII} nomeCompletoFII={fii.nomeCompletoFII} codigos={fii.codigo} />
        </Grid>

        <Grid item xs={12}>
          <SectionDivider />
        </Grid>

        <Grid item xs={12}>
          <FIIInfoSection
            cnpj={fii.informacoes?.cnpj}
            quotaDateApproved={fii.quotaDateApproved}
            quotaCount={fii.quotaCount}
            link={fii.informacoes.site}
          />
        </Grid>

        <Grid item xs={12}>
          <SectionDivider />
        </Grid>

        {/* <Grid item xs={12}>
          <Suspense fallback={<div>Loading Description...</div>}>
            <LazyFIIDescription description={fii.informacoes.cnpj} />
          </Suspense>
        </Grid> */}
      </Grid>
    </DetailPaper>
    {fii.nomeFII && (
      <Suspense fallback={<div>Loading Dividends...</div>}>
        <LazyFIIDividendos nomeFII={fii.nomeFII} />
      </Suspense>
    )}
  </DetailContainer>
)
