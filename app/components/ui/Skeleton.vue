<script setup lang="ts">
defineProps<{ height?: string; width?: string; radius?: string }>()
</script>

<template>
  <span
    class="sk"
    :style="{ height: height ?? '16px', width: width ?? '100%', borderRadius: radius ?? '8px' }"
    aria-hidden="true"
  />
</template>

<style scoped>
.sk {
  display: block;
  background: linear-gradient(90deg, var(--color-line) 25%, color-mix(in srgb, var(--color-line) 50%, #fff) 50%, var(--color-line) 75%);
  background-size: 200% 100%;
  animation: sweep 1.3s ease-in-out infinite;
}
@keyframes sweep { to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { .sk { animation: none; } }
</style>
