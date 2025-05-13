import type { TimezoneData, TimezoneValue } from './types';
/**
 * Converts the original timezone format to the localized structure
 *
 * @param timezones The original timezone data
 * @returns A new TimezoneData structure with English as the default locale
 */
export declare function convertOriginalToLocalized(timezones: Record<string, Record<string, [string, string, string]>>): TimezoneData;
/**
 * Gets TimezoneValue data filtered for a specific language and city value.
 * If the language is not available, falls back to English (en).
 *
 * @param locale - The locale code (e.g., 'en', 'it', 'de', 'ja', 'zh')
 * @param city - The city name to filter by
 * @param fallbackLocale - Fallback locale if requested locale isn't available (defaults to 'en')
 * @returns TimezoneValue filtered for the requested locale and city
 */
export declare function getTimezoneValueForCity(locale: string, city: string, fallbackLocale: string | undefined, timezoneData: TimezoneData): TimezoneValue | null;
/**
 * Gets timezone data filtered for a specific language.
 * If the language is not available, falls back to English (en).
 *
 * @param locale - The locale code (e.g., 'en', 'it', 'de', 'ja', 'zh')
 * @param fallbackLocale - Fallback locale if requested locale isn't available (defaults to 'en')
 * @returns TimezoneData filtered for the requested locale
 */
export declare function getTimezoneDataForLocale(locale: string, fallbackLocale: string | undefined, timezoneData: TimezoneData): TimezoneData;
/**
 * Gets a list of all available languages in the timezone data
 *
 * @returns Array of available locale codes
 */
export declare function getAvailableLocales(timezoneData: TimezoneData): string[];
/**
 * Gets timezone data for multiple languages.
 * Useful if you want to support language switching without reloading data.
 *
 * @param locales - Array of locale codes to include
 * @returns TimezoneData containing only the requested locales
 */
export declare function getTimezoneDataForLocales(locales: string[], timezoneData: TimezoneData): TimezoneData;
