import { CircularProgress } from '@mui/material';

import { ContentWrapper, DetailPageContainer, LoadingContainer } from '../../styled';

export const LoadingState = () => (
  <DetailPageContainer>
    <ContentWrapper>
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    </ContentWrapper>
  </DetailPageContainer>
);