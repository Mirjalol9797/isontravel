<script setup lang="ts">
const { allTours } = useCatalog()

/** Галерея собирается из фотографий туров — отдельного источника не нужно */
const shots = allTours().flatMap(t =>
  t.gallery.map(src => ({ src, tour: t.title, slug: t.slug })),
)

const filter = ref('')
const tours = [...new Set(shots.map(s => s.tour))]

const shown = computed(() => filter.value ? shots.filter(s => s.tour === filter.value) : shots)

const lightbox = ref(false)
const startAt = ref(0)
const open = (i: number) => { startAt.value = i; lightbox.value = true }

useSeoMeta({
  title: 'Фотографии с маршрутов — Ison Travel',
  description: 'Как проходят наши походы: горы, озёра, пещеры и люди. Фотографии с выездов вокруг Ташкента.',
})
</script>

<template>
  <div class="container-site gal">
    <UiBreadcrumbs :items="[{ label: 'Галерея' }]" />

    <UiSectionTitle
      as="h1"
      eyebrow="Галерея"
      title="Как это выглядит"
      text="Снимки с наших выездов. Фотограф ездит с группой, снимки получают все участники."
      class="gal__head"
    />

    <div class="gal__filters">
      <button :class="{ 'is-on': !filter }" @click="filter = ''">Все</button>
      <button v-for="t in tours" :key="t" :class="{ 'is-on': filter === t }" @click="filter = t">{{ t }}</button>
    </div>

    <div class="masonry">
      <button
        v-for="(s, i) in shown"
        :key="s.src + i"
        class="tile"
        :aria-label="`Открыть фото: ${s.tour}`"
        @click="open(i)"
      >
        <img :src="asset(s.src)" :alt="s.tour" loading="lazy" decoding="async">
        <span class="tile__cap">{{ s.tour }}</span>
      </button>
    </div>

    <UiLightbox
      v-model:open="lightbox"
      :images="shown.map(s => s.src)"
      :alt="filter || 'Фото с маршрута'"
      :start="startAt"
    />
  </div>
</template>

<style scoped>
.gal { padding-bottom: clamp(48px, 7vw, 96px); }
.gal__head { margin: 8px 0 clamp(24px, 3vw, 36px); }

.gal__filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
.gal__filters button {
  padding: 9px 16px;
  border-radius: 999px;
  border: 1px solid var(--color-line);
  background: var(--color-surface);
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: inherit;
  transition: .2s;
}
.gal__filters button:hover { border-color: var(--color-primary); }
.gal__filters button.is-on { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-on-primary); }

.masonry { columns: 4; column-gap: 16px; }
.tile {
  position: relative;
  display: block;
  width: 100%;
  margin: 0 0 16px;
  padding: 0;
  border: 0;
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--color-line);
  cursor: zoom-in;
  break-inside: avoid;
}
.tile img { width: 100%; height: auto; display: block; transition: transform .5s cubic-bezier(.22, 1, .36, 1); }
.tile:hover img { transform: scale(1.05); }
.tile__cap {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  padding: 26px 14px 12px;
  background: linear-gradient(transparent, rgb(var(--overlay-rgb) / .85));
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
  opacity: 0;
  transition: opacity .25s ease;
}
.tile:hover .tile__cap, .tile:focus-visible .tile__cap { opacity: 1; }

@media (max-width: 1100px) { .masonry { columns: 3; } }
@media (max-width: 760px) { .masonry { columns: 2; } }
@media (max-width: 460px) { .masonry { columns: 1; } }
</style>
