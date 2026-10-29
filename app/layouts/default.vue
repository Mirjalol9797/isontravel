<script setup lang="ts">
/** Страницы с фото-героем помечают себя через definePageMeta({ overHero: true }) */
const route = useRoute()
const overHero = computed(() => route.meta.overHero === true)
</script>

<template>
  <div class="shell">
    <LayoutHeader :over-hero="overHero" />

    <main :class="{ 'shell__main--pad': !overHero }">
      <slot />
    </main>

    <LayoutFooter />
    <LayoutStickyCta />
  </div>
</template>

<style scoped>
.shell { display: flex; flex-direction: column; min-height: 100vh; }
main { flex: 1; }
/* страницы без героя не должны уезжать под фиксированную шапку */
.shell__main--pad { padding-top: 76px; }
</style>
