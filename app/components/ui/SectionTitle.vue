<script setup lang="ts">
interface Props {
  eyebrow?: string
  title: string
  text?: string
  center?: boolean
  light?: boolean
  /** заголовок уровня h1 на страницах, где секция главная */
  as?: 'h1' | 'h2'
}
withDefaults(defineProps<Props>(), { as: 'h2' })
</script>

<template>
  <div class="st" :class="{ 'st--center': center }">
    <span v-if="eyebrow" class="eyebrow" :class="{ 'eyebrow-light': light }">{{ eyebrow }}</span>
    <component :is="as" class="st__h">{{ title }}</component>
    <p v-if="text" class="st__p">{{ text }}</p>
  </div>
</template>

<style scoped>
.st { max-width: 620px; }
.st--center { margin-inline: auto; text-align: center; }
.st--center .eyebrow { justify-content: center; }
.st__h { margin-top: 16px; }
.st__p { margin-top: 14px; color: var(--color-muted); font-size: clamp(16px, 1.8vw, 20px); line-height: 1.55; }
</style>
