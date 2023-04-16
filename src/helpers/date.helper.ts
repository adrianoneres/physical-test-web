import { format as formatDate, parseISO, startOfToday } from 'date-fns';

export function today() {
  return startOfToday();
}

export function format(date: string, pattern: string = 'dd/MM/yyyy') {
  const parsedDate = parseISO(date);
  return formatDate(parsedDate, pattern);
}
