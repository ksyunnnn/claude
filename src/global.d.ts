import en from '../messages/en.json';
 
type Messages = typeof en;
 
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {
    // Additional message properties can be added here if needed
    [key: string]: string | Record<string, unknown>;
  }
}