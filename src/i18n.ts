export const locales = ['en', 'uk'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Short label shown in the language switcher. */
export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  uk: 'UA',
}

export const ui = {
  en: {
    about: 'About',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    contact: 'Contact',
    present: 'Present',
    downloadPdf: 'Download PDF',
    toggleTheme: 'Toggle theme',
    switchLanguage: 'Switch language',
    openToWork: 'Open to opportunities',
    localTime: 'local time',
    stack: 'Stack',
    hobbies: 'Outside work',
    projects: 'Side projects',
    liveSite: 'Open app',
    sourceCode: 'Source code',
  },
  uk: {
    about: 'Про мене',
    experience: 'Досвід',
    education: 'Освіта',
    skills: 'Навички',
    languages: 'Мови',
    contact: 'Контакти',
    present: 'Дотепер',
    downloadPdf: 'Завантажити PDF',
    toggleTheme: 'Змінити тему',
    switchLanguage: 'Змінити мову',
    openToWork: 'Відкритий до пропозицій',
    localTime: 'за місцевим часом',
    stack: 'Стек',
    hobbies: 'Поза роботою',
    projects: 'Власні проєкти',
    liveSite: 'Відкрити застосунок',
    sourceCode: 'Код',
  },
} satisfies Record<Locale, Record<string, string>>

export type Dictionary = (typeof ui)['en']
