'use client'

import { useEffect } from 'react'
import { defaultLocale, isLocale, type Locale } from '@/i18n'

export const LOCALE_STORAGE_KEY = 'locale'

function preferredLocale(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (saved && isLocale(saved)) return saved
  } catch {}

  const browser = navigator.languages.map((l) => l.slice(0, 2).toLowerCase())
  if (browser.includes('uk')) return 'uk'
  return defaultLocale
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function LocaleRedirect() {
  useEffect(() => {
    // Full navigation: `/` and `/[lang]` have different root layouts, and the
    // theme provider's inline script must come from server HTML, not a client render.
    window.location.replace(`${basePath}/${preferredLocale()}/`)
  }, [])

  return null
}
