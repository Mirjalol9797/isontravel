<script setup lang="ts">
import type { Difficulty } from '~/types'

interface Props {
  /** цвет берётся из сложности маршрута, либо светлая «стеклянная» плашка */
  difficulty?: Difficulty
  light?: boolean
}
defineProps<Props>()
</script>

<template>
  <span class="badge" :class="[difficulty && `badge--${difficulty}`, { 'badge--light': light }]">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 13px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .02em;
  color: #fff;
  background: var(--color-primary);
}
.badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.badge--easy { background: var(--color-easy); }
.badge--medium { background: var(--color-medium); color: var(--color-ink); }
.badge--hard { background: var(--color-hard); }
.badge--light {
  background: rgb(255 255 255 / .92);
  color: var(--color-ink);
  backdrop-filter: blur(8px);
}
</style>
