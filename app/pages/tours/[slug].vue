<script setup lang="ts">
const route = useRoute()
const { tourBySlug, destinationBySlug, guidesFor, allTours } = useCatalog()
const { price, difficultyLabel, durationLabel } = useFormat()

const tour = tourBySlug(String(route.params.slug))
if (!tour) throw createError({ statusCode: 404, statusMessage: 'Тур не найден', fatal: true })

const destination = destinationBySlug(tour.destinationSlug)
const guides = guidesFor(tour)

const similar = allTours()
  .filter(t => t.id !== tour.id)
  .sort((a, b) => Number(b.destinationSlug === tour.destinationSlug) - Number(a.destinationSlug === tour.destinationSlug))
  .slice(0, 3)

const facts = [
  { label: 'Пешком', value: `${tour.distanceKm} км` },
  { label: 'Набор высоты', value: `${tour.ascentM} м` },
  { label: 'Длительность', value: durationLabel(tour.durationDays) },
  { label: 'Сложность', value: difficultyLabel(tour.difficulty) },
  { label: 'Выезд', value: tour.dates[0]?.departAt ?? '—' },
  { label: 'Возвращение', value: `~${tour.dates[0]?.returnAt ?? '—'}` },
]

const booking = ref(false)

useSeoMeta({
  title: `${tour.title} — однодневный тур из Ташкента за ${price(tour.priceFrom)} сум | Ison Travel`,
  description: `${tour.excerpt}. ${tour.distanceKm} км, ${difficultyLabel(tour.difficulty).toLowerCase()} сложность, выезд в ${tour.dates[0]?.departAt ?? '6:00'}. В стоимость входят транспорт, гиды и входные билеты.`,
  ogType: 'article',
  ogImage: tour.cover,
})

/* Разметка маршрута: сам тур, цена и каждая дата отдельным событием.
   Из этого собирается расширенный сниппет с ценой и ближайшей датой. */
useSchemaOrg([
  defineProduct({
    name: tour.title,
    description: tour.excerpt,
    image: tour.gallery,
    offers: tour.dates
      .filter(d => d.status !== 'sold')
      .map(d => ({
        price: d.price,
        priceCurrency: 'UZS',
        availability: 'https://schema.org/InStock',
        validFrom: d.date,
        url: `/tours/${tour.slug}`,
      })),
  }),
  ...tour.dates.map(d => defineEvent({
    // без своего id все выезды схлопываются в один узел
    '@id': `#event-${d.id}`,
    name: `${tour.title} — выезд ${d.date}`,
    startDate: `${d.date}T${d.departAt.padStart(5, '0')}:00`,
    endDate: `${d.date}T${d.returnAt.padStart(5, '0')}:00`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: destination?.name ?? tour.title,
      address: { '@type': 'PostalAddress', addressLocality: 'Ташкентская область', addressCountry: 'UZ' },
    },
    offers: {
      '@type': 'Offer',
      price: d.price,
      priceCurrency: 'UZS',
      availability: d.status === 'sold'
        ? 'https://schema.org/SoldOut'
        : 'https://schema.org/InStock',
    },
  })),
])
</script>

<template>
  <div class="container-site">
    <UiBreadcrumbs
      :items="[
        { label: 'Туры', to: '/tours' },
        ...(destination ? [{ label: destination.name, to: `/napravleniya/${destination.slug}` }] : []),
        { label: tour.title },
      ]"
    />

    <TourGallery :tour="tour" />

    <header class="thead">
      <h1>{{ tour.title }}</h1>
      <p class="thead__sub">{{ tour.description[0] }}</p>
    </header>

    <ul class="tfacts">
      <li v-for="f in facts" :key="f.label" class="tfact">
        <span>{{ f.label }}</span>
        <b>{{ f.value }}</b>
      </li>
    </ul>

    <div class="tlay">
      <main>
        <section v-reveal class="reveal tsec">
          <h2>О маршруте</h2>
          <p v-for="(p, i) in tour.description" :key="i">{{ p }}</p>
        </section>

        <section v-reveal class="reveal tsec">
          <h2>Маршрут и профиль высот</h2>
          <TourRouteMap :tour="tour" />
        </section>

        <section v-reveal class="reveal tsec">
          <h2>Что входит в стоимость</h2>
          <div class="incl">
            <div class="incl__col">
              <h3>
                <span class="incl__ico incl__ico--yes" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 8.4l2.4 2.4L12 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </span>
                Включено
              </h3>
              <ul>
                <li v-for="x in tour.included" :key="x">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 8.4l2.4 2.4L12 5" style="stroke: var(--color-easy)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  {{ x }}
                </li>
              </ul>
            </div>

            <div class="incl__col incl__col--no">
              <h3>
                <span class="incl__ico incl__ico--no" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" /></svg>
                </span>
                Не включено
              </h3>
              <ul>
                <li v-for="x in tour.excluded" :key="x">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5 5l6 6M11 5l-6 6" style="stroke: var(--color-line)" stroke-width="2" stroke-linecap="round" /></svg>
                  {{ x }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section v-reveal class="reveal tsec">
          <h2>Что взять с собой</h2>
          <ul class="pack">
            <li v-for="p in tour.packing" :key="p.label">
              <em aria-hidden="true">{{ p.icon }}</em>{{ p.label }}
            </li>
          </ul>
        </section>

        <section v-reveal class="reveal tsec">
          <h2>Программа по часам</h2>
          <TourProgram :steps="tour.program" />
        </section>

        <section v-if="guides.length" v-reveal class="reveal tsec">
          <h2>Гиды этого выезда</h2>
          <div class="tguides">
            <NuxtLink v-for="g in guides" :key="g.slug" :to="`/guides/${g.slug}`" class="tguide">
              <span class="tguide__ph"><img :src="asset(g.photo)" :alt="g.name" loading="lazy"></span>
              <span>
                <b>{{ g.name }}</b>
                <small>{{ g.role }} · {{ g.experience }}</small>
              </span>
            </NuxtLink>
          </div>
        </section>

        <section v-reveal class="reveal tsec">
          <h2>Ближайшие даты</h2>
          <TourDates :tour="tour" @book="booking = true" />
        </section>

        <section v-reveal class="reveal tsec">
          <h2>Похожие туры</h2>
          <div class="similar">
            <TourCard v-for="t in similar" :key="t.id" :tour="t" />
          </div>
        </section>
      </main>

      <TourBooking :tour="tour" class="tlay__side" />
    </div>

    <!-- запись с кнопок в списке дат -->
    <UiModal v-model:open="booking" :title="`Запись: ${tour.title}`">
      <FormLead :tour-slug="tour.slug" :interest="tour.title" :with-interest="false" with-people compact />
    </UiModal>

    <div class="tbar">
      <span class="tbar__p">
        <b>{{ price(tour.priceFrom) }} сум</b>
        <small>{{ tour.distanceKm }} км · {{ difficultyLabel(tour.difficulty).toLowerCase() }}</small>
      </span>
      <UiButton variant="cta" @click="booking = true">Записаться</UiButton>
    </div>
  </div>
</template>

<style scoped>
.thead { padding: clamp(28px, 4vw, 44px) 0 clamp(22px, 3vw, 32px); }
.thead h1 { font-size: clamp(30px, 4.4vw, 52px); max-width: 18ch; }
.thead__sub { margin-top: 16px; max-width: 62ch; font-size: clamp(15px, 1.7vw, 18px); color: var(--color-muted); }

.tfacts {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1px;
  background: var(--color-line);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  overflow: hidden;
  list-style: none;
}
.tfact { background: var(--color-surface); padding: 18px 16px; }
.tfact span { display: block; font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--color-muted); margin-bottom: 7px; }
.tfact b { font-family: var(--font-display); font-size: 17px; font-weight: 600; letter-spacing: -.01em; }

