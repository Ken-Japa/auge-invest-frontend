import '@testing-library/jest-dom'
import { configureAxe } from 'jest-axe'

configureAxe({
  rules: {
    // Desabilita a regra color-contrast para evitar falsos positivos em temas escuros
    'color-contrast': { enabled: false },
  },
})
