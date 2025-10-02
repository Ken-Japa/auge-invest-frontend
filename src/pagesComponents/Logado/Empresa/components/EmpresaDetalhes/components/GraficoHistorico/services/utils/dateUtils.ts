/**
 * Calculates the target date based on the provided period.
 * @param period The period string (e.g., "1M", "6M", "1A", "5A", "MAX").
 * @returns The calculated Date object or null if the period is "MAX".
 */
export const calculateTargetDate = (period: string): Date | null => {
  const today = new Date()
  let targetDate: Date | null = new Date()

  switch (period) {
    case '1M':
      targetDate.setMonth(today.getMonth() - 1)
      break
    case '6M':
      targetDate.setMonth(today.getMonth() - 6)
      break
    case '1A':
      targetDate.setFullYear(today.getFullYear() - 1)
      break
    case '5A':
      targetDate.setFullYear(today.getFullYear() - 5)
      break
    case 'MAX':
      targetDate = null // Fetch all available data
      break
    default:
      targetDate.setFullYear(today.getFullYear() - 5) // Default to 5 years
      break
  }
  return targetDate
}
