<script setup lang="ts">
const { allFaq } = useCatalog()

const GROUPS = [
  { key: 'prep', label: 'Подготовка и снаряжение' },
  { key: 'pay', label: 'Оплата и отмена' },
  { key: 'safety', label: 'Безопасность' },
  { key: 'b2b', label: 'Для компаний' },
] as const

const query = ref('')

const groups = computed(() => {
  const q = query.value.trim().toLowerCase()
  return GROUPS
    .map(g => ({
      ...g,
      items: allFaq().filter(f =>
        f.category === g.key
        && (!q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)),
      ),
    }))
    .filter(g => g.items.length)
})

const found = computed(() => groups.value.reduce((n, g) => n + g.items.length, 0))

useSeoMeta({
  title: 'Частые вопросы о походах — Ison Travel',
  description: 'Нужен ли опыт, что входит в стоимость, что будет при отказе, можно ли с детьми, как работаем с компаниями.',
})

/* FAQPage даёт раскрывающиеся вопросы прямо в выдаче */
useSchemaOrg([
  defineWebPage({ '@type': 'FAQPage' }),
  ...allFaq().map(f => defineQuestion({ name: f.question, acceptedAnswer: f.answer })),
])
</script>

<template>
  <div class="container-site faq">
    <UiBreadcrumbs :items="[{ label: 'Вопросы' }]" />

    <UiSectionTitle
      as="h1"
      eyebrow="Вопросы"
      title="Частые вопросы"
      text="Если ответа нет — напишите нам в Telegram, добавим его сюда."
      class="faq__head"
    />

    <div class="faq__search">
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="2" />
        <path d="M13.5 13.5L17 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <input v-model="query" type="search" placeholder="Поиск по вопросам" aria-label="Поиск по вопросам">
    </div>

    <p v-if="query" class="faq__count">
      {{ found ? `Найдено: ${found}` : 'Ничего не нашли — попробуйте другое слово' }}
    </p>

    <section v-for="g in groups" :key="g.key" class="faq__group">
      <h2>{{ g.label }}</h2>
      <UiAccordion :items="g.items" />
    </section>

    <section class="faq__cta">
      <div>
        <h2>Не нашли ответ?</h2>
        <p>Напишите — отвечаем быстро, обычно в течение часа.</p>
      </div>
      <UiButton :href="CONTACTS.booking" variant="cta">Написать в Telegram</UiButton>
    </section>
  </div>
</template>

<style scoped>
.faq { padding-bottom: clamp(48px, 7vw, 96px); max-width: 860px; }
.faq__head { margin: 8px 0 28px; }

.faq__search { display: flex; align-items: center; gap: 12px; padding: 0 18px; border: 1px solid var(--color-line); border-radius: 999px; background: var(--color-surface); color: var(--color-muted); }
.faq__search input { flex: 1; padding: 15px 0; border: 0; background: none; font: inherit; font-size: 15.5px; color: var(--color-ink); }
.faq__search input:focus { outline: none; }
.faq__search:focus-within { border-color: var(--color-accent); }

.faq__count { margin-top: 16px; font-size: 14px; color: var(--color-muted); }

.faq__group { margin-top: clamp(32px, 4vw, 48px); }
.faq__group h2 { font-size: clamp(19px, 2.2vw, 24px); margin-bottom: 8px; }

.faq__cta {
  margin-top: clamp(40px, 5vw, 64px);
  padding: clamp(24px, 3vw, 36px);
  border-radius: var(--radius-xl2);
  background: var(--color-accent-soft);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}
.faq__cta h2 { font-size: clamp(20px, 2.4vw, 26px); }
.faq__cta p { margin-top: 6px; color: var(--color-body); font-size: 15px; }
</style>
