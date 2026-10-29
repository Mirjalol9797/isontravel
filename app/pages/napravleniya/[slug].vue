<script setup lang="ts">
const route = useRoute()
const { destinationBySlug, toursByDestination, allDestinations } = useCatalog()

const dest = destinationBySlug(String(route.params.slug))
if (!dest) throw createError({ statusCode: 404, statusMessage: 'Направление не найдено', fatal: true })

const tours = toursByDestination(dest.slug)
const others = allDestinations().filter(d => d.slug !== dest.slug).slice(0, 4)

const seasons = Object.keys(dest.seasonText)
const season = ref(seasons[0]!)

useSeoMeta({
  title: `${dest.title} — расписание, цены, маршруты | Ison Travel`,
  description: `${dest.tagline}. ${dest.howToGet} Ближайшие выезды, программа маршрутов и что входит в стоимость.`,
  ogImage: dest.cover,
})

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
    name: dest.title,
    description: dest.tagline,
  }),
  definePlace({
    '@type': 'TouristAttraction',
    name: dest.name,
    description: dest.intro[0],
    image: dest.cover,
    address: { '@type': 'PostalAddress', addressLocality: 'Ташкентская область', addressCountry: 'UZ' },
  }),
])
</script>

<template>
  <div>
    <section class="dhero">
      <div class="dhero__media ph">
        <img :src="asset(dest.cover)" :alt="dest.name" fetchpriority="high">
      </div>
      <div class="container-site dhero__inner">
        <UiBreadcrumbs
          class="dhero__crumbs"
          :items="[{ label: 'Туры', to: '/tours' }, { label: dest.name }]"
        />
        <h1>{{ dest.title }}</h1>
        <p class="dhero__sub">{{ dest.tagline }}</p>
        <ul class="dhero__facts">
          <li>{{ dest.toursCount }} маршрутов</li>
          <li>{{ dest.seasons }}</li>
          <li>{{ dest.howToGet.split(',')[0] }}</li>
        </ul>
      </div>
    </section>

    <div class="container-site">
      <div class="dlay">
        <main>
          <section v-reveal class="reveal dsec">
            <h2>О месте</h2>
            <p v-for="(p, i) in dest.intro" :key="i">{{ p }}</p>
          </section>

          <section v-reveal class="reveal dsec">
            <h2>Что посмотреть</h2>
            <ul class="points">
              <li v-for="(p, i) in dest.points" :key="p.title">
                <span class="points__n">{{ i + 1 }}</span>
                <span>
                  <b>{{ p.title }}</b>
                  <small>{{ p.text }}</small>
                </span>
              </li>
            </ul>
          </section>

          <section v-reveal class="reveal dsec">
            <h2>Когда лучше ехать</h2>
            <div class="seasons">
              <div class="seasons__tabs" role="tablist">
                <button
                  v-for="s in seasons"
                  :key="s"
                  role="tab"
                  :aria-selected="season === s"
                  :class="{ 'is-on': season === s }"
                  @click="season = s"
                >{{ s }}</button>
              </div>
              <p class="seasons__text">{{ dest.seasonText[season] }}</p>
            </div>
          </section>

          <section v-reveal class="reveal dsec">
            <h2>Как добраться</h2>
            <p>{{ dest.howToGet }} Транспорт входит в стоимость всех наших туров — забираем от точки сбора в городе и привозим обратно.</p>
          </section>
        </main>

        <aside class="dlay__side">
          <div class="dcta">
            <h2>Поехать с нами</h2>
            <p>Оставьте номер — подберём маршрут по вашему уровню и расскажем про ближайшие даты.</p>
            <FormLead :interest="dest.name" :with-interest="false" compact submit-label="Подобрать маршрут" />
          </div>
        </aside>
      </div>

      <section v-if="tours.length" v-reveal class="reveal dsec">
        <h2>Туры в это направление</h2>
        <div class="dtours">
          <TourCard v-for="t in tours" :key="t.id" :tour="t" />
        </div>
      </section>

      <section v-reveal class="reveal dsec dsec--last">
        <h2>Другие направления</h2>
        <div class="dother">
          <NuxtLink v-for="d in others" :key="d.slug" :to="`/napravleniya/${d.slug}`" class="dothertile">
            <img :src="asset(d.cover)" :alt="d.name" loading="lazy">
            <span>
              <b>{{ d.name }}</b>
              <small>{{ d.toursCount }} маршрутов</small>
            </span>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dhero { position: relative; min-height: clamp(360px, 52vh, 560px); display: flex; align-items: flex-end; padding-bottom: clamp(32px, 5vw, 56px); overflow: hidden; }
