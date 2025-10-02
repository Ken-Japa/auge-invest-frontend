/**
 * @fileoverview Utilitários para manipulação de parâmetros de paginação.
 */

/**
 * Extrai e padroniza os parâmetros de paginação de um objeto de filtros.
 * Garante que 'page' e 'pageSize' tenham valores padrão se não forem fornecidos.
 *
 * @param filters - O objeto de filtros que pode conter 'page' e 'pageSize'.
 * @param defaultPage - O valor padrão para 'page' se não for fornecido. Default é 0.
 * @param defaultPageSize - O valor padrão para 'pageSize' se não for fornecido. Default é 10.
 * @returns Um objeto contendo 'page' e 'pageSize' padronizados.
 */
export const getPaginationParams = (
  filters?: { page?: number; pageSize?: number },
  defaultPage: number = 0,
  defaultPageSize: number = 10,
) => {
  const page = filters?.page !== undefined ? filters.page : defaultPage
  const pageSize = filters?.pageSize !== undefined ? filters.pageSize : defaultPageSize
  return { page, pageSize }
}
