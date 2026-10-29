/**
 * Путь к файлу из public/ с учётом baseURL.
 *
 * На GitHub Pages сайт часто лежит в подпапке (owner.github.io/repo/),
 * и абсолютный «/img/...» в такой сборке ведёт в никуда.
 * Все картинки из данных прогоняем через это.
 */
export const asset = (path?: string) => {
  if (!path) return path
  // внешние ссылки и data-URI не трогаем
  if (!path.startsWith('/') || path.startsWith('//')) return path

  const base = useRuntimeConfig().app.baseURL || '/'
  if (base === '/') return path

  return `${base.replace(/\/$/, '')}${path}`
}
