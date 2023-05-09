export const formatImc = (value: string) => {
  if (value === 'meagerness') return 'Magreza';
  if (value === 'normal') return 'Normal';
  if (value === 'overweight') return 'Sobrepeso';
  if (value === 'obesity') return 'Obesidade';
  if (value === 'severe_obesity') return 'Obesidade Severa';
  return '';
};
