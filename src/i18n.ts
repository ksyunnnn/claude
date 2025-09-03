import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

// Can be imported from a shared config
export const locales = ['ja', 'en'] as const
export type Locale = (typeof locales)[number]

export async function getLocaleFromCookies(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value
  
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale
  }
  
  return 'ja' // Default locale
}

export default getRequestConfig(async () => {
  const locale = await getLocaleFromCookies()

  return {
    locale,
    // TypeScript翻訳ファイルから型安全な翻訳データを取得
    messages: locale === 'ja' 
      ? (await import('./lib/i18n/translations/ja')).ja
      : (await import('./lib/i18n/translations/en')).en,
  }
})