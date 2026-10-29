<script setup lang="ts">
/**
 * Прикидка бюджета корпоративного выезда.
 * Цифры ориентировочные — точную смету считает менеджер,
 * об этом прямо написано под результатом.
 */
const { price } = useFormat()

const FORMATS = [
  { key: 'day', label: 'Выездной день', base: 320_000, hint: 'Лес Сукок, прогулка, обед на природе' },
  { key: 'team', label: 'Тимбилдинг с активностями', base: 480_000, hint: 'Командные игры, ведущий, реквизит' },
  { key: 'hike', label: 'Поход', base: 420_000, hint: 'Маршрут по силам команды, два гида' },
  { key: 'quest', label: 'Квест на природе', base: 520_000, hint: 'Сценарий, станции, судьи' },
  { key: 'winter', label: 'Зимний выезд', base: 560_000, hint: 'Снег, горячая кухня, тёплая зона' },
] as const

const SEASONS = [
  { key: 'autumn', label: 'Осень', k: 1.1 },
  { key: 'spring', label: 'Весна', k: 1.1 },
  { key: 'summer', label: 'Лето', k: 1 },
  { key: 'winter', label: 'Зима', k: 1.05 },
] as const

const people = ref(30)
const format = ref<string>('team')
const season = ref<string>('autumn')

/** Чем больше группа, тем дешевле на человека: транспорт и гиды делятся */
const groupFactor = (n: number) => (n > 40 ? 0.9 : n > 25 ? 0.95 : 1)

const perPerson = computed(() => {
  const f = FORMATS.find(x => x.key === format.value) ?? FORMATS[0]
  const s = SEASONS.find(x => x.key === season.value) ?? SEASONS[0]
  return Math.round(f.base * s.k * groupFactor(people.value) / 10_000) * 10_000
})

const total = computed(() => perPerson.value * people.value)
const low = computed(() => Math.round(total.value * 0.88 / 100_000) * 100_000)
const high = computed(() => Math.round(total.value * 1.12 / 100_000) * 100_000)

const activeFormat = computed(() => FORMATS.find(x => x.key === format.value) ?? FORMATS[0])
</script>

<template>
  <div class="calc">
    <div class="calc__form">
      <fieldset>
        <legend>Сколько человек</legend>
        <div class="calc__people">
          <input v-model.number="people" type="range" min="15" max="60" step="1" aria-label="Количество участников">
          <output>{{ people }}</output>
        </div>
      </fieldset>

      <fieldset>
        <legend>Формат</legend>
        <div class="calc__pills">
          <button
            v-for="f in FORMATS"
            :key="f.key"
            :class="{ 'is-on': format === f.key }"
            :aria-pressed="format === f.key"
            @click="format = f.key"
          >{{ f.label }}</button>
        </div>
        <p class="calc__hint">{{ activeFormat.hint }}</p>
      </fieldset>

      <fieldset>
        <legend>Когда</legend>
        <div class="calc__pills">
          <button
            v-for="s in SEASONS"
            :key="s.key"
            :class="{ 'is-on': season === s.key }"
            :aria-pressed="season === s.key"
            @click="season = s.key"
          >{{ s.label }}</button>
        </div>
      </fieldset>
    </div>

    <div class="calc__out">
      <p class="calc__label">Ориентировочный бюджет</p>
      <p class="calc__sum">{{ price(low) }} — {{ price(high) }}</p>
      <p class="calc__per">около {{ price(perPerson) }} сум на человека</p>

      <ul class="calc__incl">
        <li>Транспорт туда и обратно</li>
        <li>Гиды и сопровождение</li>
        <li>Питание на выезде</li>
        <li>Фото- и видеоотчёт</li>
      </ul>

      <p class="calc__note">
        Это прикидка, а не счёт. Точную смету пришлём после короткого разговора —
        она зависит от площадки, меню и программы.
      </p>
    </div>
  </div>
</template>

<style scoped>
.calc {
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 0;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-xl2);
  overflow: hidden;
  background: var(--color-surface);
}

.calc__form { padding: clamp(24px, 3vw, 36px); display: grid; gap: 26px; }
fieldset { border: 0; padding: 0; margin: 0; }
legend { font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--color-muted); margin-bottom: 12px; }

.calc__people { display: flex; align-items: center; gap: 18px; }
.calc__people input { flex: 1; accent-color: var(--color-primary); }
.calc__people output {
  flex: none;
  min-width: 64px;
  text-align: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-family: var(--font-display);
  font-weight: 600;
}

.calc__pills { display: flex; flex-wrap: wrap; gap: 8px; }
.calc__pills button {
  padding: 9px 16px;
  border-radius: 999px;
  border: 1px solid var(--color-line);
  background: var(--color-surface);
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: inherit;
  transition: .2s;
}
.calc__pills button:hover { border-color: var(--color-primary); }
.calc__pills button.is-on { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-on-primary); }
.calc__hint { margin-top: 10px; font-size: 13.5px; color: var(--color-muted); }

.calc__out { padding: clamp(24px, 3vw, 36px); background: var(--color-primary); color: #fff; }
.calc__label { font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: rgb(255 255 255 / .6); }
.calc__sum { font-family: var(--font-display); font-size: clamp(26px, 3.4vw, 38px); font-weight: 600; letter-spacing: -.02em; margin-top: 10px; }
.calc__per { font-size: 14.5px; color: var(--color-accent); font-weight: 700; margin-top: 6px; }

.calc__incl { list-style: none; margin: 22px 0; display: grid; gap: 9px; }
.calc__incl li { position: relative; padding-left: 24px; font-size: 14.5px; color: rgb(255 255 255 / .85); }
.calc__incl li::before {
  content: '';
  position: absolute;
  left: 0; top: 7px;
  width: 12px; height: 7px;
  border-left: 2px solid var(--color-accent);
  border-bottom: 2px solid var(--color-accent);
  transform: rotate(-45deg);
}

.calc__note { font-size: 13px; line-height: 1.55; color: rgb(255 255 255 / .62); padding-top: 18px; border-top: 1px solid rgb(255 255 255 / .18); }

@media (max-width: 860px) { .calc { grid-template-columns: 1fr; } }
</style>
