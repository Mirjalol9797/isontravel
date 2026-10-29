<script setup lang="ts">
const route = useRoute()
const { guideBySlug, allTours, allGuides } = useCatalog()

const guide = guideBySlug(String(route.params.slug))
if (!guide) throw createError({ statusCode: 404, statusMessage: 'Гид не найден', fatal: true })

const tours = allTours().filter(t => t.guideSlugs.includes(guide.slug))
const team = allGuides().filter(g => g.slug !== guide.slug)

useSeoMeta({
  title: `${guide.name} — гид Ison Travel, Ташкент`,
  description: `${guide.name}: ${guide.role.toLowerCase()}, ${guide.experience.toLowerCase()}. Маршруты: ${guide.directions.join(', ')}.`,
  ogImage: guide.photo,
})

useSchemaOrg([
  definePerson({
    name: guide.name,
    jobTitle: guide.role,
    description: guide.experience,
    image: guide.photo,
    worksFor: { '@type': 'Organization', name: 'Ison Travel' },
  }),
])
</script>

<template>
  <div class="container-site guide">
    <UiBreadcrumbs :items="[{ label: 'О нас', to: '/about' }, { label: guide.name }]" />

    <section class="ghero">
      <UiPhoto :src="guide.photo" :alt="guide.name" ratio="3 / 4" class="ghero__photo" eager />

      <div class="ghero__text">
        <span class="eyebrow">{{ guide.role }}</span>
        <h1>{{ guide.name }}</h1>
        <p class="ghero__exp">{{ guide.experience }}</p>

        <ul class="ghero__dirs">
          <li v-for="d in guide.directions" :key="d">{{ d }}</li>
        </ul>

        <p class="ghero__about">
          Водит группы по маршрутам вокруг Ташкента. Держит темп по самому медленному участнику
          и считает, что хороший поход — тот, с которого все вернулись довольными, а не тот,
          где поставили рекорд.
        </p>

        <UiButton to="/schedule" variant="cta">Пойти с {{ guide.name }}</UiButton>
      </div>
    </section>

    <section v-if="tours.length" v-reveal class="reveal gsec">
      <h2>Маршруты {{ guide.name }}</h2>
      <div class="gtours">
        <TourCard v-for="t in tours" :key="t.id" :tour="t" />
      </div>
    </section>

    <section v-reveal class="reveal gsec gsec--last">
      <h2>Остальная команда</h2>
      <div class="gteam">
        <NuxtLink v-for="g in team" :key="g.slug" :to="`/guides/${g.slug}`" class="gmini">
          <span class="gmini__ph"><img :src="asset(g.photo)" :alt="g.name" loading="lazy"></span>
          <span>
            <b>{{ g.name }}</b>
            <small>{{ g.experience }}</small>
          </span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.guide { padding-bottom: clamp(48px, 7vw, 96px); }

.ghero { display: grid; grid-template-columns: 340px 1fr; gap: clamp(28px, 5vw, 56px); align-items: center; margin: 8px 0 clamp(36px, 5vw, 56px); }
.ghero__photo { border-radius: var(--radius-xl2); }
.ghero h1 { font-size: clamp(32px, 5vw, 56px); margin-top: 14px; }
.ghero__exp { margin-top: 12px; font-size: clamp(16px, 1.8vw, 20px); color: var(--color-muted); }

.ghero__dirs { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; list-style: none; }
.ghero__dirs li { padding: 8px 15px; border-radius: 999px; background: var(--color-accent-soft); color: var(--color-accent-dark); font-size: 13.5px; font-weight: 700; }

.ghero__about { margin: 22px 0 26px; color: var(--color-body); line-height: 1.7; max-width: 56ch; }

.gsec { padding-top: clamp(36px, 5vw, 64px); }
.gsec--last { padding-bottom: 0; }
.gsec h2 { font-size: clamp(22px, 2.6vw, 30px); margin-bottom: 20px; }

.gtours { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

.gteam { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.gmini { display: flex; align-items: center; gap: 14px; padding: 14px; border: 1px solid var(--color-line); border-radius: var(--radius-card); transition: .22s; }
.gmini:hover { border-color: var(--color-primary); transform: translateY(-2px); }
.gmini__ph { width: 56px; height: 56px; border-radius: 50%; overflow: hidden; flex: none; }
.gmini__ph img { width: 100%; height: 100%; object-fit: cover; }
.gmini b { display: block; font-family: var(--font-display); font-size: 15.5px; font-weight: 600; }
.gmini small { font-size: 13px; color: var(--color-muted); }

@media (max-width: 1100px) {
  .ghero { grid-template-columns: 240px 1fr; }
  .gtours { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .ghero { grid-template-columns: 1fr; }
  .ghero__photo { max-width: 260px; }
  .gtours, .gteam { grid-template-columns: 1fr; }
}
</style>
