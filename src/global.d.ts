import type { Translation } from './lib/i18n/types';
 
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Translation {
    // Ensure the interface is not empty by adding an index signature
    [K: string]: unknown;
  }
}