import toursRaw from '~/data/tours.json'
import destinationsRaw from '~/data/destinations.json'
import guidesRaw from '~/data/guides.json'
import reviewsRaw from '~/data/reviews.json'
import faqRaw from '~/data/faq.json'
import type { Destination, FaqItem, Guide, Review, Tour, TourDate } from '~/types'

/* ============================================================
   Единственное место, которое знает, откуда берутся данные.
   Появится бэкенд — здесь меняется источник на $fetch,
   компоненты не трогаем.
   ============================================================ */

const tours = toursRaw as Tour[]
const destinations = destinationsRaw as Destination[]
const guides = guidesRaw as Guide[]
const reviews = reviewsRaw as Review[]
const faq = faqRaw as FaqItem[]

/** Выезд вместе с туром, к которому он относится */
export interface DatedTour {
  tour: Tour
  date: TourDate
}

export const useCatalog = () => {
  const allTours = () => tours
  const tourBySlug = (slug: string) => tours.find(t => t.slug === slug)
  const toursByDestination = (slug: string) => tours.filter(t => t.destinationSlug === slug)

  const allDestinations = () => destinations
  const destinationBySlug = (slug: string) => destinations.find(d => d.slug === slug)

  const allGuides = () => guides
  const guideBySlug = (slug: string) => guides.find(g => g.slug === slug)
  const guidesFor = (tour: Tour) => tour.guideSlugs.map(guideBySlug).filter(Boolean) as Guide[]

  const allReviews = () => reviews
  const allFaq = () => faq

  /**
   * Будущие выезды по всем турам, по возрастанию даты.
   * unique — оставить по одному ближайшему выезду на тур: для витрины
   * на главной, где один и тот же маршрут дважды выглядит ошибкой.
   * Для страницы расписания нужен полный список.
   */
  const upcoming = (limit?: number, unique = false): DatedTour[] => {
    const today = new Date().toISOString().slice(0, 10)
    let list = tours
      .flatMap(tour => tour.dates.map(date => ({ tour, date })))
      .filter(({ date }) => date.date >= today && date.status !== 'sold')
      .sort((a, b) => a.date.date.localeCompare(b.date.date))

    if (unique) {
      const seen = new Set<string>()
      list = list.filter(({ tour }) => !seen.has(tour.id) && seen.add(tour.id))
    }
    return limit ? list.slice(0, limit) : list
  }

  /** Ближайший выезд — для таймера и липкой панели */
  const nextDeparture = (): DatedTour | undefined => upcoming(1)[0]

  return {
    allTours, tourBySlug, toursByDestination,
    allDestinations, destinationBySlug,
    allGuides, guideBySlug, guidesFor,
    allReviews, allFaq,
    upcoming, nextDeparture,
  }
}
