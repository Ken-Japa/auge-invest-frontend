import { ETF } from '@/services/api/types/etf'

export type ETFExtended = ETF & {
  // Add any additional properties specific to the component's needs here
  // For example, if you need to add a 'isSelected' flag or a 'displayValue'
  // isSelected?: boolean;
}
