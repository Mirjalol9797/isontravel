<script setup lang="ts">
import type { ProgramStep } from '~/types'

defineProps<{ steps: ProgramStep[] }>()
</script>

<template>
  <ol class="tl">
    <li v-for="(s, i) in steps" :key="i" class="tli" :class="{ 'is-key': s.key }">
      <span class="tli__time">{{ s.time }}</span>
      <h3>{{ s.title }}</h3>
      <p>{{ s.text }}</p>
    </li>
  </ol>
</template>

<style scoped>
.tl { position: relative; padding-left: 108px; list-style: none; }
.tl::before { content: ''; position: absolute; left: 83px; top: 10px; bottom: 10px; width: 2px; background: var(--color-line); }

.tli { position: relative; padding-bottom: 26px; }
.tli:last-child { padding-bottom: 0; }
.tli::before {
  content: '';
  position: absolute;
  left: -27px; top: 4px;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 2.5px solid var(--color-line);
}
.tli.is-key::before {
  border-color: var(--color-accent);
  background: var(--color-accent);
  box-shadow: 0 0 0 5px var(--color-accent-soft);
}

.tli__time {
  position: absolute;
  left: -108px; top: -2px;
  width: 68px;
  text-align: right;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}
.tli h3 { font-size: 16px; margin-bottom: 5px; }
.tli p { font-size: 14.5px; color: var(--color-muted); max-width: 56ch; }

@media (max-width: 560px) {
  .tl { padding-left: 76px; }
  .tl::before { left: 56px; }
  .tli__time { left: -76px; width: 48px; font-size: 13px; }
}
</style>
