<script setup lang="ts">
import type { Lead } from '~/types'

const props = withDefaults(defineProps<{
  /** Что подставить в поле «Интересует» */
  interest?: string
  tourSlug?: string
  withInterest?: boolean
  /** Спрашивать количество участников — нужно при записи на конкретный выезд */
  withPeople?: boolean
  submitLabel?: string
  compact?: boolean
}>(), { submitLabel: 'Отправить заявку', withInterest: true })

const INTERESTS = ['Однодневный поход', 'Поход с ночёвкой', 'Корпоративный выезд', 'Пока не знаю']

const name = ref('')
const phone = ref('')
const people = ref(1)
const interest = ref(props.interest ?? INTERESTS[0]!)

const mask = usePhoneMask(phone)

const errors = reactive<Record<string, string>>({ name: '', phone: '' })
const { state, error, send, reset } = useLead()

const validate = () => {
  errors.name = name.value.trim().length < 2 ? 'Как к вам обращаться?' : ''
  errors.phone = mask.isValid.value ? '' : 'Нужен полный номер — девять цифр после +998'
  return !errors.name && !errors.phone
}

const onSubmit = async () => {
  if (!validate()) return
  const lead: Lead = {
    name: name.value.trim(),
    phone: phone.value.trim(),
    interest: props.withInterest ? interest.value : props.interest,
    tourSlug: props.tourSlug,
    people: props.withPeople ? people.value : undefined,
  }
  await send(lead)
}

const again = () => {
  name.value = ''
  phone.value = ''
  people.value = 1
  reset()
}
</script>

<template>
  <div>
    <form v-if="state !== 'done'" novalidate @submit.prevent="onSubmit">
      <div class="row">
        <UiField v-model="name" label="Как вас зовут" placeholder="Имя" :error="errors.name" required />

        <div class="field">
          <label for="lead-phone">Телефон <span aria-hidden="true">*</span></label>
          <input
            id="lead-phone"
            :value="phone"
            type="tel"
            inputmode="tel"
            :placeholder="mask.placeholder"
            :aria-invalid="!!errors.phone"
            :class="{ 'is-bad': errors.phone }"
            @input="mask.onInput(($event.target as HTMLInputElement).value)"
          >
          <p v-if="errors.phone" class="field__err">{{ errors.phone }}</p>
        </div>
      </div>

      <div v-if="withInterest || withPeople" class="row row--mt">
        <UiField v-if="withInterest" v-model="interest" label="Интересует" :options="INTERESTS" />

        <div v-if="withPeople" class="field field--people">
          <label>Сколько человек</label>
          <div class="people">
            <button type="button" aria-label="Меньше" @click="people = Math.max(1, people - 1)">−</button>
            <output>{{ people }}</output>
            <button type="button" aria-label="Больше" @click="people = Math.min(20, people + 1)">+</button>
          </div>
        </div>
      </div>

      <UiButton
        type="submit"
        variant="cta"
        :size="compact ? 'md' : 'lg'"
        block
        :disabled="state === 'sending'"
        class="submit"
      >
        {{ state === 'sending' ? 'Отправляем…' : submitLabel }}
      </UiButton>

      <p v-if="error" class="err">{{ error }}</p>
      <p class="note">
        Нажимая кнопку, вы соглашаетесь с
        <NuxtLink to="/cancellation">условиями оферты</NuxtLink> и
        <NuxtLink to="/privacy">политикой данных</NuxtLink>
      </p>
    </form>

    <div v-else class="done" role="status">
      <span class="done__ico" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <h3>Заявка отправлена</h3>
      <p>Гид свяжется с вами в течение часа и подтвердит место. Если нужно срочно — напишите прямо в Telegram.</p>
      <div class="done__cta">
        <UiButton :href="CONTACTS.booking" variant="dark" size="sm">Написать в Telegram</UiButton>
        <UiButton variant="outline" size="sm" @click="again">Отправить ещё одну</UiButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row { display: flex; gap: 12px; flex-wrap: wrap; }
.row--mt { margin-top: 14px; }
.submit { margin-top: 18px; }
.err { margin-top: 12px; font-size: 14px; color: var(--color-hard); text-align: center; }
.note { margin-top: 14px; font-size: 13px; color: var(--color-muted); text-align: center; }
.note a { text-decoration: underline; }

/* поле телефона повторяет UiField, но с маской на вводе */
.field { flex: 1; min-width: 160px; }
.field label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 7px; color: var(--color-muted); }
.field input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1.5px solid transparent;
  background: var(--color-surface);
  font: inherit;
  font-size: 15px;
  color: var(--color-ink);
  transition: border-color .2s ease;
}
.field input:focus { border-color: var(--color-accent); outline: none; }
.field .is-bad { border-color: var(--color-hard); }
.field__err { margin-top: 6px; font-size: 13px; color: var(--color-hard); }

.field--people { flex: 0 0 auto; }
.people { display: flex; align-items: center; gap: 4px; background: var(--color-surface); border-radius: 12px; padding: 4px; }
.people button {
  width: 42px; height: 42px;
  border: 0; border-radius: 9px;
  background: var(--color-bg);
  font-size: 19px; font-weight: 700; line-height: 1;
  cursor: pointer; color: var(--color-ink);
}
.people button:hover { background: var(--color-line); }
.people output { min-width: 42px; text-align: center; font-family: var(--font-display); font-weight: 600; font-size: 16px; }

.done { text-align: center; padding: 8px 0; }
.done__ico { display: grid; place-items: center; width: 58px; height: 58px; margin: 0 auto 18px; border-radius: 50%; background: var(--color-easy); color: #fff; }
.done h3 { font-size: 22px; margin-bottom: 10px; }
.done p { color: var(--color-muted); max-width: 44ch; margin: 0 auto 20px; font-size: 15px; }
.done__cta { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
</style>
