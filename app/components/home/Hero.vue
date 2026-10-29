<script setup lang="ts">
const { nextDeparture } = useCatalog()
const next = nextDeparture()

const stats = [
  { to: 240, label: 'туров проведено' },
  { to: 3800, label: 'участников' },
  { to: 9, label: 'направлений' },
  { to: 6, label: 'гидов в команде' },
]
</script>

<template>
  <section class="hero">
    <div class="hero__media ph">
      <img
        :src="asset('/img/stock/1018.jpg')"
        alt="Горы в окрестностях Ташкента"
        fetchpriority="high"
      >
    </div>

    <div class="container-site hero__inner">
      <span class="eyebrow eyebrow-light">Ташкент · выезжаем каждые выходные</span>
      <h1>Походы выходного дня из Ташкента</h1>
      <p class="hero__sub">
        Горы, озёра и пещеры в двух часах от города. Транспорт, гиды и маршрут — на нас.
        Опыт и снаряжение не нужны.
      </p>

      <div class="hero__cta">
        <UiButton to="/tours" variant="cta" size="lg">
          Ближайшие выезды
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </UiButton>
        <UiButton to="/corporate" variant="ghost" size="lg">Корпоративный тур</UiButton>
      </div>

      <ul class="trust">
        <li v-for="s in stats" :key="s.label">
          <UiCounter :to="s.to" />
          <span>{{ s.label }}</span>
        </li>
      </ul>
    </div>

    <div v-if="next" class="hero__scroll">
      <span>листайте</span><i />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  padding-bottom: clamp(40px, 6vw, 72px);
  overflow: hidden;
}
.hero__media { position: absolute; inset: 0; aspect-ratio: auto; }
.hero__media::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(180deg,
    rgb(var(--overlay-rgb) / .62) 0%,
    rgb(var(--overlay-rgb) / .18) 36%,
    rgb(var(--overlay-rgb) / .5) 68%,
    rgb(var(--overlay-rgb) / .92) 100%);
}
.hero__inner { position: relative; z-index: 3; color: #fff; padding-top: 120px; }
.hero h1 { max-width: 15ch; margin-top: 16px; text-shadow: 0 2px 30px rgb(0 0 0 / .3); }
.hero__sub { max-width: 54ch; margin-top: 24px; font-size: clamp(16px, 1.9vw, 20px); color: rgb(255 255 255 / .88); }
.hero__cta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 36px; }

.trust {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(28px, 5vw, 64px);
  margin-top: clamp(40px, 6vw, 68px);
  padding-top: 32px;
  border-top: 1px solid rgb(255 255 255 / .22);
  list-style: none;
}
.trust :deep(b) { display: block; font-family: var(--font-display); font-size: clamp(28px, 3.6vw, 42px); font-weight: 600; line-height: 1; }
.trust span { display: block; margin-top: 8px; font-size: 14px; color: rgb(255 255 255 / .72); }

.hero__scroll {
  position: absolute;
  z-index: 3;
  bottom: 26px;
  right: var(--pad);
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: rgb(255 255 255 / .6);
}
.hero__scroll i { display: block; width: 1px; height: 42px; background: linear-gradient(var(--color-accent), transparent); animation: drop 1.9s ease-in-out infinite; }
@keyframes drop {
  0%, 100% { opacity: .3; transform: scaleY(.5); transform-origin: top; }
  50% { opacity: 1; transform: scaleY(1); }
}
</style>
