<script setup lang="ts">
/** Заглушка для страниц, которые собираются в следующих спринтах. */
defineProps<{ title: string; sprint: string }>()
</script>

<template>
  <div class="container-site stub">
    <UiSectionTitle eyebrow="В работе" :title="title" :text="`Эта страница собирается в ${sprint}.`" as="h1" center />
    <UiButton to="/" variant="outline">На главную</UiButton>
  </div>
</template>

<style scoped>
.stub { display: grid; justify-items: center; gap: 28px; padding-block: clamp(60px, 12vw, 140px); text-align: center; }
</style>
