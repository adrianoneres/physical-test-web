export const formatResult = (value: string, bestAttempt?: number) => {
  if (bestAttempt !== undefined && bestAttempt === 0) return '-';
  if (value === 'weak') return 'Fraco';
  if (value === 'moderate') return 'Moderado';
  if (value === 'good') return 'Bom';
  if (value === 'very_good') return 'Muito Bom';
  if (value === 'excellent') return 'Excelente';
  return '';
};
