import styled from '@emotion/styled'

export const ErrorContainer = styled.div<{ aspectRatio?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(229 231 235);
  ${({ aspectRatio }) => aspectRatio && `aspect-ratio: ${aspectRatio};`}
`
