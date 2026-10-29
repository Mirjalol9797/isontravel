<script setup lang="ts">
/**
 * Рамка под фотографию.
 * Пока в проекте стоковые заглушки — рендерим обычный <img>.
 * Когда приедут настоящие кадры заказчика, здесь меняется
 * тег на <NuxtImg> и добавляется sizes — разметка остаётся та же.
 */
interface Props {
  src?: string
  alt?: string
  ratio?: string
  eager?: boolean
}
withDefaults(defineProps<Props>(), { alt: '', ratio: '4 / 3' })
</script>

<template>
  <div class="ph" :style="{ aspectRatio: ratio }">
    <img v-if="src" :src="asset(src)" :alt="alt" :loading="eager ? 'eager' : 'lazy'" decoding="async">
    <slot />
  </div>
</template>
