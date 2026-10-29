/* ============================================================
   Модель данных.
   Формы описаны так, как их потом отдаст API, — чтобы переход
   с моков на бэкенд менял только композаблы, не компоненты.
   ============================================================ */

export type Difficulty = 'easy' | 'medium' | 'hard'
export type DateStatus = 'open' | 'few' | 'sold'

/** Конкретный выезд: дата + места + цена */
export interface TourDate {
  id: string
  /** ISO, YYYY-MM-DD */
  date: string
  departAt: string
  returnAt: string
  price: number
  seatsTotal: number
  seatsLeft: number
  status: DateStatus
}

export interface ProgramStep {
  time: string
  title: string
  text: string
  /** ключевые точки подсвечиваются на таймлайне */
  key?: boolean
}

export interface PackingItem {
  icon: string
  label: string
}

export interface Tour {
  id: string
  slug: string
  title: string
  /** одна строка для карточки и meta description */
  excerpt: string
  /** абзацы описания маршрута */
  description: string[]
  destinationSlug: string
  difficulty: Difficulty
  distanceKm: number
  ascentM: number
  durationDays: number
  /** «от» — минимальная цена среди дат */
  priceFrom: number
  cover: string
  gallery: string[]
  included: string[]
  excluded: string[]
  packing: PackingItem[]
  program: ProgramStep[]
  guideSlugs: string[]
  dates: TourDate[]
  meetingPoint: string
  groupSize: string
  /** для карточек «популярное» и сортировки */
  featured?: boolean
}

export interface Destination {
  slug: string
  name: string
  /** H1 SEO-лендинга: «Туры в Чимган из Ташкента» */
  title: string
  tagline: string
  cover: string
  toursCount: number
  /** в каком сезоне сюда ездят */
  seasons: string
  /** уникальный текст лендинга — без него страницы считаются дублями */
  intro: string[]
  howToGet: string
  points: { title: string; text: string }[]
  /** что здесь происходит в каждый сезон */
  seasonText: Record<string, string>
}

export interface Guide {
  slug: string
  name: string
  role: string
  experience: string
  photo: string
  directions: string[]
}

export interface Review {
  id: string
  author: string
  initials: string
  tourTitle: string
  when: string
  rating: number
  text: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  category: 'prep' | 'pay' | 'safety' | 'b2b'
}

/** Заявка с любой формы сайта */
export interface Lead {
  name: string
  phone: string
  interest?: string
  tourSlug?: string
  dateId?: string
  people?: number
  company?: string
  comment?: string
}

/** Пост новостной ленты. Пока моки; позже наполняется парсером Telegram-канала. */
export interface NewsPost {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string[]
  cover: string
  /** ISO, YYYY-MM-DD */
  date: string
  views: number
  category: 'announce' | 'report' | 'useful'
  telegramUrl?: string
}
