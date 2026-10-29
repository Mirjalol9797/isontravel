<script setup lang="ts">
import type { Tour } from '~/types'

const props = defineProps<{ tour: Tour }>()
const emit = defineEmits<{ book: [dateId: string] }>()

const { price, dayMonthWeekday, statusLabel } = useFormat()

const sorted = computed(() => [...props.tour.dates].sort((a, b) => a.date.localeCompare(b.date)))
</script>

<template>
  <ul class="dates">
    <li v-for="d in sorted" :key="d.id" class="drow" :class="{ 'drow--off': d.status === 'sold' }">
      <span class="drow__d">
        <b>{{ dayMonthWeekday(d.date) }}</b>
        <small>выезд в {{ d.departAt }}</small>
      </span>

      <span class="drow__s seats" :class="`seats--${d.status}`">
        {{ statusLabel(d.status, d.seatsLeft) }}
      </span>

      <span class="drow__p">{{ price(d.price) }}</span>

      <UiButton
        v-if="d.status !== 'sold'"
        :variant="d.status === 'few' ? 'cta' : 'outline'"
        size="sm"
        @click="emit('book', d.id)"
      >Записаться</UiButton>
      <span v-else class="drow__sold">Занято</span>
    </li>
  </ul>
</template>

<style scoped>
.dates { border: 1px solid var(--color-line); border-radius: var(--radius-card); overflow: hidden; list-style: none; }
.drow {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-top: 1px solid var(--color-line);
}
.drow:first-child { border-top: 0; }
.drow:hover { background: var(--color-bg); }
.drow--off { opacity: .55; }

.drow__d b { display: block; font-size: 15.5px; font-weight: 700; }
.drow__d small { font-size: 13px; color: var(--color-muted); }
.drow__p { font-family: var(--font-display); font-size: 17px; font-weight: 600; }
.drow__sold { font-size: 13.5px; font-weight: 700; color: var(--color-muted); }

.seats { font-size: 12.5px; font-weight: 700; color: var(--color-hard); }
.seats--open { color: var(--color-easy); }
.seats--sold { color: var(--color-muted); }

@media (max-width: 640px) {
  .drow { grid-template-columns: 1fr auto; row-gap: 8px; }
  .drow__s { grid-column: 1 / -1; }
}
</style>
