<script setup lang="ts">
import type { Tour, TourDate } from '~/types'

const props = defineProps<{ tour: Tour }>()

const { price, dayMonthWeekday, statusLabel } = useFormat()

/** Ближайшая дата, на которую ещё есть места */
const date = computed<TourDate | undefined>(() =>
  [...props.tour.dates].sort((a, b) => a.date.localeCompare(b.date)).find(d => d.status !== 'sold'),
)

const modal = ref(false)
</script>

<template>
  <aside class="bcard">
    <div class="bcard__top">
      <p class="bcard__price">
        <b>{{ price(date?.price ?? tour.priceFrom) }}</b>
        <i>сум / с человека</i>
      </p>

      <div v-if="date" class="bcard__date">
        <span>
          <b>{{ dayMonthWeekday(date.date) }}</b>
          <small>выезд в {{ date.departAt }}</small>
        </span>
        <span class="seats" :class="`seats--${date.status}`">
          {{ statusLabel(date.status, date.seatsLeft) }}
        </span>
      </div>
      <p v-else class="bcard__none">Ближайшие даты пока не объявлены — напишите, сообщим первым.</p>

      <UiButton variant="cta" size="lg" block @click="modal = true">
        {{ date ? 'Записаться на выезд' : 'Сообщить о датах' }}
      </UiButton>

      <ul class="bcard__list">
        <li>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6.6" stroke="currentColor" stroke-width="1.5" />
            <path d="M8 4.6V8l2.4 1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          Выезд <b>{{ date?.departAt ?? tour.dates[0]?.departAt ?? '—' }}</b>
        </li>
        <li>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 14.5s5.2-4.1 5.2-8A5.2 5.2 0 0 0 2.8 6.5c0 3.9 5.2 8 5.2 8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
            <circle cx="8" cy="6.4" r="1.9" stroke="currentColor" stroke-width="1.5" />
          </svg>
          Сбор <b>{{ tour.meetingPoint }}</b>
        </li>
        <li>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2.5 12.5h11M4.5 12.5V7l3.5-3.5L11.5 7v5.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
          </svg>
          Возврат <b>~{{ date?.returnAt ?? tour.dates[0]?.returnAt ?? '—' }}</b>
        </li>
        <li>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="6" cy="5.5" r="2.4" stroke="currentColor" stroke-width="1.5" />
            <path d="M2 13c0-2.2 1.8-3.6 4-3.6s4 1.4 4 3.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M11 6.5h3.2M12.6 5v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          Группа <b>{{ tour.groupSize }}</b>
        </li>
      </ul>
    </div>

    <p class="bcard__warn">
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
        <path d="M8.5 1.8l6.5 11.4H2L8.5 1.8z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        <path d="M8.5 6.4v3M8.5 11.4h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
      </svg>
      <span>
        Место закрепляется только после 100% оплаты. При отказе оплата не возвращается —
        но вы можете передать место другому человеку.
      </span>
    </p>

    <a :href="CONTACTS.booking" target="_blank" rel="noopener" class="bcard__tg">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.9 4.3L18.7 19c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.3-.1-.5-.6-.2L6.2 12.1 1.3 10.6c-1-.3-1.1-1 .2-1.5L20.5 2.9c.9-.3 1.6.2 1.4 1.4z" />
      </svg>
      Задать вопрос в Telegram
    </a>

    <UiModal v-model:open="modal" :title="`Запись: ${tour.title}`">
      <p class="modal__lead">
        <template v-if="date">{{ dayMonthWeekday(date.date) }}, выезд в {{ date.departAt }} · {{ price(date.price) }} сум</template>
        <template v-else>Сообщим, как только объявим даты.</template>
      </p>
      <FormLead :tour-slug="tour.slug" :interest="tour.title" :with-interest="false" with-people submit-label="Отправить заявку" compact />
    </UiModal>
  </aside>
</template>

<style scoped>
.bcard {
  background: var(--color-surface);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-xl2);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}
.bcard__top { padding: 24px 24px 20px; }

.bcard__price { display: flex; align-items: baseline; gap: 7px; flex-wrap: wrap; }
.bcard__price b { font-family: var(--font-display); font-size: 32px; font-weight: 600; letter-spacing: -.02em; }
.bcard__price i { font-style: normal; font-size: 15px; color: var(--color-muted); }

.bcard__date {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 18px 0;
  padding: 14px 16px;
  border-radius: 12px;
  background: var(--color-bg);
}
.bcard__date b { display: block; font-size: 15px; }
.bcard__date small { font-size: 13px; color: var(--color-muted); }
.bcard__none { margin: 18px 0; font-size: 14px; color: var(--color-muted); }

.seats { font-size: 12.5px; font-weight: 700; white-space: nowrap; color: var(--color-hard); }
.seats--open { color: var(--color-easy); }

.bcard__list { margin-top: 20px; list-style: none; }
.bcard__list li { display: flex; align-items: center; gap: 10px; padding: 9px 0; font-size: 14.5px; border-top: 1px solid var(--color-line); }
.bcard__list li:first-child { border-top: 0; }
.bcard__list li b { margin-left: auto; font-weight: 700; text-align: right; }
.bcard__list svg { flex: none; color: var(--color-primary); opacity: .55; }

.bcard__warn {
  display: flex;
  gap: 10px;
  padding: 16px 24px;
  background: var(--color-accent-soft);
  border-top: 1px solid var(--color-line);
  font-size: 13px;
  line-height: 1.55;
  color: var(--color-body);
}
.bcard__warn svg { flex: none; margin-top: 2px; color: var(--color-accent-dark); }

.bcard__tg {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 15px;
  border-top: 1px solid var(--color-line);
  font-size: 14.5px;
  font-weight: 700;
  color: var(--color-primary);
}
.bcard__tg:hover { background: var(--color-bg); }

.modal__lead { color: var(--color-muted); margin-bottom: 18px; font-size: 15px; }
</style>
