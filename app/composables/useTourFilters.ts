import type { Difficulty, Tour } from '~/types'

/* ============================================================
   Фильтры каталога.

   Состояние живёт в query-параметрах URL, а не в памяти:
   ссылку можно скинуть другу, браузерная «назад» работает,
   и поисковик видит, на какой выборке он оказался.
   ============================================================ */

export type SortKey = 'date' | 'price-asc' | 'price-desc'

export const SORTS: { key: SortKey; label: string }[] = [
  { key: 'date', label: 'По дате выезда' },
  { key: 'price-asc', label: 'Сначала дешевле' },
  { key: 'price-desc', label: 'Сначала дороже' },
]

export const DIFFICULTIES: { key: Difficulty; label: string }[] = [
  { key: 'easy', label: 'Лёгкая' },
  { key: 'medium', label: 'Средняя' },
  { key: 'hard', label: 'Сложная' },
]

export const DURATIONS = [
  { key: '1', label: 'Один день' },
  { key: '2', label: 'С ночёвкой' },
]

export const useTourFilters = () => {
  const route = useRoute()
  const router = useRouter()
  const { allTours, allDestinations } = useCatalog()

  const read = (key: string) => {
    const value = route.query[key]
    return (Array.isArray(value) ? value[0] : value) ?? ''
  }

  /** Пустое значение убираем из URL, чтобы не плодить мусорные адреса */
  const write = (key: string, value: string) => {
    const query = { ...route.query }
    if (value) query[key] = value
    else delete query[key]
    router.replace({ query })
  }

  const bind = (key: string) => computed({
    get: () => read(key),
    set: (value: string) => write(key, value),
  })

  const destination = bind('destination')
  const difficulty = bind('difficulty')
  const duration = bind('duration')
  const sort = computed({
    get: () => (read('sort') || 'date') as SortKey,
    set: (value: SortKey) => write('sort', value === 'date' ? '' : value),
  })

  const nearestDate = (tour: Tour) =>
    tour.dates.map(d => d.date).sort()[0] ?? '9999-99-99'

  const result = computed<Tour[]>(() => {
    let list = allTours()

    if (destination.value) list = list.filter(t => t.destinationSlug === destination.value)
    if (difficulty.value) list = list.filter(t => t.difficulty === difficulty.value)
    if (duration.value === '1') list = list.filter(t => t.durationDays === 1)
    if (duration.value === '2') list = list.filter(t => t.durationDays > 1)

    const sorted = [...list]
    if (sort.value === 'price-asc') sorted.sort((a, b) => a.priceFrom - b.priceFrom)
    else if (sort.value === 'price-desc') sorted.sort((a, b) => b.priceFrom - a.priceFrom)
    else sorted.sort((a, b) => nearestDate(a).localeCompare(nearestDate(b)))

    return sorted
  })

  /** Активные фильтры — для чипсов «снять» над списком */
  const active = computed(() => {
    const chips: { key: string; label: string }[] = []
    if (destination.value) {
      const d = allDestinations().find(x => x.slug === destination.value)
      if (d) chips.push({ key: 'destination', label: d.name })
    }
    if (difficulty.value) {
      const d = DIFFICULTIES.find(x => x.key === difficulty.value)
      if (d) chips.push({ key: 'difficulty', label: d.label })
    }
    if (duration.value) {
      const d = DURATIONS.find(x => x.key === duration.value)
      if (d) chips.push({ key: 'duration', label: d.label })
    }
    return chips
  })

  const clear = (key?: string) => {
    if (key) return write(key, '')
    router.replace({ query: {} })
  }

  return { destination, difficulty, duration, sort, result, active, clear }
}
