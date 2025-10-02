export const DEFAULT_VALUATION_INPUTS = {
  wacc: 10,
  crescimentoTerminal: 1.5, // Adjusted to be more conservative
  crescimentoProjecao: 2, // Adjusted to be more realistic
}

export const DEFAULT_SCENARIO_INPUTS = {
  otimista: {
    wacc: 8,
    crescimentoProjecao: 3, // More conservative growth
    crescimentoTerminal: 2,
    tipo: 'otimista' as const,
  },
  pessimista: {
    wacc: 12,
    crescimentoProjecao: 0.5, // Less aggressive negative scenario
    crescimentoTerminal: 0.5,
    tipo: 'pessimista' as const,
  },
}
