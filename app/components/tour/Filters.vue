<script setup lang="ts">
import type { Difficulty } from '~/types'

const { allDestinations } = useCatalog()
const { destination, difficulty, duration, sort, active, clear } = useTourFilters()

const destinations = allDestinations()
const open = ref(false)

/** Кнопка-переключатель: повторное нажатие снимает фильтр */
const toggleDifficulty = (key: Difficulty) => {
  difficulty.value = difficulty.value === key ? '' : key
}
const toggleDuration = (key: string) => {
  duration.value = duration.value === key ? '' : key
}
</script>

<template>
  <div class="filters">
    <button class="filters__open" @click="open = true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 4h12M4 8h8M6.5 12h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      </svg>
      Фильтры
      <span v-if="active.length" class="filters__count">{{ active.length }}</span>
    </button>

    <div class="filters__panel" :class="{ 'is-open': open }">
      <header class="filters__head">
        <b>Фильтры</b>
        <button aria-label="Закрыть" @click="open = false">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>

      <div class="filters__body">
        <fieldset>
          <legend>Направление</legend>
          <select v-model="destination">
            <option value="">Любое</option>
            <option v-for="d in destinations" :key="d.slug" :value="d.slug">{{ d.name }}</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>Сложность</legend>
          <div class="pills">
            <button
              v-for="d in DIFFICULTIES"
              :key="d.key"
              :class="{ 'is-on': difficulty === d.key }"
              :aria-pressed="difficulty === d.key"
              @click="toggleDifficulty(d.key)"
            >{{ d.label }}</button>
          </div>
        </fieldset>

        <fieldset>
          <legend>Длительность</legend>
          <div class="pills">
            <button
              v-for="d in DURATIONS"
              :key="d.key"
              :class="{ 'is-on': duration === d.key }"
              :aria-pressed="duration === d.key"
              @click="toggleDuration(d.key)"
            >{{ d.label }}</button>
          </div>
        </fieldset>

        <fieldset>
          <legend>Сортировка</legend>
          <select v-model="sort">
            <option v-for="s in SORTS" :key="s.key" :value="s.key">{{ s.label }}</option>
          </select>
        </fieldset>
      </div>

      <footer class="filters__foot">
        <UiButton variant="outline" size="sm" @click="clear()">Сбросить</UiButton>
        <UiButton variant="cta" size="sm" @click="open = false">Показать</UiButton>
      </footer>
    </div>

    <div v-if="open" class="filters__scrim" @click="open = false" />
  </div>
</template>

<style scoped>
.filters__open {
  display: none;
  align-items: center;
  gap: 9px;
  padding: 12px 20px;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  background: var(--color-surface);
  font-weight: 700;
  font-size: 14.5px;
  cursor: pointer;
  color: inherit;
}
.filters__count {
  min-width: 20px; height: 20px;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-size: 12px;
  display: grid; place-items: center;
  padding: 0 6px;
}

.filters__head, .filters__foot { display: none; }

.filters__body { display: flex; flex-wrap: wrap; gap: 20px 28px; align-items: flex-end; }
fieldset { border: 0; padding: 0; margin: 0; }
legend { font-size: 12px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--color-muted); margin-bottom: 9px; }

select {
  padding: 11px 16px;
  border-radius: 999px;
  border: 1px solid var(--color-line);
  background: var(--color-surface);
  font: inherit;
  font-size: 14.5px;
  font-weight: 600;
  color: inherit;
  cursor: pointer;
}

.pills { display: flex; gap: 8px; flex-wrap: wrap; }
.pills button {
  padding: 10px 17px;
  border-radius: 999px;
  border: 1px solid var(--color-line);
  background: var(--color-surface);
  font-size: 14.5px;
  font-weight: 600;
  cursor: pointer;
  color: inherit;
  transition: .2s;
}
.pills button:hover { border-color: var(--color-primary); }
.pills button.is-on { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-on-primary); }

/* --- на телефоне фильтры уезжают в нижнюю шторку --- */
@media (max-width: 860px) {
  .filters__open { display: inline-flex; }

  .filters__panel {
    position: fixed;
    z-index: 160;
    left: 0; right: 0; bottom: 0;
    max-height: 85vh;
    overflow: auto;
    background: var(--color-surface);
    border-radius: var(--radius-xl2) var(--radius-xl2) 0 0;
    box-shadow: var(--shadow-float);
    transform: translateY(100%);
    transition: transform .3s cubic-bezier(.22, 1, .36, 1);
  }
  .filters__panel.is-open { transform: none; }

  .filters__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 10px;
    font-size: 18px;
  }
  .filters__head button { border: 0; background: none; cursor: pointer; color: inherit; padding: 6px; }

  .filters__body { flex-direction: column; align-items: stretch; padding: 10px 20px 20px; }
  select { width: 100%; }

  .filters__foot {
    display: flex;
    gap: 10px;
    padding: 16px 20px calc(16px + env(safe-area-inset-bottom));
    border-top: 1px solid var(--color-line);
    position: sticky;
    bottom: 0;
    background: var(--color-surface);
  }
  .filters__foot > * { flex: 1; }

  .filters__scrim { position: fixed; inset: 0; z-index: 155; background: rgb(var(--overlay-rgb) / .5); }
}
</style>
