import type { Locale } from '@/i18n'

/**
 * All CV content lives here. Each text field has an English and a Ukrainian
 * version; everything else (links, dates, skills) is shared.
 *
 * Dates are 'YYYY-MM' or 'YYYY'; leave `end` undefined for a current role.
 * Sources: CV_Hirchenko.pdf (June 2025) and the public LinkedIn profile.
 */

type Localized = Record<Locale, string>

export interface Job {
  company: string
  url?: string
  role: Localized
  start: string
  end?: string
  location?: Localized
  highlights: Localized[]
  stack?: string[]
}

export interface School {
  name: Localized
  degree: Localized
  start: string
  end?: string
}

export interface Project {
  name: string
  year: string
  description: Localized
  url?: string
  repo?: string
  stack: string[]
}

export interface CV {
  name: Localized
  title: Localized
  location: Localized
  summary: Localized
  openToWork: boolean
  links: {
    linkedin: string
    github?: string
    email?: string
    telegram?: string
  }
  experience: Job[]
  projects: Project[]
  education: School[]
  skills: { group: Localized; items: string[] }[]
  languages: { name: Localized; level: Localized }[]
  hobbies: Localized[]
}

const odesa: Localized = { en: 'Odesa', uk: 'Одеса' }

export const cv: CV = {
  name: { en: 'Max Hirchenko', uk: 'Макс Гірченко' },
  title: { en: 'Senior Frontend Engineer', uk: 'Senior Frontend Engineer' },
  location: { en: 'Odesa, Ukraine', uk: 'Одеса, Україна' },
  summary: {
    en: 'Frontend engineer with 10+ years on the web, from bestselling Envato themes to e-commerce platforms built from scratch. I’ve led frontend architecture and teams on Vue.js and Magento 2 projects and mentored junior developers. CSS is still my favourite part of the job: complex, animated layouts with only as much JavaScript as they need.',
    uk: 'Frontend-розробник із понад 10-річним досвідом: від бестселерів-тем для Envato до e-commerce платформ, створених з нуля. Очолював frontend-архітектуру й команди на проєктах з Vue.js та Magento 2, менторив junior-розробників. CSS досі моя улюблена частина роботи: складні анімовані макети з мінімумом JavaScript.',
  },
  openToWork: true,
  links: {
    linkedin: 'https://www.linkedin.com/in/resoursa/',
    github: 'https://github.com/resoursa',
    email: 'resoursa@gmail.com',
  },
  experience: [
    {
      // TODO: confirm title, start date and highlights from LinkedIn (only the company is public).
      company: 'Flash Point Tech',
      role: { en: 'Senior Frontend Engineer', uk: 'Senior Frontend Engineer' },
      start: '2025',
      highlights: [],
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      company: 'ADITUS GmbH',
      role: { en: 'Lead Frontend Developer (contract)', uk: 'Lead Frontend Developer (контракт)' },
      start: '2023-07',
      end: '2024-12',
      location: { en: 'Germany, remote', uk: 'Німеччина, віддалено' },
      highlights: [
        {
          en: 'Built the frontend architecture and UI from scratch for a ticket-selling e-commerce platform.',
          uk: 'З нуля побудував frontend-архітектуру та UI для e-commerce платформи з продажу квитків.',
        },
        {
          en: 'Delivered a modern, responsive interface on Vue.js and Bootstrap, integrated with a C# backend.',
          uk: 'Реалізував сучасний адаптивний інтерфейс на Vue.js і Bootstrap з інтеграцією з бекендом на C#.',
        },
      ],
      stack: ['Vue 3', 'Nuxt 3', 'Pinia', 'Vite', 'VeeValidate', 'Bootstrap', 'SCSS', '.NET / C#'],
    },
    {
      company: 'RedHead Family Corporation',
      role: { en: 'Lead Frontend Developer', uk: 'Lead Frontend Developer' },
      start: '2020-07',
      end: '2022-04',
      location: odesa,
      highlights: [
        {
          en: 'Led the full redesign and frontend rebuild of antoshka.ua, a Magento 2 e-commerce platform.',
          uk: 'Керував повним редизайном і перебудовою frontend для antoshka.ua — e-commerce платформи на Magento 2.',
        },
        {
          en: 'Worked with design and marketing teams; ran planning, team meetings and stakeholder communication.',
          uk: 'Співпрацював з командами дизайну та маркетингу; вів планування, командні зустрічі й комунікацію зі стейкхолдерами.',
        },
      ],
      stack: ['Magento 2', 'JavaScript', 'SCSS'],
    },
    {
      company: 'Createx Digital Design & Dev',
      role: { en: 'Frontend Developer', uk: 'Frontend Developer' },
      start: '2018-05',
      end: '2020-05',
      location: odesa,
      highlights: [
        {
          en: 'Built custom web apps and premium templates for Envato and the official Bootstrap marketplace.',
          uk: 'Створював вебзастосунки та преміум-шаблони для Envato й офіційного маркетплейсу Bootstrap.',
        },
        {
          en: 'Mentored junior developers and put scalable UI systems in place.',
          uk: 'Менторив junior-розробників і впроваджував масштабовані UI-системи.',
        },
      ],
      stack: ['React', 'Bootstrap', 'Material UI', 'Ant Design'],
    },
    {
      company: '8Guild Digital Design & Dev',
      role: { en: 'Frontend Developer', uk: 'Frontend Developer' },
      start: '2014-07',
      end: '2018-05',
      location: odesa,
      highlights: [
        {
          en: 'Developed bestselling WordPress themes for Envato Market.',
          uk: 'Розробляв теми-бестселери для WordPress на Envato Market.',
        },
        {
          en: 'Owned the full frontend cycle: HTML, CSS, JavaScript and responsive design.',
          uk: 'Відповідав за повний цикл frontend-розробки: HTML, CSS, JavaScript, адаптивний дизайн.',
        },
      ],
      stack: ['WordPress', 'SCSS', 'Pug', 'Gulp', 'JavaScript'],
    },
    {
      company: 'JP-Designs',
      role: { en: 'HTML/CSS Developer', uk: 'HTML/CSS-верстальник' },
      start: '2013-05',
      end: '2013-12',
      location: odesa,
      highlights: [
        {
          en: 'Built static and responsive websites for local clients with HTML5, CSS3 and jQuery.',
          uk: 'Верстав статичні та адаптивні сайти для місцевих клієнтів на HTML5, CSS3 і jQuery.',
        },
      ],
    },
    {
      company: 'Freelance',
      role: { en: 'HTML/CSS Developer, content manager', uk: 'HTML/CSS-верстальник, контент-менеджер' },
      start: '2012-12',
      end: '2013-04',
      location: odesa,
      highlights: [
        {
          en: 'Delivered custom websites for small businesses and kept their content and structure up to date.',
          uk: 'Створював сайти для малого бізнесу та підтримував їхній контент і структуру.',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Clabar',
      year: '2026',
      description: {
        en: 'Scorekeeper for Klabar, the Odesa card game. It tracks tricks, combinations and penalties, and recalculates the score when you fix an earlier hand. Works offline and installs on a phone.',
        uk: 'Записник для клабару, одеської карткової гри. Рахує взятки, комбінації та штрафи й перераховує рахунок, якщо виправити попередню роздачу. Працює офлайн і встановлюється на телефон.',
      },
      url: 'https://resoursa.github.io/Clabar/',
      repo: 'https://github.com/resoursa/Clabar',
      stack: ['JavaScript', 'PWA', 'Service Worker', 'UA / EN'],
    },
    {
      name: 'AnnotateX',
      year: '2025',
      description: {
        en: 'Web app for uploading, annotating and publicly sharing images, with search, category filters and user profiles. Built together with another developer.',
        uk: 'Вебзастосунок для завантаження, анотування та публічного поширення зображень з пошуком, фільтрами за категоріями й профілями користувачів. Створений разом з іншим розробником.',
      },
      repo: 'https://github.com/Agero19/AnnotateX',
      stack: ['PHP', 'MySQL', 'MVC', 'CSS'],
    },
  ],
  education: [
    {
      name: {
        en: 'Odesa National Polytechnic University',
        uk: 'Одеський національний політехнічний університет',
      },
      degree: {
        en: 'Master’s degree, foreign trade management',
        uk: 'Магістр, менеджмент зовнішньоекономічної діяльності',
      },
      start: '2001-09',
      end: '2007-07',
    },
    {
      name: { en: 'HTML Academy', uk: 'HTML Academy' },
      degree: { en: 'Advanced HTML and CSS intensive, online', uk: 'Поглиблений інтенсив з HTML і CSS, онлайн' },
      start: '2015-01',
    },
    {
      name: { en: 'Front-end course, Kyiv', uk: 'Курс Front-end, Київ' },
      degree: { en: 'HTML and CSS fundamentals', uk: 'Основи HTML і CSS' },
      start: '2011-04',
      end: '2011-05',
    },
  ],
  // Grouped from the PDF CV plus the dependencies of recent projects in ~/Projects.
  skills: [
    {
      group: { en: 'Languages', uk: 'Мови' },
      items: ['TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS'],
    },
    {
      group: { en: 'Frameworks', uk: 'Фреймворки' },
      items: ['React', 'Next.js', 'Vue 3', 'Nuxt', 'React Admin'],
    },
    {
      group: { en: 'State & data', uk: 'Стан і дані' },
      items: ['Redux Toolkit', 'Redux-Saga', 'Zustand', 'Pinia', 'Axios', 'Orval (OpenAPI)', 'i18next'],
    },
    {
      group: { en: 'UI', uk: 'UI' },
      items: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Nuxt UI', 'Ant Design', 'Framer Motion'],
    },
    {
      group: { en: 'Testing & quality', uk: 'Тестування і якість' },
      items: ['Playwright', 'MSW', 'ESLint', 'Prettier', 'Stylelint'],
    },
    {
      group: { en: 'Build & tools', uk: 'Збірка й інструменти' },
      items: ['Vite', 'Webpack', 'Gulp', 'Git', 'Docker', 'Figma'],
    },
    {
      group: { en: 'Platforms', uk: 'Платформи' },
      items: ['Magento 2', 'WordPress', 'PWA'],
    },
  ],
  languages: [
    {
      name: { en: 'Ukrainian', uk: 'Українська' },
      level: { en: 'Native', uk: 'Рідна' },
    },
    {
      name: { en: 'English', uk: 'Англійська' },
      level: { en: 'Professional working', uk: 'Професійний робочий' },
    },
  ],
  hobbies: [
    { en: 'Guitar', uk: 'Гітара' },
    { en: 'cycling', uk: 'велосипед' },
    { en: 'mechanical keyboards', uk: 'механічні клавіатури' },
  ],
}
