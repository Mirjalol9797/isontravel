<script setup lang="ts">
const { allReviews } = useCatalog()
const reviews = allReviews()

const average = computed(() =>
  (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
)

const sent = ref(false)
const form = reactive({ name: '', tour: '', text: '' })
const submit = () => { if (form.name && form.text) sent.value = true }

useSeoMeta({
  title: 'Отзывы участников походов — Ison Travel',
  description: `Что пишут люди после наших выездов. Средняя оценка ${average.value} из 5.`,
})

useSchemaOrg([
  defineLocalBusiness({
    name: 'Ison Travel',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: average.value,
      reviewCount: reviews.length,
      bestRating: 5,
    },
    review: reviews.map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
    })),
  }),
])
</script>

<template>
  <div class="container-site rev">
    <UiBreadcrumbs :items="[{ label: 'Отзывы' }]" />

    <div class="rev__top">
      <UiSectionTitle
        as="h1"
        eyebrow="Отзывы"
        title="Что говорят участники"
        text="Собираем после каждого выезда. Ничего не редактируем — иначе смысла нет."
      />
      <div class="rating">
        <b>{{ average }}</b>
        <span class="stars" aria-hidden="true">★★★★★</span>
        <small>{{ reviews.length }} отзывов</small>
      </div>
    </div>

    <div class="rev__grid">
      <article v-for="(r, i) in reviews" :key="r.id" v-reveal="i" class="reveal card">
        <p class="stars" :aria-label="`Оценка ${r.rating} из 5`">
          <span v-for="n in r.rating" :key="n" aria-hidden="true">★</span>
        </p>
        <blockquote>{{ r.text }}</blockquote>
        <footer>
          <span class="ava" aria-hidden="true">{{ r.initials }}</span>
          <span>
            <b>{{ r.author }}</b>
            <small>{{ r.tourTitle }} · {{ r.when }}</small>
          </span>
        </footer>
      </article>
    </div>

    <section v-reveal class="reveal rev__form">
      <div>
        <span class="eyebrow">Ваш опыт</span>
        <h2>Оставьте отзыв</h2>
        <p>Ходили с нами? Напишите пару строк — это помогает тем, кто ещё решается.</p>
      </div>

      <form v-if="!sent" novalidate @submit.prevent="submit">
        <div class="row">
          <UiField v-model="form.name" label="Как вас зовут" placeholder="Имя" />
          <UiField v-model="form.tour" label="Какой тур" placeholder="Например, Чимган" />
        </div>
        <div class="row row--mt">
          <UiField v-model="form.text" label="Отзыв" placeholder="Что понравилось, что стоит улучшить" />
        </div>
        <UiButton type="submit" variant="cta" block class="row--mt">Отправить отзыв</UiButton>
      </form>

      <p v-else class="done" role="status">
        Спасибо! Отзыв ушёл на модерацию — опубликуем в ближайшие дни.
      </p>
    </section>
  </div>
</template>

<style scoped>
.rev { padding-bottom: clamp(48px, 7vw, 96px); }
.rev__top { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin: 8px 0 clamp(28px, 4vw, 40px); }

.rating { text-align: center; flex: none; padding: 18px 26px; border-radius: var(--radius-card); background: var(--color-surface); border: 1px solid var(--color-line); }
.rating b { display: block; font-family: var(--font-display); font-size: 36px; font-weight: 600; line-height: 1; }
.rating small { display: block; margin-top: 4px; font-size: 13px; color: var(--color-muted); }

.stars { color: var(--color-medium); letter-spacing: 2px; }

.rev__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.card { background: var(--color-surface); border: 1px solid var(--color-line); border-radius: var(--radius-card); padding: 26px; display: flex; flex-direction: column; }
.card .stars { margin-bottom: 16px; display: flex; gap: 3px; }
.card blockquote { flex: 1; margin: 0; font-size: 15px; line-height: 1.65; color: var(--color-body); }
.card footer { display: flex; align-items: center; gap: 12px; margin-top: 22px; padding-top: 20px; border-top: 1px solid var(--color-line); }
.ava { width: 44px; height: 44px; border-radius: 50%; flex: none; background: var(--color-primary); color: var(--color-on-primary); display: grid; place-items: center; font-weight: 700; font-size: 15px; }
.card b { display: block; font-size: 14.5px; }
.card small { font-size: 13px; color: var(--color-muted); }

.rev__form {
  margin-top: clamp(44px, 6vw, 72px);
  padding: clamp(28px, 4vw, 48px);
  border-radius: var(--radius-xl2);
  background: var(--color-accent-soft);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(28px, 4vw, 56px);
  align-items: center;
}
.rev__form h2 { margin-top: 14px; font-size: clamp(22px, 2.8vw, 30px); }
.rev__form > div p { margin-top: 12px; color: var(--color-body); }
.row { display: flex; gap: 12px; flex-wrap: wrap; }
.row--mt { margin-top: 14px; }
.done { font-size: 16px; font-weight: 600; color: var(--color-primary); }

@media (max-width: 1100px) { .rev__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 760px) {
  .rev__grid { grid-template-columns: 1fr; }
  .rev__top { flex-direction: column; align-items: flex-start; }
  .rev__form { grid-template-columns: 1fr; }
}
</style>
