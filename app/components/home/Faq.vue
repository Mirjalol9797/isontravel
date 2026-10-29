<script setup lang="ts">
const { allFaq } = useCatalog()
const items = allFaq().slice(0, 4)
</script>

<template>
  <section class="section-tight">
    <div class="container-site faq">
      <UiSectionTitle
        v-reveal
        class="reveal"
        eyebrow="Вопросы"
        title="Частые вопросы"
        center
        style="margin-bottom: clamp(28px, 4vw, 44px)"
      />
      <div v-reveal class="reveal">
        <UiAccordion :items="items" open-first />
      </div>
      <p v-reveal class="reveal faq__more">
        Не нашли ответ? <NuxtLink to="/faq">Все вопросы</NuxtLink> или
        <a :href="CONTACTS.booking" target="_blank" rel="noopener">напишите нам</a>.
      </p>
    </div>
  </section>
</template>

<style scoped>
.faq { max-width: 820px; }
.faq__more { margin-top: 28px; text-align: center; color: var(--color-muted); font-size: 15px; }
.faq__more a { color: var(--color-primary); font-weight: 700; }
.faq__more a:hover { color: var(--color-accent-dark); }
</style>
