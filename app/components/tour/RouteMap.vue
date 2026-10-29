<script setup lang="ts">
import type { Tour } from '~/types'

const props = defineProps<{ tour: Tour }>()

/* Схема маршрута рисуется, а не берётся с тайлового сервиса:
   реальных треков GPX у нас пока нет, а пустая карта хуже схемы.
   Когда заказчик пришлёт треки — компонент меняется на Leaflet,
   разметка вокруг остаётся та же. */

const baseAltitude = 1240
const topAltitude = computed(() => baseAltitude + props.tour.ascentM)

const walkHours = computed(() => {
  // грубая оценка: 3 км/ч по горизонтали + 10 минут на каждые 100 м набора
  const hours = props.tour.distanceKm / 3 + props.tour.ascentM / 100 / 6
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60 / 10) * 10
  return h > 0 ? `~${h} ч ${m ? m + ' мин' : ''}`.trim() : `~${m} мин`
})
</script>

<template>
  <div>
    <div class="tmap">
      <svg class="tmap__svg" viewBox="0 0 900 400" role="img" :aria-label="`Схема маршрута: ${tour.title}`">
        <g fill="none" style="stroke: var(--color-ink)" stroke-opacity=".13" stroke-width="1.5">
          <path d="M-20 300 C 120 265, 240 300, 360 262 S 620 215, 760 250 S 900 272, 940 258" />
          <path d="M-20 262 C 130 224, 250 262, 372 220 S 626 172, 764 210 S 900 232, 940 216" />
          <path d="M-20 224 C 140 184, 262 224, 384 180 S 632 130, 768 170 S 900 192, 940 176" />
          <path d="M-20 186 C 150 146, 274 186, 396 142 S 640 90, 774 132 S 900 152, 940 136" />
          <path d="M-20 148 C 160 110, 286 150, 408 104 S 648 52, 780 94 S 900 114, 940 98" />
          <path d="M-20 110 C 172 74, 300 112, 420 68 S 656 18, 788 58" />
        </g>

        <path
          d="M-20 360 C 160 340, 300 372, 450 344 S 740 320, 940 346"
          fill="none" stroke="#6FA3C4" stroke-opacity=".5" stroke-width="7" stroke-linecap="round"
        />

        <path
          d="M120 338 C 230 322, 300 290, 372 268 S 520 228, 596 186 S 700 142, 752 118"
          fill="none" style="stroke: var(--color-accent)" stroke-width="4" stroke-linecap="round" stroke-dasharray="11 9"
        />

        <circle cx="120" cy="338" r="11" style="fill: var(--color-surface); stroke: var(--color-primary)" stroke-width="3" />
        <text x="120" y="372" text-anchor="middle" class="tmap__label tmap__label--b">Старт</text>

        <circle cx="596" cy="186" r="7" style="fill: var(--color-primary)" />
        <text x="596" y="168" text-anchor="middle" class="tmap__label">Смотровая</text>

        <circle cx="752" cy="118" r="13" style="fill: var(--color-accent); stroke: var(--color-surface)" stroke-width="3" />
        <text x="752" y="96" text-anchor="middle" class="tmap__label tmap__label--b">Цель маршрута</text>
      </svg>

      <ul class="tmap__legend">
        <li>{{ tour.distanceKm }} км в одну сторону</li>
        <li>Набор {{ tour.ascentM }} м</li>
        <li>{{ walkHours }} подъёма</li>
      </ul>
    </div>

    <div class="elev">
      <h3>Профиль высот</h3>
      <p class="elev__sub">От {{ baseAltitude }} м на старте до {{ topAltitude }} м в верхней точке</p>
      <svg class="elev__svg" viewBox="0 0 800 140" preserveAspectRatio="none" role="img" aria-label="Профиль высот маршрута">
        <defs>
          <linearGradient id="elev-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style="stop-color: var(--color-accent)" stop-opacity=".32" />
            <stop offset="1" style="stop-color: var(--color-accent)" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,120 L70,112 L140,98 L210,102 L280,78 L350,70 L420,52 L490,58 L560,36 L630,30 L700,22 L800,16 L800,140 L0,140 Z"
          fill="url(#elev-grad)"
        />
        <polyline
          points="0,120 70,112 140,98 210,102 280,78 350,70 420,52 490,58 560,36 630,30 700,22 800,16"
          fill="none" style="stroke: var(--color-accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.tmap {
  position: relative;
  border-radius: var(--radius-card);
  overflow: hidden;
  border: 1px solid var(--color-line);
  background: linear-gradient(145deg, #EFE9D8 0%, #E0E8CD 55%, #CFDFBA 100%);
}
.tmap__svg { display: block; width: 100%; height: auto; }
.tmap__label { font-family: var(--font-sans); font-size: 13px; font-weight: 600; fill: var(--color-ink); }
.tmap__label--b { font-size: 14px; font-weight: 700; }

.tmap__legend { position: absolute; left: 16px; bottom: 16px; display: flex; gap: 8px; flex-wrap: wrap; list-style: none; }
.tmap__legend li {
  padding: 7px 13px;
  border-radius: 999px;
  background: rgb(255 255 255 / .92);
  backdrop-filter: blur(8px);
  font-size: 12.5px;
  font-weight: 700;
  box-shadow: var(--shadow-soft);
}

.elev { margin-top: 14px; padding: 18px 18px 10px; border: 1px solid var(--color-line); border-radius: var(--radius-card); background: var(--color-bg); }
.elev h3 { font-size: 13px; font-family: var(--font-display); font-weight: 600; }
.elev__sub { font-size: 13px; color: var(--color-muted); margin-top: 4px; }
.elev__svg { width: 100%; height: 120px; margin-top: 10px; }
</style>
