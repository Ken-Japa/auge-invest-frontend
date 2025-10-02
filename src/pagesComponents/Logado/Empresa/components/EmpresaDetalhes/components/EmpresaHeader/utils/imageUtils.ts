/**
 * Formats a company name for use in image paths
 * @param companyName The name of the company
 * @returns The formatted name for image paths
 */
export const formatCompanyNameForImage = (companyName: string): string => {
  if (!companyName) return ''

  return companyName
    .toUpperCase()
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/\//g, '') // Remove forward slashes
    .trim()
}

/**
 * Gets the image path for a company logo
 * @param companyName The name of the company
 * @returns The path to the company's logo image
 */
export const getCompanyLogoPath = (companyName: string): string => {
  const formattedName = formatCompanyNameForImage(companyName)
  return `/assets/images/individuais/empresas/${formattedName}.webp`
}

/**
 * Gets the best available image path for a company logo
 * @param companyName The name of the company
 * @returns A promise that resolves to the best available image path
 */
export const getBestCompanyLogoPath = async (companyName: string): Promise<string> => {
  const formattedName = formatCompanyNameForImage(companyName)
  return `/assets/images/individuais/empresas/${formattedName}.webp`
}
