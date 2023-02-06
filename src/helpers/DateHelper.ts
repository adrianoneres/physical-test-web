/* eslint-disable no-console */
import {
  format as formatDate,
  isValid as isValidTest,
  parseISO,
} from 'date-fns';

export const DATE_FORMATS = {
  'yyyy-MM-dd': /^(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
  'MM-dd-yyyy': /^(?<month>[0-9]{2})-(?<day>[0-9]{2})-(?<year>[0-9]{4})/,
  'dd-MM-yyyy': /^(?<day>[0-9]{2})-(?<month>[0-9]{2})-(?<year>[0-9]{4})/,
  'dd/MM/yyyy': /^(?<day>[0-9]{2})\/(?<month>[0-9]{2})\/(?<year>[0-9]{4})/,
};

export interface DateContent {
  year: string;
  month: string;
  day: string;
}

export class DateHelper {
  /**
   * Check if a date is valid. This function should not depend of any other function in this class.
   *
   * @param value the date in string format
   * @param format format included in {dateformat}
   * @returns {boolean} true if date is valid and false if date is invalid
   */
  static isValid(value: string, format: string): boolean {
    const availableFormats = Object.keys(DATE_FORMATS);

    const isUnavailableFormat = !availableFormats.includes(format);
    if (isUnavailableFormat) {
      console.error('Invalid format');
      return false;
    }

    const regex = DATE_FORMATS[format as keyof typeof DATE_FORMATS];

    const isValueMatchesFormat = regex.test(value);
    if (!isValueMatchesFormat) {
      console.error(`Date does not match the ${format} format`);
      return false;
    }

    const matchContent = value.match(regex)?.groups;
    const content = JSON.parse(JSON.stringify(matchContent)) as DateContent;
    if (!content) {
      console.error('Invalid regex');
      return false;
    }

    const { year, month, day } = content;
    const date = `${year}-${month}-${day}`;

    return isValidTest(parseISO(date));
  }

  /**
   * Get date content
   *
   * @param value the date in string format
   * @param format format included in {dateformat}
   * @returns {DateContent}
   */
  static content(value: string, format: string): DateContent {
    const isValidDate = this.isValid(value, format);

    if (!isValidDate) {
      throw new Error('Invalid date');
    }

    const regex = DATE_FORMATS[format as keyof typeof DATE_FORMATS];
    const valueMatch = value.match(regex)?.groups;

    return JSON.parse(JSON.stringify(valueMatch)) as DateContent;
  }

  /**
   * Format date to the given format
   *
   * @param value the date
   * @param format to be formatted for
   * @returns {Date}
   */
  static from(value: Date, format: string): string {
    return formatDate(value, format);
  }

  /**
   * Parse string to Date
   *
   * @param value the date in string format
   * @param format format included in {dateformat}
   * @returns {string}
   */
  static to(value: string, format: string): Date {
    const isValidDate = this.isValid(value, format);

    if (!isValidDate) {
      throw new Error('Invalid date');
    }

    const content = this.content(value, format);
    const date = `${content.year}-${content.month}-${content.day}`;

    return parseISO(date);
  }
}
