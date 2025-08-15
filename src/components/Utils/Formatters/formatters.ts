export const formatCNPJ = (cnpj: string): string => {
  if (!cnpj) return "N/A";

  const numericCNPJ = cnpj.replace(/\D/g, "");

  if (numericCNPJ.length === 14) {
    return `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(
      2,
      5
    )}.${numericCNPJ.slice(5, 8)}/${numericCNPJ.slice(
      8,
      12
    )}-${numericCNPJ.slice(12)}`;
  } else if (numericCNPJ.length === 13) {
    return `${numericCNPJ.slice(0, 2)}.${numericCNPJ.slice(
      2,
      5
    )}.${numericCNPJ.slice(5, 8)}/${numericCNPJ.slice(
      8,
      12
    )}-${numericCNPJ.slice(12)}`;
  } else {
    return cnpj;
  }
};

export const formatNumber = (num: number | string): string => {
  if (num === undefined) return "N/A";
  return new Intl.NumberFormat("pt-BR").format(Number(num));
};

export const formatDate2 = (dateStr: string): string => {
  if (!dateStr) return "N/A";

  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date);
  } catch (e) {
    return dateStr;
  }
};

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return "N/A";

  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("pt-BR").format(date);
  } catch (e) {
    return dateStr;
  }
};

export const formatCurrency = (value: number | string): string => {
  if (value === undefined || value === null) return "N/A";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
};

export const formatLink = (
  url: string | undefined,
  displayText: string = "Link"
): string => {
  if (!url) return "N/A";
  return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #1976d2; text-decoration: underline;">${displayText}</a>`;
};

export const parseDateDividends = (dateString: string): Date | null => {
  try {
    if (!dateString) return null;

    if (dateString.includes("/")) {
      const [day, month, year] = dateString.split("/").map(Number);
      if (day > 0 && day <= 31 && month > 0 && month <= 12 && year > 1900) {
        const date = new Date(year, month - 1, day);
        if (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        ) {
          return date;
        }
      }
    }
    return null;
  } catch (e) {
    console.error("Error parsing date:", dateString, e);
    return null;
  }
};
