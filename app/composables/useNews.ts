import newsRaw from '~/data/news.json'
import type { NewsPost } from '~/types'

/** Лента новостей. Позже сюда подключается парсер Telegram-канала. */
const posts = (newsRaw as NewsPost[]).sort((a, b) => b.date.localeCompare(a.date))

export const CATEGORIES: { key: NewsPost['category']; label: string }[] = [
  { key: 'announce', label: 'Анонсы' },
  { key: 'report', label: 'Отчёты' },
  { key: 'useful', label: 'Полезное' },
]

export const useNews = () => {
  const all = () => posts
  const bySlug = (slug: string) => posts.find(p => p.slug === slug)
  const byCategory = (key: string) => (key ? posts.filter(p => p.category === key) : posts)
  const others = (slug: string, limit = 2) => posts.filter(p => p.slug !== slug).slice(0, limit)
  const categoryLabel = (key: NewsPost['category']) =>
    CATEGORIES.find(c => c.key === key)?.label ?? ''

  return { all, bySlug, byCategory, others, categoryLabel }
}
