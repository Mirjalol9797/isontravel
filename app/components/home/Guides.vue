<script setup lang="ts">
const { allGuides } = useCatalog()
const guides = allGuides()
</script>

<template>
  <section class="section-tight">
    <div class="container-site">
      <UiSectionTitle
        v-reveal
        class="reveal"
        eyebrow="Команда"
        title="Гиды, с которыми вы пойдёте"
        text="Люди записываются к конкретному человеку — у каждого гида своя страница."
        style="margin-bottom: clamp(28px, 4vw, 52px)"
      />

      <div class="guides">
        <NuxtLink
          v-for="(g, i) in guides"
          :key="g.slug"
          v-reveal="i"
          :to="`/guides/${g.slug}`"
          class="reveal guide"
        >
          <UiPhoto :src="g.photo" :alt="g.name" ratio="3 / 4" class="guide__media">
            <UiBadge v-if="g.role === 'Основатель'" light class="guide__badge">основатель</UiBadge>
          </UiPhoto>
          <h3>{{ g.name }}</h3>
          <p>{{ g.experience }} · {{ g.directions.join(', ') }}</p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.guides { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.guide__media { border-radius: var(--radius-card); margin-bottom: 16px; }
.guide__media :deep(img) { transition: transform .5s cubic-bezier(.22, 1, .36, 1); }
.guide:hover .guide__media :deep(img) { transform: scale(1.05); }
.guide__badge { position: absolute; z-index: 2; bottom: 12px; left: 12px; }
.guide h3 { font-size: 19px; margin-bottom: 4px; }
.guide p { font-size: 14px; color: var(--color-muted); }

@media (max-width: 860px) { .guides { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
</style>
