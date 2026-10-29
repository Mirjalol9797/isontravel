<script setup lang="ts">
useSeoMeta({
  title: 'Политика обработки данных — Ison Travel',
  description: 'Какие данные мы собираем через формы на сайте, зачем они нужны, сколько хранятся и как их удалить.',
})
</script>

<template>
  <div class="container-site doc">
    <UiBreadcrumbs :items="[{ label: 'Политика данных' }]" />

    <UiSectionTitle
      as="h1"
      eyebrow="Документы"
      title="Политика обработки данных"
      text="Коротко: мы собираем имя и телефон, чтобы перезвонить по вашей заявке. Больше ничего."
      class="doc__head"
    />

    <article class="doc__body">
      <section>
        <h2>Какие данные мы собираем</h2>
        <p>
          Через формы на сайте — имя и номер телефона. Если вы оставляете заявку на конкретный тур,
          к ним добавляется название маршрута и количество участников.
        </p>
        <p>
          Для корпоративных заявок — дополнительно название компании и контактное лицо.
        </p>
      </section>

      <section>
        <h2>Зачем они нужны</h2>
        <p>
          Единственная цель — связаться с вами по оставленной заявке: подтвердить место,
          ответить на вопросы, прислать реквизиты для оплаты или коммерческое предложение.
        </p>
        <p>
          Мы не используем ваши контакты для рассылок, если вы на них не подписывались.
        </p>
      </section>

      <section>
        <h2>Кому передаём</h2>
        <p>
          Никому. Данные видят только гиды и менеджер, который ведёт запись.
          Мы не продаём и не передаём контакты третьим лицам.
        </p>
      </section>

      <section>
        <h2>Сколько храним</h2>
        <p>
          Заявки храним год — чтобы помнить, кто с нами уже ходил, и не задавать
          одни и те же вопросы заново. Дальше удаляем.
        </p>
      </section>

      <section>
        <h2>Как удалить свои данные</h2>
        <p>
          Напишите нам в Telegram — удалим в тот же день и подтвердим.
          Никаких заявлений и объяснений не нужно.
        </p>
      </section>

      <section>
        <h2>Аналитика</h2>
        <p>
          Сайт использует системы веб-аналитики, которые собирают обезличенную статистику:
          какие страницы смотрят, с каких устройств заходят, откуда приходят.
          Эти данные не связаны с вашим именем и телефоном.
        </p>
      </section>
    </article>

    <section class="doc__cta">
      <div>
        <h2>Вопросы по данным</h2>
        <p>Спросите напрямую — ответим.</p>
      </div>
      <UiButton :href="CONTACTS.booking" variant="cta">Написать в Telegram</UiButton>
    </section>
  </div>
</template>

<style scoped>
.doc { padding-bottom: clamp(48px, 7vw, 96px); max-width: 820px; }
.doc__head { margin: 8px 0 8px; }

.doc__body section { margin-top: clamp(32px, 4vw, 44px); }
.doc__body h2 { font-size: clamp(19px, 2.2vw, 24px); margin-bottom: 14px; }
.doc__body p { color: var(--color-body); line-height: 1.75; font-size: 16px; }
.doc__body p + p { margin-top: 14px; }

.doc__cta {
  margin-top: clamp(40px, 5vw, 64px);
  padding: clamp(24px, 3vw, 36px);
  border-radius: var(--radius-xl2);
  background: var(--color-bg);
  border: 1px solid var(--color-line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}
.doc__cta h2 { font-size: clamp(20px, 2.4vw, 26px); }
.doc__cta p { margin-top: 6px; color: var(--color-muted); font-size: 15px; }
</style>
