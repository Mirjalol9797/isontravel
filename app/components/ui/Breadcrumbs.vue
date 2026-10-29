<script setup lang="ts">
export interface Crumb {
  label: string
  /** последний элемент идёт без ссылки */
  to?: string
}

const props = defineProps<{ items: Crumb[] }>()

/* Та же цепочка уходит в разметку BreadcrumbList —
   поисковик показывает её вместо URL в сниппете. */
useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Главная', item: '/' },
      ...props.items.map((c, i) => ({
        name: c.label,
        // у последней крошки ссылки нет — это текущая страница
        item: c.to ?? (i === props.items.length - 1 ? undefined : undefined),
      })),
    ],
  }),
])
</script>

<template>
  <nav class="crumbs" aria-label="Хлебные крошки">
    <ol>
      <li><NuxtLink to="/">Главная</NuxtLink></li>
      <li v-for="(c, i) in items" :key="i">
        <NuxtLink v-if="c.to" :to="c.to">{{ c.label }}</NuxtLink>
        <span v-else aria-current="page">{{ c.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.crumbs { padding: 22px 0 18px; }
ol { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; list-style: none; font-size: 13.5px; color: var(--color-muted); }
li + li::before { content: '/'; margin-right: 8px; opacity: .45; }
a:hover { color: var(--color-accent-dark); }
[aria-current='page'] { color: var(--color-ink); }
</style>
