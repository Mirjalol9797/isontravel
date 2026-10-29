<script setup lang="ts">
const { allReviews } = useCatalog()
const reviews = allReviews()
</script>

<template>
  <section class="section-tight">
    <div class="container-site">
      <div v-reveal class="reveal sec-head">
        <UiSectionTitle eyebrow="Отзывы" title="Что говорят участники" />
        <NuxtLink to="/reviews" class="link-arrow">
          Все отзывы
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>

      <div class="rev-grid">
        <article v-for="(r, i) in reviews" :key="r.id" v-reveal="i" class="reveal rev">
          <p class="stars" :aria-label="`Оценка ${r.rating} из 5`">
            <span v-for="n in r.rating" :key="n" aria-hidden="true">★</span>
          </p>
          <blockquote>{{ r.text }}</blockquote>
          <footer class="rev__who">
            <span class="ava" aria-hidden="true">{{ r.initials }}</span>
            <span><b>{{ r.author }}</b><span class="rev__meta">{{ r.tourTitle }} · {{ r.when }}</span></span>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rev-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.rev { background: var(--color-surface); border: 1px solid var(--color-line); border-radius: var(--radius-card); padding: 26px; display: flex; flex-direction: column; }
.stars { display: flex; gap: 3px; color: var(--color-medium); margin-bottom: 16px; }
.rev blockquote { flex: 1; margin: 0; font-size: 15px; line-height: 1.65; color: var(--color-body); }
.rev__who { display: flex; align-items: center; gap: 12px; margin-top: 22px; padding-top: 20px; border-top: 1px solid var(--color-line); }
.ava { width: 44px; height: 44px; border-radius: 50%; flex: none; background: var(--color-primary); color: var(--color-on-primary); display: grid; place-items: center; font-weight: 700; font-size: 15px; }
.rev__who b { display: block; font-size: 14.5px; }
.rev__meta { font-size: 13px; color: var(--color-muted); }

@media (max-width: 1100px) { .rev-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 700px) { .rev-grid { grid-template-columns: 1fr; } }
</style>
