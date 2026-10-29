<script setup lang="ts">
import newsRaw from '~/data/news.json'
import type { NewsPost } from '~/types'

const { dayMonth } = useFormat()
const posts = (newsRaw as NewsPost[]).slice(0, 3)
</script>

<template>
  <section class="section-tight">
    <div class="container-site">
      <div v-reveal class="reveal sec-head">
        <UiSectionTitle
          eyebrow="Новости"
          title="Пишем в Telegram — появляется здесь"
          text="Лента подтягивается с канала, отдельно вести сайт не нужно."
        />
        <a :href="CONTACTS.telegram" target="_blank" rel="noopener" class="link-arrow">
          Подписаться на канал
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>

      <div class="news">
        <NuxtLink
          v-for="(p, i) in posts"
          :key="p.id"
          v-reveal="i"
          :to="`/news/${p.slug}`"
          class="reveal npost"
        >
          <UiPhoto :src="p.cover" :alt="p.title" ratio="16 / 10" class="npost__media" />
          <div class="npost__body">
            <p class="npost__meta">
              <span>{{ dayMonth(p.date) }}</span>
              <span>{{ p.views }} просмотров</span>
            </p>
            <h3>{{ p.title }}</h3>
            <p class="npost__ex">{{ p.excerpt }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.npost { display: flex; flex-direction: column; border-radius: var(--radius-card); overflow: hidden; background: var(--color-surface); border: 1px solid var(--color-line); transition: transform .25s ease, box-shadow .25s ease; }
.npost:hover { transform: translateY(-5px); box-shadow: var(--shadow-card); }
.npost__media :deep(img) { transition: transform .5s cubic-bezier(.22, 1, .36, 1); }
.npost:hover .npost__media :deep(img) { transform: scale(1.05); }
.npost__body { padding: 20px; }
.npost__meta { display: flex; gap: 14px; font-size: 12.5px; color: var(--color-muted); margin-bottom: 10px; }
.npost h3 { font-size: 18px; margin-bottom: 10px; }
.npost__ex { font-size: 14.5px; color: var(--color-muted); line-height: 1.55; }

@media (max-width: 1100px) { .news { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 700px) { .news { grid-template-columns: 1fr; } }
</style>
