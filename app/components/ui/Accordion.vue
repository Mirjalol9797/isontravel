<script setup lang="ts">
import type { FaqItem } from '~/types'

const props = defineProps<{ items: FaqItem[]; openFirst?: boolean }>()
const openId = ref<string | null>(props.openFirst ? (props.items[0]?.id ?? null) : null)
const toggle = (id: string) => { openId.value = openId.value === id ? null : id }
</script>

<template>
  <div>
    <div v-for="item in items" :key="item.id" class="acc" :class="{ 'is-open': openId === item.id }">
      <h3 class="acc__h">
        <button
          class="acc__btn"
          :aria-expanded="openId === item.id"
          :aria-controls="`acc-${item.id}`"
          @click="toggle(item.id)"
        >
          {{ item.question }}
          <span class="acc__ico" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </span>
        </button>
      </h3>
      <div :id="`acc-${item.id}`" class="acc__body" role="region">
        <div><p>{{ item.answer }}</p></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.acc { border-bottom: 1px solid var(--color-line); }
.acc__h { font: inherit; margin: 0; }
.acc__btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 22px 0;
  text-align: left;
  background: none;
  border: 0;
  cursor: pointer;
  color: inherit;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(16px, 1.7vw, 18px);
  line-height: 1.3;
}
.acc__ico {
  flex: none;
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 1.5px solid var(--color-line);
  display: grid;
  place-items: center;
  transition: .25s ease;
}
.acc.is-open .acc__ico {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-on-accent);
  transform: rotate(45deg);
}
.acc__body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; }
.acc.is-open .acc__body { grid-template-rows: 1fr; }
.acc__body > div { overflow: hidden; }
.acc__body p { padding-bottom: 24px; color: var(--color-muted); max-width: 70ch; }
</style>
