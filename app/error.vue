<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { upcoming } = useCatalog()
const popular = upcoming(3, true)

const is404 = computed(() => props.error?.statusCode === 404)

useSeoMeta({
  title: is404.value ? 'Страница не найдена — Ison Travel' : 'Ошибка — Ison Travel',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <div class="err">
    <LayoutHeader />

    <main class="container-site err__main">
      <p class="err__code">{{ error?.statusCode ?? 500 }}</p>
      <h1>{{ is404 ? 'Такой страницы нет' : 'Что-то сломалось' }}</h1>
      <p class="err__text">
        {{ is404
          ? 'Возможно, тур уехал, а ссылка осталась. Посмотрите, что у нас есть сейчас.'
          : 'Мы уже чиним. Попробуйте обновить страницу или вернитесь на главную.' }}
      </p>

      <div class="err__cta">
        <UiButton to="/tours" variant="cta">Смотреть туры</UiButton>
        <UiButton to="/" variant="outline">На главную</UiButton>
      </div>

      <section v-if="is404 && popular.length" class="err__tours">
        <h2>Ближайшие выезды</h2>
        <div class="err__grid">
          <TourCard v-for="item in popular" :key="item.date.id" :tour="item.tour" :date="item.date" />
        </div>
      </section>
    </main>

    <LayoutFooter />
  </div>
</template>

<style scoped>
.err { display: flex; flex-direction: column; min-height: 100vh; }
.err__main { flex: 1; padding: 140px 20px clamp(48px, 7vw, 96px); text-align: center; }

.err__code {
  font-family: var(--font-display);
  font-size: clamp(72px, 16vw, 180px);
  font-weight: 700;
  line-height: .9;
  letter-spacing: -.04em;
  color: var(--color-accent);
}
.err h1 { font-size: clamp(26px, 4vw, 44px); margin-top: 12px; }
.err__text { margin: 16px auto 0; max-width: 46ch; color: var(--color-muted); font-size: clamp(15px, 1.7vw, 18px); }

.err__cta { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 28px; }

.err__tours { margin-top: clamp(48px, 7vw, 88px); text-align: left; }
.err__tours h2 { font-size: clamp(20px, 2.4vw, 26px); margin-bottom: 20px; text-align: center; }
.err__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

@media (max-width: 900px) { .err__grid { grid-template-columns: 1fr; } }
</style>
