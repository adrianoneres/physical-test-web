export function parseNumber(
  value: string | number | null | undefined,
): number | undefined {
  if (!value || (typeof value === 'string' && value.length === 0)) {
    return undefined;
  }

  return Number(value);
}
