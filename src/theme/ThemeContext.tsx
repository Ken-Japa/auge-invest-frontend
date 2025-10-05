'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { darkTheme, lightTheme } from './mui'

const THEME_STORAGE_KEY = 'theme'

/**
 * @interface ThemeContextType
 * @description Define a estrutura do contexto do tema, incluindo o estado do modo escuro e a função para alternar o tema.
 * @property {boolean} isDarkMode - Indica se o tema atual é o modo escuro.
 * @property {() => void} toggleTheme - Função para alternar entre o modo claro e escuro.
 */
interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

/**
 * @const ThemeContext
 * @description Contexto React para gerenciar o estado do tema (claro/escuro) da aplicação.
 * Fornece `isDarkMode` e `toggleTheme` para os componentes filhos.
 */
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
})

/**
 * @function useTheme
 * @description Hook personalizado para consumir o ThemeContext, permitindo que componentes acessem o estado do tema e a função para alterná-lo.
 * @returns {ThemeContextType} O objeto de contexto do tema, contendo `isDarkMode` e `toggleTheme`.
 */
export const useTheme = () => useContext(ThemeContext)

/**
 * @typedef {object} ThemeProviderProps
 * @property {React.ReactNode} children - Os elementos filhos que terão acesso ao contexto do tema.
 */

/**
 * Componente provedor de tema que encapsula a aplicação para fornecer o contexto do tema.
 * Gerencia o estado do tema (claro/escuro) e persiste a preferência do usuário no localStorage.
 * Aplica o tema Material-UI correspondente (darkTheme ou lightTheme) e o CssBaseline.
 *
 * @param {ThemeProviderProps} props - As propriedades do componente.
 * @returns {JSX.Element} Um provedor de tema que envolve os componentes filhos.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      return savedTheme !== 'light';
    }
    return true; // Default to dark mode if on server or localStorage not available
  });

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newTheme = !prev
      localStorage.setItem(THEME_STORAGE_KEY, newTheme ? 'dark' : 'light')
      return newTheme
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
