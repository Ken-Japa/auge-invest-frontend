import { create } from 'zustand'

import { CompanyFilter } from '../services/api/types'

interface CompanyState {
  /**
   * Objeto contendo os filtros aplicados para a listagem de empresas.
   */
  filters: CompanyFilter
  /**
   * O ID da empresa atualmente selecionada, ou null se nenhuma estiver selecionada.
   */
  selectedCompanyId: string | null
  /**
   * Define novos filtros, mesclando-os com os filtros existentes.
   * @param {Partial<CompanyFilter>} filters Um objeto parcial com os novos filtros a serem aplicados.
   */
  setFilters: (filters: Partial<CompanyFilter>) => void
  /**
   * Reseta todos os filtros para seus valores padrão.
   */
  resetFilters: () => void
  /**
   * Define o ID da empresa selecionada.
   * @param {string | null} id O ID da empresa a ser selecionada, ou null para desmarcar.
   */
  setSelectedCompanyId: (id: string | null) => void
}

const defaultFilters: CompanyFilter = {
  page: 0,
  pageSize: 10,
}

/**
 * Hook de estado para gerenciar informações relacionadas a empresas, incluindo filtros e a empresa selecionada.
 * Utiliza Zustand para um gerenciamento de estado simples e eficiente.
 */
export const useCompanyStore = create<CompanyState>((set) => ({
  filters: { ...defaultFilters },
  selectedCompanyId: null,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  setSelectedCompanyId: (id) => set({ selectedCompanyId: id }),
}))
