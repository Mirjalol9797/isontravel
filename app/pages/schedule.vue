<script setup lang="ts">
const { upcoming } = useCatalog()
const { price, dayMonthWeekday, statusLabel, difficultyLabel, plural } = useFormat()

const all = upcoming()

/** Группируем по месяцу — так список читается как расписание, а не как лента */
const MONTHS_IN = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне',
  'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре']

const byMonth = computed(() => {
  const map = new Map<string, typeof all>()
  for (const item of all) {
    const d = new Date(item.date.date)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  }
  return [...map.entries()].map(([key, items]) => {
    const month = Number(key.split('-')[1])
    return { key, label: `В ${MONTHS_IN[month]}`, items }
  })
})

const booking = ref(false)
const picked = ref('')

const book = (title: string) => { picked.value = title; booking.value = true }

/** Файл календаря собираем на клиенте — бэкенд для этого не нужен */
const addToCalendar = (title: string, date: string, departAt: string, returnAt: string) => {
  const pad = (n: number) => String(n).padStart(2, '0')
  const stamp = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    const d = new Date(date)
    d.setHours(h ?? 6, m ?? 0, 0, 0)
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`
  }
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ison Travel//RU',
    'BEGIN:VEVENT',
    `DTSTART:${stamp(departAt)}`,
    `DTEND:${stamp(returnAt)}`,
    `SUMMARY:${title} — Ison Travel`,
    'LOCATION:Ташкент, м. Буюк Ипак Йули',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')

  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${title}.ics`
  a.click()
  URL.revokeObjectURL(url)
}

useSeoMeta({
  title: 'Расписание выездов — Ison Travel',
  description: `Ближайшие ${all.length} ${plural(all.length, ['выезд', 'выезда', 'выездов'])} из Ташкента: даты, цены, свободные места. Группы 10–20 человек.`,
})
</script>

<template>
  <div class="container-site sch">
    <UiBreadcrumbs :items="[{ label: 'Расписание' }]" />

    <UiSectionTitle
      as="h1"
      eyebrow="Расписание"
      title="Ближайшие выезды"
      text="Места закрепляются после оплаты. Если даты нет в списке — напишите, часто добавляем под группу."
      class="sch__head"
    />

    <section v-for="group in byMonth" :key="group.key" v-reveal class="reveal sch__group">
      <h2>{{ group.label }}</h2>

      <ul class="sch__list">
        <li v-for="{ tour, date } in group.items" :key="date.id" class="srow">
          <span class="srow__date">
            <b>{{ dayMonthWeekday(date.date) }}</b>
            <small>выезд в {{ date.departAt }}</small>
          </span>

          <NuxtLink :to="`/tours/${tour.slug}`" class="srow__tour">
            <b>{{ tour.title }}</b>
            <small>{{ difficultyLabel(tour.difficulty) }} · {{ tour.distanceKm }} км</small>
          </NuxtLink>

          <span class="srow__seats seats" :class="`seats--${date.status}`">
            {{ statusLabel(date.status, date.seatsLeft) }}
          </span>

          <span class="srow__price">{{ price(date.price) }}</span>

          <span class="srow__cta">
            <button
              class="srow__ics"
              title="Добавить в календарь"
              aria-label="Добавить в календарь"
              @click="addToCalendar(tour.title, date.date, date.departAt, date.returnAt)"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="3.5" width="12" height="10" rx="2" stroke="currentColor" stroke-width="1.5" />
                <path d="M2 6.5h12M5.5 2v3M10.5 2v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
            <UiButton
              :variant="date.status === 'few' ? 'cta' : 'outline'"
              size="sm"
              @click="book(tour.title)"
            >Записаться</UiButton>
          </span>
        </li>
      </ul>
    </section>

    <UiModal v-model:open="booking" :title="`Запись: ${picked}`">
      <FormLead :interest="picked" :with-interest="false" with-people compact />
    </UiModal>
  </div>
</template>

<style scoped>
.sch { padding-bottom: clamp(48px, 7vw, 96px); }
.sch__head { margin: 8px 0 clamp(28px, 4vw, 44px); }
.sch__group { margin-bottom: clamp(32px, 4vw, 48px); }
.sch__group h2 { font-size: clamp(20px, 2.4vw, 26px); margin-bottom: 18px; }

.sch__list { border: 1px solid var(--color-line); border-radius: var(--radius-card); overflow: hidden; list-style: none; background: var(--color-surface); }

.srow {
  display: grid;
  grid-template-columns: 1.1fr 1.4fr .9fr .7fr auto;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-top: 1px solid var(--color-line);
}
.srow:first-child { border-top: 0; }
.srow:hover { background: var(--color-bg); }

.srow__date b, .srow__tour b { display: block; font-size: 15.5px; font-weight: 700; }
.srow__date small, .srow__tour small { font-size: 13px; color: var(--color-muted); }
.srow__tour:hover b { color: var(--color-primary); }
.srow__price { font-family: var(--font-display); font-size: 17px; font-weight: 600; }

.srow__cta { display: flex; align-items: center; gap: 8px; }
.srow__ics {
  width: 36px; height: 36px;
  border: 1px solid var(--color-line);
  border-radius: 50%;
  background: var(--color-surface);
  display: grid; place-items: center;
  cursor: pointer;
  color: var(--color-muted);
  transition: .2s;
}
.srow__ics:hover { border-color: var(--color-primary); color: var(--color-primary); }

.seats { font-size: 12.5px; font-weight: 700; color: var(--color-hard); }
.seats--open { color: var(--color-easy); }

@media (max-width: 900px) {
  .srow { grid-template-columns: 1fr auto; row-gap: 10px; }
  .srow__seats { grid-column: 1; }
  .srow__price { grid-column: 2; text-align: right; }
  .srow__cta { grid-column: 1 / -1; justify-content: flex-start; }
}
</style>
