import { notFound } from 'next/navigation'
import { ExternalLinkIcon, MailIcon, MapPinIcon, SendIcon } from 'lucide-react'
import { Badge } from '@appica/ui-react/badge'
import { buttonVariants } from '@appica/ui-react/button'
import { Separator } from '@appica/ui-react/separator'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { LocalTime } from '@/components/local-time'
import { Section } from '@/components/section'
import { Toolbar } from '@/components/toolbar'
import { cv } from '@/content/cv'
import { isLocale, ui, type Locale } from '@/i18n'

function formatDate(value: string, lang: Locale) {
  const [year, month] = value.split('-').map(Number)
  if (!month) return String(year)
  return new Intl.DateTimeFormat(lang === 'uk' ? 'uk-UA' : 'en-US', { month: 'short', year: 'numeric' }).format(
    new Date(year, month - 1),
  )
}

export default async function CVPage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = ui[lang]

  const links = [
    { href: cv.links.linkedin, label: 'LinkedIn', icon: LinkedinIcon },
    cv.links.github && { href: cv.links.github, label: 'GitHub', icon: GithubIcon },
    cv.links.telegram && { href: cv.links.telegram, label: 'Telegram', icon: SendIcon },
    cv.links.email && { href: `mailto:${cv.links.email}`, label: cv.links.email, icon: MailIcon },
  ].filter((link) => !!link)

  return (
    <div className="mx-auto flex min-h-dvh max-w-4xl flex-col px-4 py-6 sm:px-8 md:py-10">
      <div className="flex justify-end">
        <Toolbar lang={lang} t={t} />
      </div>

      <header className="flex flex-col gap-6 pt-12 pb-14 md:pt-20 md:pb-20">
        <h1 className="name-flair text-[clamp(3.25rem,13vw,7.5rem)] leading-[0.92] font-extrabold tracking-[-0.03em] text-foreground-intense">
          {cv.name[lang]}
        </h1>

        <p className="max-w-2xl text-xl text-balance text-foreground-strong sm:text-2xl">{cv.title[lang]}</p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="size-4" aria-hidden />
            {cv.location[lang]}
          </span>
          <LocalTime lang={lang} label={t.localTime} />
          {cv.openToWork && (
            <span className="inline-flex items-center gap-2 text-secondary-intense">
              <span className="size-2 rounded-full bg-secondary" aria-hidden />
              {t.openToWork}
            </span>
          )}
        </div>

        <nav aria-label={t.contact} className="flex flex-wrap gap-2 pt-2">
          {links.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              className={buttonVariants({ variant: 'outline', size: 'md' })}
            >
              <Icon aria-hidden />
              {label}
            </a>
          ))}
        </nav>
      </header>

      <Separator />

      <main className="flex flex-col gap-14 py-14 md:gap-16 md:py-16">
        <Section id="about" title={t.about}>
          <p className="max-w-[62ch] text-lg leading-relaxed text-pretty text-foreground-strong">
            {cv.summary[lang]}
          </p>
        </Section>

        <Section id="experience" title={t.experience}>
          <ol className="relative flex flex-col gap-10 border-s border-border ps-6">
            {cv.experience.map((job, index) => {
              const current = !job.end
              return (
                <li key={`${job.company}-${job.start}`} className="relative flex flex-col gap-3 break-inside-avoid">
                  <span
                    aria-hidden
                    className={
                      current
                        ? 'absolute top-1.5 -start-[calc(1.5rem+0.3125rem)] size-2.5 rounded-full bg-secondary ring-4 ring-background'
                        : 'absolute top-1.5 -start-[calc(1.5rem+0.3125rem)] size-2.5 rounded-full border-2 border-border-strong bg-background ring-4 ring-background'
                    }
                  />
                  <p className="text-sm text-foreground-muted tabular-nums">
                    {formatDate(job.start, lang)} – {job.end ? formatDate(job.end, lang) : t.present}
                    {job.location && <span>, {job.location[lang]}</span>}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground-intense">{job.role[lang]}</h3>
                    <p className="text-foreground-strong">
                      {job.url ? (
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-border-strong underline-offset-4 transition-colors hover:text-secondary-intense hover:decoration-secondary"
                        >
                          {job.company}
                        </a>
                      ) : (
                        job.company
                      )}
                    </p>
                  </div>
                  {job.highlights.length > 0 && (
                    <ul className="flex max-w-[62ch] list-disc flex-col gap-1.5 ps-5 leading-relaxed text-foreground marker:text-foreground-subtle">
                      {job.highlights.map((item) => (
                        <li key={item.en}>{item[lang]}</li>
                      ))}
                    </ul>
                  )}
                  {job.stack && (
                    <ul aria-label={t.stack} className="flex flex-wrap gap-1.5">
                      {job.stack.map((tech) => (
                        <li key={tech}>
                          <Badge variant={index === 0 ? 'soft' : 'outline'} size="sm">
                            {tech}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ol>
        </Section>

        <Section id="projects" title={t.projects}>
          <ul className="flex flex-col gap-10">
            {cv.projects.map((project) => (
              <li key={project.name} className="flex flex-col gap-3 break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-lg font-semibold text-foreground-intense">{project.name}</h3>
                  <span className="text-sm text-foreground-muted tabular-nums">{project.year}</span>
                </div>
                <p className="max-w-[62ch] leading-relaxed text-pretty text-foreground">{project.description[lang]}</p>
                <ul aria-label={t.stack} className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Badge variant="outline" size="sm">
                        {tech}
                      </Badge>
                    </li>
                  ))}
                </ul>
                <div className="no-print flex flex-wrap gap-2">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonVariants({ variant: 'soft', size: 'sm' })}
                    >
                      <ExternalLinkIcon aria-hidden />
                      {t.liveSite}
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonVariants({ variant: 'outline', size: 'sm' })}
                    >
                      <GithubIcon aria-hidden />
                      {t.sourceCode}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="skills" title={t.skills}>
          <dl className="grid gap-5 sm:grid-cols-[11rem_1fr] sm:gap-x-6">
            {cv.skills.map((group) => (
              <div key={group.group.en} className="contents">
                <dt className="text-foreground-intense sm:pt-0.5">{group.group[lang]}</dt>
                <dd className="-mt-3 flex flex-wrap gap-1.5 sm:mt-0">
                  {group.items.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="education" title={t.education}>
          <ul className="flex flex-col gap-6">
            {cv.education.map((school) => (
              <li key={school.name.en} className="flex flex-col gap-0.5">
                <p className="text-sm text-foreground-muted tabular-nums">
                  {formatDate(school.start, lang)}
                  {school.end && ` – ${formatDate(school.end, lang)}`}
                </p>
                <h3 className="font-semibold text-foreground-intense">{school.name[lang]}</h3>
                <p className="text-foreground-muted">{school.degree[lang]}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="languages" title={t.languages}>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
            {cv.languages.map((language) => (
              <div key={language.name.en} className="contents">
                <dt className="text-foreground-intense">{language.name[lang]}</dt>
                <dd className="text-foreground-muted">{language.level[lang]}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="hobbies" title={t.hobbies}>
          <p className="text-foreground-strong">{cv.hobbies.map((hobby) => hobby[lang]).join(', ')}</p>
        </Section>
      </main>

      <footer className="mt-auto border-t border-border-muted pt-6 text-sm text-foreground-subtle">
        © {new Date().getFullYear()} {cv.name[lang]}
      </footer>
    </div>
  )
}
