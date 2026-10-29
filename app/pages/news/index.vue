<script setup lang="ts">
const { byCategory, categoryLabel } = useNews()
const { dayMonth } = useFormat()

const active = ref('')
const posts = computed(() => byCategory(active.value))

useSeoMeta({
  title: 'Новости и анонсы выездов — Ison Travel',
  description: 'Анонсы ближайших походов, отчёты с маршрутов и полезное для тех, кто собирается в горы вокруг Ташкента.',
})
</script>

<template>
  <div class="container-site news">
    <UiBreadcrumbs :items="[{ label: 'Новости' }]" />

    <div class="news__top">
      <UiSectionTitle
        as="h1"
        eyebrow="Новости"
        title="Анонсы, отчёты и полезное"
        text="То же, что в нашем Telegram-канале, только с поиском и навсегда."
      />
      <a :href="CONTACTS.telegram" target="_blank" rel="noopener" class="link-arrow">
        Читать в Telegram
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    </div>

    <div class="news__filters">
      <button :class="{ 'is-on': !active }" @click="active = ''">Всё</button>
      <button v-for="c in CATEGORIES" :key="c.key" :class="{ 'is-on': active === c.key }" @click="active = c.key">
        {{ c.label }}
      </button>
    </div>

    <div class="news__grid">
      <NuxtLink v-for="(p, i) in posts" :key="p.id" v-reveal="i" :to="`/news/${p.slug}`" class="reveal npost">
        <UiPhoto :src="p.cover" :alt="p.title" ratio="16 / 10" class="npost__media" />
        <div class="npost__body">
          <p class="npost__meta">
            <span class="npost__cat">{{ categoryLabel(p.category) }}</span>
            <span>{{ dayMonth(p.date) }}</span>
            <span>{{ p.views }} просмотров</span>
          </p>
          <h2>{{ p.title }}</h2>
          <p class="npost__ex">{{ p.excerpt }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.news { padding-bottom: clamp(48px, 7vw, 96px); }
.news__top { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin: 8px 0 24px; }

.news__filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 28px; }
.news__filters button {
  padding: 9px 16px; border-radius: 999px;
  border: 1px solid var(--color-line); background: var(--color-surface);
  font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; color: inherit; transition: .2s;
}
.news__filters button:hover { border-color: var(--color-primary); }
.news__filters button.is-on { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-on-primary); }

.news__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.npost { display: flex; flex-direction: column; border-radius: var(--radius-card); overflow: hidden; background: var(--color-surface); border: 1px solid var(--color-line); transition: transform .25s ease, box-shadow .25s ease; }
.npost:hover { transform: translateY(-5px); box-shadow: var(--shadow-card); }
.npost__media :deep(img) { transition: transform .5s cubic-bezier(.22, 1, .36, 1); }
.npost:hover .npost__media :deep(img) { transform: scale(1.05); }
.npost__body { padding: 20px; }
.npost__meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 12.5px; color: var(--color-muted); margin-bottom: 10px; align-items: center; }
.npost__cat { padding: 4px 10px; border-radius: 999px; background: var(--color-accent-soft); color: var(--color-accent-dark); font-weight: 700; }
.npost h2 { font-size: 18px; margin-bottom: 10px; }
.npost__ex { font-size: 14.5px; color: var(--color-muted); line-height: 1.55; }

@media (max-width: 1100px) { .news__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 700px) {
  .news__grid { grid-template-columns: 1fr; }
  .news__top { flex-direction: column; align-items: flex-start; }
}
</style>
