import { Separator } from '@appica/ui-react/separator'
import { Skeleton } from '@appica/ui-react/skeleton'

/** Same grid as <Section>, with a bar in place of the (locale-dependent) title. */
function SectionSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-[9rem_1fr] md:gap-10">
      <Skeleton className="h-5 w-24" />
      <div className="flex min-w-0 flex-col gap-3">{children}</div>
    </div>
  )
}

function Lines({ widths }: { widths: string[] }) {
  return widths.map((width, i) => <Skeleton key={i} className="h-4" style={{ width }} />)
}

function Chips({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className="h-6 w-16 rounded-full" />
      ))}
    </div>
  )
}

/**
 * Shape of the CV page while it loads. Mirrors page.tsx so nothing jumps when the content arrives.
 * Pages are prerendered, so on a normal visit the HTML is already complete; this shows during
 * client-side route loads and in dev while a route compiles.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="mx-auto flex min-h-dvh max-w-4xl flex-col px-4 py-6 sm:px-8 md:py-10"
    >
      <div className="flex justify-end gap-2">
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="size-9 rounded-full" />
      </div>

      <div className="flex flex-col gap-6 pt-12 pb-14 md:pt-20 md:pb-20">
        <Skeleton className="h-[clamp(3rem,11vw,6.75rem)] w-[min(100%,52rem)]" />
        <Skeleton className="h-7 w-72 max-w-full" />
        <div className="flex flex-wrap gap-5">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-48" />
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-14 py-14 md:gap-16 md:py-16">
        <SectionSkeleton>
          <Lines widths={['100%', '96%', '92%', '60%']} />
        </SectionSkeleton>

        <SectionSkeleton>
          <div className="flex flex-col gap-10 border-s border-border ps-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-6 w-64 max-w-full" />
                <Skeleton className="h-4 w-40" />
                <Lines widths={['90%', '75%']} />
                <Chips count={4} />
              </div>
            ))}
          </div>
        </SectionSkeleton>

        <SectionSkeleton>
          <Chips count={8} />
          <Chips count={6} />
        </SectionSkeleton>
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  )
}
