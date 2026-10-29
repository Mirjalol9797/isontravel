import type { DateStatus, Difficulty } from '~/types'

const priceFmt = new Intl.NumberFormat('ru-RU')

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const WEEKDAYS_SHORT = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

export const useFormat = () => {
  /** 330000 → «330 000» */
  const price = (value: number) => priceFmt.format(value)

  /** '2026-11-01' → «1 ноября» */
  const dayMonth = (iso: string) => {
    const d = new Date(iso)
    return `${d.getDate()} ${MONTHS[d.getMonth()]}`
  }

  /** '2026-11-01' → «1 ноября, вс» */
  const dayMonthWeekday = (iso: string) => {
    const d = new Date(iso)
    return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${WEEKDAYS_SHORT[d.getDay()]}`
  }

  /** Склонение: 1 место, 4 места, 11 мест */
  const plural = (n: number, forms: [string, string, string]) => {
    const abs = Math.abs(n) % 100
    const last = abs % 10
    if (abs > 10 && abs < 20) return forms[2]
    if (last > 1 && last < 5) return forms[1]
    if (last === 1) return forms[0]
    return forms[2]
  }

  const seatsLabel = (n: number) => `${n} ${plural(n, ['место', 'места', 'мест'])}`

  const difficultyLabel = (d: Difficulty) =>
    ({ easy: 'Лёгкая', medium: 'Средняя', hard: 'Сложная' })[d]

  const durationLabel = (days: number) =>
    days === 1 ? '1 день' : `${days} ${plural(days, ['день', 'дня', 'дней'])}`

  const statusLabel = (status: DateStatus, seatsLeft: number) =>
    ({ open: 'есть места', few: `осталось ${seatsLabel(seatsLeft)}`, sold: 'мест нет' })[status]

  return { price, dayMonth, dayMonthWeekday, plural, seatsLabel, difficultyLabel, durationLabel, statusLabel }
}
