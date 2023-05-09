import {
  endOfYear,
  format as formatDate,
  parseISO,
  startOfToday,
  startOfYear,
} from 'date-fns';

export function today() {
  return startOfToday();
}

export function firstDayOfYear() {
  return startOfYear(new Date());
}

export function lastDayOfYear() {
  return endOfYear(new Date());
}

export function format(date: string, pattern: string = 'dd/MM/yyyy') {
  const parsedDate = parseISO(date);
  return formatDate(parsedDate, pattern);
}
