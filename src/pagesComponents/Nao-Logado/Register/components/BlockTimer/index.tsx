import { type FC, useEffect, useState } from 'react'

import { BlockTimerContainer, TimerDisplay, TimerMessage, TimerText, TimerTitle } from './styled'

interface BlockTimerProps {
  seconds: number
}

export const BlockTimer: FC<BlockTimerProps> = ({ seconds: initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <BlockTimerContainer>
      <TimerTitle variant="h5">Acesso Temporariamente Bloqueado</TimerTitle>
      <TimerText variant="body1">
        Muitas tentativas de registro malsucedidas. Por favor, aguarde antes de tentar novamente.
      </TimerText>
      <TimerDisplay>{formatTime(seconds)}</TimerDisplay>
      <TimerMessage variant="body2">
        Esta medida de segurança protege nossa plataforma. Agradecemos sua compreensão.
      </TimerMessage>
    </BlockTimerContainer>
  )
}

export default BlockTimer
