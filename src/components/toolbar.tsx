'use client'

import { MoonIcon, PrinterIcon, SunIcon } from 'lucide-react'
import { Button, buttonVariants } from '@appica/ui-react/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@appica/ui-react/tooltip'
import { useTheme } from '@appica/ui-react/hooks/use-theme'
import { LOCALE_STORAGE_KEY } from '@/components/locale-redirect'
import { localeLabels, locales, type Dictionary, type Locale } from '@/i18n'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {}
}

function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme, mounted } = useTheme()
  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-md"
            aria-label={label}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
          />
        }
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

/** Prints in the light theme so the PDF isn't a dark page. */
function PrintButton({ label }: { label: string }) {
  const { resolvedTheme } = useTheme()

  function print() {
    const wasDark = resolvedTheme === 'dark'
    const root = document.documentElement
    if (wasDark) root.classList.remove('dark')
    // window.print() blocks until the dialog closes.
    window.print()
    if (wasDark) root.classList.add('dark')
  }

  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon-md" aria-label={label} onClick={print} />}>
        <PrinterIcon />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export function Toolbar({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <div className="no-print flex items-center gap-1">
      <nav aria-label={t.switchLanguage} className="flex items-center rounded-full border border-border p-0.5">
        {locales.map((locale) =>
          locale === lang ? (
            // The current language is plain text, so clicking it doesn't reload the page.
            <span
              key={locale}
              aria-current="page"
              className={buttonVariants({ variant: 'soft', size: 'sm', className: 'pointer-events-none rounded-full px-3' })}
            >
              {localeLabels[locale]}
            </span>
          ) : (
            // A plain <a>, not next/link: switching language swaps the root layout (<html lang>),
            // and a client-side render of it would re-render ThemeProvider's inline no-flash script.
            <a
              key={locale}
              href={`${basePath}/${locale}/`}
              hrefLang={locale}
              onClick={() => rememberLocale(locale)}
              className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'rounded-full px-3' })}
            >
              {localeLabels[locale]}
            </a>
          ),
        )}
      </nav>
      <PrintButton label={t.downloadPdf} />
      <ThemeToggle label={t.toggleTheme} />
    </div>
  )
}
