export const CONTACT_CONSTANTS = {
  BLOCK_DURATION: 15 * 60 * 1000,
  MAX_ATTEMPTS: 3,
  MESSAGES: {
    WAIT_BLOCK: (timer: number) => `Aguarde ${timer} segundos antes de tentar novamente.`,
    SUCCESS: 'Mensagem enviada com sucesso!',
    ERROR: 'Erro ao enviar mensagem. Tente novamente.',
  },
} as const
