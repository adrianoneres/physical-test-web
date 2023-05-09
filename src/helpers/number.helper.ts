export const formatNumber = (value: number, unit?: string) => {
  if (value === 0) return '-';
  return `${Intl.NumberFormat('pt-BR').format(value)} ${unit}`;
};

export const parseNumber = (
  value: string | number | null | undefined,
): number | undefined => {
  if (!value || (typeof value === 'string' && value.length === 0)) {
    return undefined;
  }

  return Number(value);
};
