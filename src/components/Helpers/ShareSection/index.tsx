'use client'
import ShareIcon from '@mui/icons-material/Share'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'

interface ShareSectionProps {
  title: string | null
  description: string | null
}

export const ShareSection = ({ title, description }: ShareSectionProps) => {
  const { enqueueSnackbar } = useSnackbar()

  const handleShare = async () => {
    const url = window.location.href

    if (navigator.share) {
      const shareData = {
        title: title || '',
        text: description || '',
        url,
      }

      if (navigator.canShare && !navigator.canShare(shareData)) {
        enqueueSnackbar('Não é possível compartilhar este conteúdo.', { variant: 'warning' })
        return
      }

      try {
        await navigator.share(shareData)
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          enqueueSnackbar('Erro ao compartilhar o artigo', { variant: 'error' })
          console.error('Erro ao compartilhar:', err)
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        enqueueSnackbar('Link copied to clipboard!', { variant: 'success' })
      } catch (err) {
        enqueueSnackbar('Error copying to clipboard', { variant: 'error' })
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        marginTop: '2rem',
      }}
    >
      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
        Compartilhar artigo:
      </Typography>
      <Tooltip title="Compartilhar">
        <IconButton
          onClick={handleShare}
          sx={{
            color: '#0D95F9',
            '&:hover': {
              color: 'white',
            },
          }}
        >
          <ShareIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
