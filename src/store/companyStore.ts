import { create } from "zustand";

import { CompanyFilter } from "../services/api/types";

interface CompanyState {
  filters: CompanyFilter;
  selectedCompanyId: string | null;
  setFilters: (filters: Partial<CompanyFilter>) => void;
  resetFilters: () => void;
  setSelectedCompanyId: (id: string | null) => void;
}

const defaultFilters: CompanyFilter = {
  page: 0,
  pageSize: 10,
};

export const useCompanyStore = create<CompanyState>((set) => ({
  filters: { ...defaultFilters },
  selectedCompanyId: null,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  setSelectedCompanyId: (id) => set({ selectedCompanyId: id }),
}));
