import { defaultLocale } from '@/i18n'
import { LocaleRedirect } from '@/components/locale-redirect'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// GitHub Pages can't redirect server-side, so `/` picks a language in the browser.
export default function RootPage() {
  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/${defaultLocale}/`} />
      </noscript>
      <LocaleRedirect />
    </>
  )
}
