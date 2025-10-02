export const ROLES = [
  'Desenvolvedor Frontend',
  'Desenvolvedor Backend',
  'Analista de Dados',
  'Analista de Mercado',
  'Designer UI/UX',
  'Marketing Digital',
  'Outro',
] as const

export const BLOCK_DURATION = 24 * 60 * 60 * 1000 // 24 horas
export const BLOCK_TIMER_SECONDS = 86400 // 24 horas em segundos
export const MAX_JOIN_ATTEMPTS = 2

export const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  role: '',
  experience: '',
  portfolio: '',
  github: '',
  message: '',
} as const

export const MESSAGES = {
  SUCCESS: 'Candidatura enviada com sucesso! Entraremos em contato em breve.',
  ERROR: 'Erro ao enviar candidatura. Tente novamente mais tarde.',
  WAIT_BLOCK: (timer: number) => `Por favor, aguarde ${timer} segundos antes de tentar novamente.`,
  VALIDATION_ERROR: 'Por favor, corrija os erros no formulário antes de enviar.',
} as const