.dhero__media { position: absolute; inset: 0; aspect-ratio: auto; }
.dhero__media::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(180deg, rgb(var(--overlay-rgb) / .72) 0%, rgb(var(--overlay-rgb) / .25) 45%, rgb(var(--overlay-rgb) / .9) 100%);
}
.dhero__inner { position: relative; z-index: 3; color: #fff; padding-top: 96px; }
.dhero__crumbs :deep(ol) { color: rgb(255 255 255 / .7); }
.dhero__crumbs :deep([aria-current='page']) { color: #fff; }
.dhero h1 { font-size: clamp(30px, 5vw, 60px); max-width: 16ch; }
.dhero__sub { margin-top: 14px; font-size: clamp(16px, 1.8vw, 20px); color: rgb(255 255 255 / .85); }
.dhero__facts { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; list-style: none; }
.dhero__facts li { padding: 8px 15px; border-radius: 999px; background: rgb(255 255 255 / .14); backdrop-filter: blur(6px); font-size: 13.5px; font-weight: 600; }

.dlay { display: grid; grid-template-columns: minmax(0, 1fr) 372px; gap: clamp(32px, 5vw, 72px); align-items: start; padding-top: clamp(32px, 4vw, 52px); }
.dlay__side { position: sticky; top: 100px; }

.dsec { padding-bottom: clamp(36px, 5vw, 56px); }
.dsec--last { padding-bottom: clamp(48px, 7vw, 96px); }
.dsec h2 { font-size: clamp(22px, 2.6vw, 30px); margin-bottom: 20px; }
.dsec p { color: var(--color-body); line-height: 1.7; max-width: 66ch; }
.dsec p + p { margin-top: 14px; }

.points { list-style: none; display: grid; gap: 14px; }
.points li { display: flex; gap: 14px; padding: 18px; border: 1px solid var(--color-line); border-radius: var(--radius-card); background: var(--color-surface); }
.points__n { flex: none; width: 30px; height: 30px; border-radius: 50%; background: var(--color-accent-soft); color: var(--color-accent-dark); font-family: var(--font-display); font-weight: 600; font-size: 14px; display: grid; place-items: center; }
.points b { display: block; font-family: var(--font-display); font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.points small { font-size: 14.5px; color: var(--color-muted); }

.seasons__tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.seasons__tabs button { padding: 10px 18px; border-radius: 999px; border: 1px solid var(--color-line); background: var(--color-surface); font: inherit; font-size: 14.5px; font-weight: 600; cursor: pointer; color: inherit; transition: .2s; }
.seasons__tabs button.is-on { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-on-primary); }
.seasons__text { font-size: 16px; }

.dcta { padding: 26px; border-radius: var(--radius-xl2); background: var(--color-accent-soft); }
.dcta h2 { font-size: 22px; margin-bottom: 10px; }
.dcta p { font-size: 14.5px; color: var(--color-body); margin-bottom: 18px; }

.dtours { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

.dother { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.dothertile { position: relative; height: 150px; border-radius: var(--radius-card); overflow: hidden; display: flex; align-items: flex-end; padding: 16px; color: #fff; }
.dothertile img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; transition: transform .5s cubic-bezier(.22, 1, .36, 1); }
.dothertile:hover img { transform: scale(1.06); }
.dothertile::before { content: ''; position: absolute; inset: 0; z-index: 2; background: linear-gradient(180deg, transparent 40%, rgb(var(--overlay-rgb) / .88) 100%); }
.dothertile > span { position: relative; z-index: 3; }
.dothertile b { display: block; font-family: var(--font-display); font-size: 17px; font-weight: 600; }
.dothertile small { font-size: 12.5px; color: rgb(255 255 255 / .75); }

@media (max-width: 1100px) {
  .dlay { grid-template-columns: 1fr; }
  .dlay__side { position: static; }
  .dtours { grid-template-columns: repeat(2, 1fr); }
  .dother { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .dtours { grid-template-columns: 1fr; }
}
</style>
