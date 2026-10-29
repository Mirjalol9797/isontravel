<script setup lang="ts">
import type { Tour } from '~/types'

const props = defineProps<{ tour: Tour }>()
const { difficultyLabel } = useFormat()

const lightbox = ref(false)
const startAt = ref(0)

const openAt = (i: number) => { startAt.value = i; lightbox.value = true }

/** Шапка берёт три кадра, остальное живёт в лайтбоксе */
const head = computed(() => props.tour.gallery.slice(0, 3))
</script>

<template>
  <section class="tgal">
    <button class="tgal__item tgal__item--main" @click="openAt(0)">
      <UiPhoto :src="head[0]" :alt="tour.title" ratio="auto" eager />
      <span class="tgal__badges">
        <UiBadge :difficulty="tour.difficulty">{{ difficultyLabel(tour.difficulty) }} сложность</UiBadge>
        <UiBadge v-if="tour.featured" light>Хит сезона</UiBadge>
      </span>
    </button>

    <button v-if="head[1]" class="tgal__item" @click="openAt(1)">
      <UiPhoto :src="head[1]" :alt="tour.title" ratio="auto" />
    </button>

    <button v-if="head[2]" class="tgal__item" @click="openAt(2)">
      <UiPhoto :src="head[2]" :alt="tour.title" ratio="auto" />
      <span class="tgal__all">
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1.5" y="3" width="13" height="10" rx="2" stroke="currentColor" stroke-width="1.6" />
          <circle cx="5.5" cy="6.5" r="1.2" fill="currentColor" />
          <path d="M2 11.5l3.5-3 3 2.5 2.5-2 3 2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Все фото · {{ tour.gallery.length }}
      </span>
    </button>

    <UiLightbox v-model:open="lightbox" :images="tour.gallery" :alt="tour.title" :start="startAt" />
  </section>
</template>

<style scoped>
.tgal {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
  height: clamp(300px, 46vw, 520px);
  border-radius: var(--radius-xl2);
  overflow: hidden;
}
.tgal__item {
  position: relative;
  overflow: hidden;
  border: 0;
  padding: 0;
  background: none;
  cursor: zoom-in;
  display: block;
}
.tgal__item--main { grid-row: span 2; }
.tgal__item :deep(.ph) { height: 100%; }
.tgal__item :deep(img) { transition: transform .6s cubic-bezier(.22, 1, .36, 1); }
.tgal__item:hover :deep(img) { transform: scale(1.05); }

.tgal__badges { position: absolute; z-index: 3; top: 16px; left: 16px; display: flex; gap: 8px; flex-wrap: wrap; }
.tgal__all {
  position: absolute;
  z-index: 3;
  right: 16px; bottom: 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 18px;
  border-radius: 999px;
  background: rgb(255 255 255 / .94);
  backdrop-filter: blur(10px);
  font-size: 14px;
  font-weight: 700;
  color: var(--color-ink);
  box-shadow: var(--shadow-soft);
}

@media (max-width: 760px) {
  .tgal { grid-template-columns: 1fr; grid-template-rows: 1fr; height: 300px; }
  .tgal__item:not(.tgal__item--main) { display: none; }
  .tgal__item--main { grid-row: span 1; }
}
</style>
