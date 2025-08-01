import { Grid } from '@mui/material';
import { FIIExtended } from '../../../../../components/FIIs/types';
import {
  DetailContainer,
  DetailPaper,
  SectionDivider,
} from '../../styled';
import FIIDividendos from '../FIIDividendos';
import FIIHeader from './FIIHeader';
import FIIInfoSection from './FIIInfoSection';
import FIIDescription from './FIIDescription';

interface FIIContentProps {
  fii: FIIExtended;
}

export const FIIContent = ({ fii }: FIIContentProps) => (
  <DetailContainer>
    <DetailPaper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FIIHeader
            nomeFII={fii.nomeFII}
            nomeCompletoFII={fii.nomeCompletoFII}
            codigos={fii.codigo}
          />
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
          <FIIDescription description={fii.informacoes.cnpj} />
        </Grid> */}
      </Grid>
    </DetailPaper>
    {fii.nomeFII && <FIIDividendos nomeFII={fii.nomeFII} />}
  </DetailContainer>
);