.tlay {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 372px;
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
  padding: clamp(32px, 4vw, 52px) 0 clamp(48px, 7vw, 96px);
}
.tlay__side { position: sticky; top: 100px; }

.tsec { padding-bottom: clamp(36px, 5vw, 56px); }
.tsec h2 { font-size: clamp(22px, 2.6vw, 30px); margin-bottom: 20px; }
.tsec p { color: var(--color-body); line-height: 1.7; max-width: 66ch; }
.tsec p + p { margin-top: 14px; }

.incl { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.incl__col { border: 1px solid var(--color-line); border-radius: var(--radius-card); padding: 22px; }
.incl__col h3 { font-size: 16px; margin-bottom: 16px; display: flex; align-items: center; gap: 9px; }
.incl__col ul { list-style: none; }
.incl__col li { display: flex; gap: 11px; padding: 9px 0; font-size: 14.5px; line-height: 1.45; }
.incl__col li svg { flex: none; margin-top: 3px; }
.incl__col--no li { color: var(--color-muted); }
.incl__ico { width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; }
.incl__ico--yes { background: color-mix(in srgb, var(--color-easy) 16%, transparent); color: var(--color-easy); }
.incl__ico--no { background: color-mix(in srgb, var(--color-hard) 14%, transparent); color: var(--color-hard); }

.pack { display: flex; flex-wrap: wrap; gap: 10px; list-style: none; }
.pack li {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 11px 17px; border-radius: 999px;
  border: 1px solid var(--color-line); background: var(--color-surface);
  font-size: 14.5px; font-weight: 600;
}
.pack em { font-style: normal; font-size: 16px; }

.tguides { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.tguide { display: flex; align-items: center; gap: 16px; padding: 16px; border: 1px solid var(--color-line); border-radius: var(--radius-card); transition: .22s; }
.tguide:hover { border-color: var(--color-primary); transform: translateY(-2px); }
.tguide__ph { width: 68px; height: 68px; border-radius: 50%; overflow: hidden; flex: none; }
.tguide__ph img { width: 100%; height: 100%; object-fit: cover; }
.tguide b { display: block; font-family: var(--font-display); font-size: 16px; font-weight: 600; }
.tguide small { font-size: 13.5px; color: var(--color-muted); }

.similar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

.tbar {
  position: fixed;
  z-index: 95;
  left: 0; right: 0; bottom: 0;
  display: none;
  align-items: center;
  gap: 14px;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  background: color-mix(in srgb, var(--color-surface) 97%, transparent);
  backdrop-filter: blur(14px);
  border-top: 1px solid var(--color-line);
}
.tbar__p { flex: 1; }
.tbar__p b { display: block; font-family: var(--font-display); font-size: 19px; font-weight: 600; }
.tbar__p small { font-size: 12.5px; color: var(--color-muted); }

@media (max-width: 1100px) {
  .tlay { grid-template-columns: 1fr; }
  .tlay__side { display: none; }
  .tfacts { grid-template-columns: repeat(3, 1fr); }
  .similar { grid-template-columns: repeat(2, 1fr); }
  .tbar { display: flex; }
}
@media (max-width: 640px) {
  .tfacts { grid-template-columns: repeat(2, 1fr); }
  .incl { grid-template-columns: 1fr; }
  .tguides, .similar { grid-template-columns: 1fr; }
}
</style>
