import apiClient from './client'
import * as endpoints from './endpoints'

export const api = {
  auth: endpoints.authApi,
  companies: endpoints.companiesApi,
  users: endpoints.userApi,
  historical: endpoints.historicalApi,
  derivatives: endpoints.derivativesApi,
  fiis: endpoints.fiisApi,
  bdrs: endpoints.bdrsApi,
  bdrnp: endpoints.bdrnpApi,
  etf: endpoints.etfApi,
  etfbdr: endpoints.etfbdrApi,
  dictionary: endpoints.dictionaryApi,
  sumario: endpoints.sumarioApi,
  wallet: endpoints.walletApi,
  alerts: endpoints.alertsApi,
  favorites: endpoints.favoritesApi,
}

export * from './types'

export { apiClient }

export default api
