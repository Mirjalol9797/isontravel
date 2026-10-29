<script setup lang="ts">
import type { Tour, TourDate } from '~/types'

const props = defineProps<{ tour: Tour; date?: TourDate; hot?: boolean }>()

const { price, dayMonth, difficultyLabel, durationLabel, statusLabel } = useFormat()

const shown = computed(() => props.date ?? props.tour.dates[0])
const facts = computed(() => {
  const f = [`${props.tour.distanceKm} км`, durationLabel(props.tour.durationDays)]
  if (shown.value) f.push(`выезд ${shown.value.departAt}`)
  return f
})
</script>

<template>
  <article class="tcard" :class="{ 'tcard--hot': hot }">
    <slot name="top" />

    <NuxtLink :to="`/tours/${tour.slug}`" class="tcard__media">
      <UiPhoto :src="tour.cover" :alt="tour.title" ratio="4 / 3">
        <UiBadge :difficulty="tour.difficulty" class="tcard__badge">
          {{ difficultyLabel(tour.difficulty) }}
        </UiBadge>
        <span v-if="shown" class="tcard__date">{{ dayMonth(shown.date) }}</span>
      </UiPhoto>
    </NuxtLink>

    <div class="tcard__body">
      <h3><NuxtLink :to="`/tours/${tour.slug}`">{{ tour.title }}</NuxtLink></h3>

      <ul class="tcard__facts">
        <li v-for="f in facts" :key="f"><UiChip>{{ f }}</UiChip></li>
      </ul>

      <div class="tcard__foot">
        <p class="price"><b>{{ price(shown?.price ?? tour.priceFrom) }}</b><span>сум</span></p>
        <span v-if="shown" class="seats" :class="`seats--${shown.status}`">
          {{ statusLabel(shown.status, shown.seatsLeft) }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.tcard {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.tcard:hover { transform: translateY(-6px); box-shadow: var(--shadow-card); border-color: transparent; }
.tcard--hot { border-color: var(--color-accent); box-shadow: 0 0 0 4px var(--color-accent-soft); }

.tcard__media { display: block; }
.tcard__media :deep(img) { transition: transform .5s cubic-bezier(.22, 1, .36, 1); }
.tcard:hover .tcard__media :deep(img) { transform: scale(1.06); }
.tcard__badge { position: absolute; z-index: 2; top: 12px; left: 12px; }
.tcard__date {
  position: absolute;
  z-index: 2;
  top: 12px; right: 12px;
  padding: 7px 13px;
  border-radius: 999px;
  background: rgb(255 255 255 / .94);
  backdrop-filter: blur(8px);
  font-size: 13px;
  font-weight: 700;
}

.tcard__body { display: flex; flex-direction: column; flex: 1; padding: 20px; }
.tcard__body h3 { margin-bottom: 14px; }
.tcard__facts { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; list-style: none; }
.tcard__foot {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid var(--color-line);
}

.price { white-space: nowrap; }
.price b { font-family: var(--font-display); font-size: 21px; font-weight: 600; letter-spacing: -.02em; }
.price span { font-size: 13px; color: var(--color-muted); margin-left: 4px; }

.seats { font-size: 12px; font-weight: 700; white-space: nowrap; color: var(--color-hard); }
.seats--open { color: var(--color-easy); }
.seats--sold { color: var(--color-muted); }
</style>
