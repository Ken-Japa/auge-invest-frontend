import { type FC, useEffect, useState } from 'react';

import { 
  BlockTimerContainer, 
  TimerDisplay, 
  TimerMessage, 
  TimerText, 
  TimerTitle} from './styled';

interface BlockTimerProps {
  seconds: number;
}

export const BlockTimer: FC<BlockTimerProps> = ({ seconds: initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <BlockTimerContainer>
      <TimerTitle>
        Acesso Temporariamente Bloqueado
      </TimerTitle>
      <TimerText>
        Muitas tentativas de login malsucedidas.
        Por favor, aguarde antes de tentar novamente.
      </TimerText>
      <TimerDisplay>
        {formatTime(seconds)}
      </TimerDisplay>
      <TimerMessage>
        Esta medida de segurança protege sua conta.
        Agradecemos sua compreensão.
      </TimerMessage>
    </BlockTimerContainer>
  );
};