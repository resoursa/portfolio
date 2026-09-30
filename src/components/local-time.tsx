'use client'

import { useEffect, useState } from 'react'
import { Skeleton } from '@appica/ui-react/skeleton'
import type { Locale } from '@/i18n'

const TIME_ZONE = 'Europe/Kyiv'

function format(lang: Locale) {
  const now = new Date()
  const time = new Intl.DateTimeFormat(lang === 'uk' ? 'uk-UA' : 'en-GB', {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
  }).format(now)
  const offset =
    new Intl.DateTimeFormat('en-US', { timeZone: TIME_ZONE, timeZoneName: 'shortOffset' })
      .formatToParts(now)
      .find((part) => part.type === 'timeZoneName')?.value ?? ''
  return { time, offset: offset.replace('GMT', 'UTC') }
}

/** Odesa local time, so people abroad can see when a call is reasonable. Client-only to avoid hydration drift. */
export function LocalTime({ lang, label }: { lang: Locale; label: string }) {
  const [value, setValue] = useState<ReturnType<typeof format> | null>(null)

  useEffect(() => {
    const tick = () => setValue(format(lang))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [lang])

  // Reserve the space until the clock is known, so the row doesn't shift after hydration.
  if (!value) return <Skeleton className="no-print inline-block h-4 w-44 align-middle" />


  return (
    <span className="no-print tabular-nums">
      {value.time} {label} ({value.offset})
    </span>
  )
}
