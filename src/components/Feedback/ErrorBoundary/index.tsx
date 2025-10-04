'use client'
import { Box, Stack, Typography } from '@mui/material'
import React, { Component, ErrorInfo, ReactNode } from 'react'

import { CustomButton } from '@/components/Core/Button'
import { borderRadius } from '@/theme/variables'

interface Props {
  children: ReactNode
  fallbackComponent?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })
    // Aqui você pode adicionar sua lógica de logging de erros
    console.error('Error details:', {
      error: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    })
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallbackComponent) {
        return this.props.fallbackComponent
      }

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            bgcolor: '#1A1A1A',
            color: 'white',
            p: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Oops! Algo deu errado.
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.7)' }}>
            Não se preocupe, estamos cientes do problema.
          </Typography>
          <Stack direction="row" spacing={2}>
            <CustomButton
              value="Tentar Novamente"
              customColor="#0056b3"
              textColor="#FFFFFF"
              onClick={this.handleReset}
            />
            <CustomButton
              value="Recarregar Página"
              customColor="#2196F3"
              textColor="#FFFFFF"
              onClick={this.handleReload}
            />
          </Stack>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: borderRadius.md }}>
              <Typography variant="body2" color="error" sx={{ fontFamily: 'monospace' }}>
                {this.state.error.toString()}
              </Typography>
            </Box>
          )}
        </Box>
      )
    }

    return this.props.children
  }
}
