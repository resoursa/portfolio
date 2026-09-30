/** A CV section: title in a side column on wide screens, stacked on phones. */
export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid gap-4 break-inside-avoid-page md:grid-cols-[9rem_1fr] md:gap-10"
    >
      <h2 id={`${id}-title`} className="font-medium text-foreground-muted md:pt-0.5">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
