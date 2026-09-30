import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Commissioner } from 'next/font/google'
import { ThemeProvider } from '@appica/ui-react/providers/theme-provider'
import { TooltipProvider } from '@appica/ui-react/tooltip'
import { cv } from '@/content/cv'
import { isLocale, locales } from '@/i18n'
import '../globals.css'

// Variable font; the FLAR (flair) and VOLM (volume) axes drive the hero name.
const commissioner = Commissioner({
  variable: '--font-commissioner',
  subsets: ['latin', 'cyrillic'],
  axes: ['FLAR', 'VOLM'],
})

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return {
    title: `${cv.name[lang]} — ${cv.title[lang]}`,
    description: cv.summary[lang],
  }
}

export default async function LangLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <html lang={lang} className={commissioner.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider disableTransitionOnChange>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
