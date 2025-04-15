export const formatCNPJ = (cnpj: string): string => {
  if (!cnpj) return 'N/A';

  const numericCNPJ = cnpj.replace(/\D/g, '');

  if (numericCNPJ.length !== 14) return cnpj;

  return `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(2, 5)}.${numericCNPJ.slice(5, 8)}/${numericCNPJ.slice(8, 12)}-${numericCNPJ.slice(12)}`;
};

export const formatNumber = (num: number | string): string => {
  if (num === undefined) return 'N/A';
  return new Intl.NumberFormat('pt-BR').format(Number(num));
};

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return 'N/A';
  
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  } catch (e) {
    return dateStr;
  }
};

export const formatCurrency = (value: number | string): string => {
  if (value === undefined || value === null) return 'N/A';
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(Number(value));
};