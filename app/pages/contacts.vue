<script setup lang="ts">
useSeoMeta({
  title: 'Контакты — Ison Travel, Ташкент',
  description: 'Как с нами связаться: Telegram, телефон, точка сбора на выезды. Реквизиты для юридических лиц.',
})

const channels = [
  {
    title: 'Telegram — запись на туры',
    value: '@Malvina_travel',
    href: CONTACTS.booking,
    note: 'Самый быстрый способ. Отвечаем обычно в течение часа.',
    primary: true,
  },
  {
    title: 'Telegram-канал',
    value: CONTACTS.telegramName,
    href: CONTACTS.telegram,
    note: 'Анонсы выездов, отчёты и фото с маршрутов.',
  },
  {
    title: 'Телефон',
    value: CONTACTS.phone,
    href: CONTACTS.phoneHref,
    note: 'С 9:00 до 21:00, без выходных.',
  },
]
</script>

<template>
  <div class="container-site cnt">
    <UiBreadcrumbs :items="[{ label: 'Контакты' }]" />

    <UiSectionTitle
      as="h1"
      eyebrow="Контакты"
      title="Как с нами связаться"
      text="Пишите в Telegram — там быстрее всего. Звонок тоже работает."
      class="cnt__head"
    />

    <div class="cnt__grid">
      <a
        v-for="c in channels"
        :key="c.title"
        :href="c.href"
        target="_blank"
        rel="noopener"
        class="chan"
        :class="{ 'chan--primary': c.primary }"
      >
        <span class="chan__t">{{ c.title }}</span>
        <b>{{ c.value }}</b>
        <small>{{ c.note }}</small>
      </a>
    </div>

    <div class="cnt__two">
      <section class="block">
        <h2>Точка сбора</h2>
        <p class="block__big">{{ CONTACTS.meetingPoint }}</p>
        <p>
          Отсюда уезжают все наши группы. Точное место у выхода скидываем в чат группы
          накануне выезда — вместе с номером машины и именем водителя.
        </p>
        <p class="block__warn">
          Опоздавших ждём 15 минут. Дальше группа уезжает: на маршруте расписание жёсткое.
        </p>
      </section>

      <section class="block">
        <h2>Юридическим лицам</h2>
        <p>
          Работаем по договору и безналичному расчёту. Выставляем счёт, после выезда передаём
          акт и все закрывающие документы.
        </p>
        <p>
          Для просчёта корпоративного выезда напишите на тот же Telegram или оставьте заявку
          на странице <NuxtLink to="/corporate">корпоративных туров</NuxtLink> — пришлём КП
          в течение рабочего дня.
        </p>
        <UiButton to="/corporate" variant="outline" size="sm">Получить КП</UiButton>
      </section>
    </div>

    <section class="cnt__form">
      <div>
        <span class="eyebrow">Обратная связь</span>
        <h2>Напишите нам</h2>
        <p>Оставьте номер — перезвоним и ответим на вопросы по любому маршруту.</p>
      </div>
      <FormLead />
    </section>
  </div>
</template>

<style scoped>
.cnt { padding-bottom: clamp(48px, 7vw, 96px); }
.cnt__head { margin: 8px 0 clamp(28px, 4vw, 40px); }

.cnt__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.chan {
  display: block;
  padding: 26px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  transition: .22s;
}
.chan:hover { border-color: var(--color-primary); transform: translateY(-4px); box-shadow: var(--shadow-card); }
.chan--primary { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
.chan--primary:hover { background: var(--color-primary-deep); }
.chan__t { font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; opacity: .6; }
.chan b { display: block; margin: 10px 0 8px; font-family: var(--font-display); font-size: 21px; font-weight: 600; }
.chan small { font-size: 14px; opacity: .72; line-height: 1.5; display: block; }

.cnt__two { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
.block { padding: clamp(24px, 3vw, 34px); border: 1px solid var(--color-line); border-radius: var(--radius-card); background: var(--color-surface); }
.block h2 { font-size: clamp(19px, 2.2vw, 24px); margin-bottom: 14px; }
.block p { color: var(--color-body); line-height: 1.65; font-size: 15px; }
.block p + p { margin-top: 12px; }
.block a { color: var(--color-primary); font-weight: 700; text-decoration: underline; }
.block__big { font-family: var(--font-display); font-size: 20px; font-weight: 600; color: var(--color-ink); margin-bottom: 12px; }
.block__warn { margin-top: 14px; padding: 12px 16px; border-radius: 12px; background: var(--color-accent-soft); font-size: 14px; color: var(--color-body); }
.block :deep(.btn) { margin-top: 16px; }

.cnt__form {
  margin-top: clamp(40px, 5vw, 64px);
  padding: clamp(28px, 4vw, 48px);
  border-radius: var(--radius-xl2);
  background: var(--color-accent-soft);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(28px, 4vw, 56px);
  align-items: center;
}
.cnt__form h2 { margin-top: 14px; font-size: clamp(22px, 2.8vw, 30px); }
.cnt__form > div p { margin-top: 12px; color: var(--color-body); }

@media (max-width: 1100px) {
  .cnt__grid { grid-template-columns: 1fr; }
  .cnt__two { grid-template-columns: 1fr; }
  .cnt__form { grid-template-columns: 1fr; }
}
</style>
