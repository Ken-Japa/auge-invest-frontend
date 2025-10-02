import { Typography } from '@mui/material'

import { CodeChip, HeaderContainer } from '../../styled'

interface FIIHeaderProps {
  nomeFII: string
  nomeCompletoFII?: string
  codigos?: string[]
}

const FIIHeader = ({ nomeFII, nomeCompletoFII, codigos }: FIIHeaderProps) => {
  return (
    <HeaderContainer>
      <div>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          {nomeFII}
        </Typography>
        {nomeCompletoFII && (
          <Typography variant="subtitle1" component="div" gutterBottom sx={{ color: 'text.secondary' }}>
            {nomeCompletoFII}
          </Typography>
        )}
      </div>
      <div>{codigos && codigos.map((code) => <CodeChip key={code} label={code} color="primary" />)}</div>
    </HeaderContainer>
  )
}

export default FIIHeader
