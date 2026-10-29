<script setup lang="ts">
const { result, active, clear } = useTourFilters()
const { plural } = useFormat()
const route = useRoute()

/** В title уходит выбранное направление — так страница фильтра не дублирует общий каталог */
const { allDestinations } = useCatalog()
const picked = computed(() =>
  allDestinations().find(d => d.slug === route.query.destination),
)

useSeoMeta({
  title: () => picked.value
    ? `${picked.value.title} — расписание и цены | Ison Travel`
    : 'Туры и походы из Ташкента — каталог с ценами | Ison Travel',
  description: () => picked.value
    ? `${picked.value.tagline}. Ближайшие выезды, цены и программа маршрутов.`
    : 'Все походы и треккинги из Ташкента: однодневные и с ночёвкой, от лёгких до сложных. Даты выездов, цены, что входит в стоимость.',
  // Комбинации фильтров в индекс не пускаем: это дубли каталога
  robots: () => (Object.keys(route.query).length ? 'noindex, follow' : 'index, follow'),
})
</script>

<template>
  <div class="container-site catalog">
    <UiBreadcrumbs :items="[{ label: 'Туры' }]" />

    <header class="catalog__head">
      <UiSectionTitle
        as="h1"
        eyebrow="Каталог"
        :title="picked ? picked.title : 'Все туры из Ташкента'"
        :text="picked ? picked.tagline : 'Однодневные походы и маршруты с ночёвкой. Группы 10–20 человек, выезды каждые выходные.'"
      />
    </header>

    <TourFilters />

    <div v-if="active.length" class="chips">
      <button v-for="c in active" :key="c.key" class="chip-off" @click="clear(c.key)">
        {{ c.label }}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </button>
      <button class="chip-clear" @click="clear()">Сбросить всё</button>
    </div>

    <p class="count">
      {{ result.length }} {{ plural(result.length, ['тур', 'тура', 'туров']) }}
    </p>

    <div v-if="result.length" class="grid">
      <TourCard v-for="(t, i) in result" :key="t.id" v-reveal="i % 4" class="reveal" :tour="t" />
    </div>

    <div v-else class="empty">
      <h2>Под такие условия туров нет</h2>
      <p>Попробуйте снять часть фильтров — маршруты добавляются каждую неделю.</p>
      <UiButton variant="cta" @click="clear()">Показать все туры</UiButton>
    </div>
  </div>
</template>

<style scoped>
.catalog { padding-bottom: clamp(48px, 7vw, 96px); }
.catalog__head { margin: 8px 0 clamp(24px, 3vw, 36px); }

.chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.chip-off {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 14px; border-radius: 999px;
  border: 0; background: var(--color-primary); color: var(--color-on-primary);
  font-size: 13.5px; font-weight: 700; cursor: pointer;
}
.chip-off:hover { background: var(--color-primary-deep); }
.chip-clear {
  padding: 8px 14px; border: 0; background: none;
  font-size: 13.5px; font-weight: 700; color: var(--color-muted);
  cursor: pointer; text-decoration: underline;
}

.count { margin: 22px 0 18px; font-size: 14px; color: var(--color-muted); }

.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

.empty { text-align: center; padding: clamp(48px, 9vw, 110px) 0; display: grid; justify-items: center; gap: 14px; }
.empty h2 { font-size: clamp(22px, 3vw, 30px); }
.empty p { color: var(--color-muted); max-width: 46ch; }
.empty :deep(.btn) { margin-top: 8px; }

@media (max-width: 1100px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }
</style>
