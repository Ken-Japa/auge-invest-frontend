import { CircularProgress } from '@mui/material';
import { DetailPageContainer, ContentWrapper, LoadingContainer } from '../../styled';

export const LoadingState = () => (
  <DetailPageContainer>
    <ContentWrapper>
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    </ContentWrapper>
  </DetailPageContainer>
);