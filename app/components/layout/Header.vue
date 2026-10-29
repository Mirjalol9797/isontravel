<script setup lang="ts">
/**
 * Шапка. На страницах с фото-героем лежит поверх него прозрачной,
 * на остальных сразу белая (solid).
 */
const props = defineProps<{ overHero?: boolean }>()

const solid = ref(!props.overHero)
const hidden = ref(false)
const menuOpen = ref(false)

let last = 0
const onScroll = () => {
  const y = window.scrollY
  solid.value = !props.overHero || y > 40
  hidden.value = y > 400 && y > last && !menuOpen.value
  last = y
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="hdr" :class="{ 'is-solid': solid, 'is-hidden': hidden }">
    <div class="container-site hdr__inner">
      <NuxtLink to="/" class="logo" aria-label="Ison Travel — на главную">
        ISON<span>travel</span>
      </NuxtLink>

      <nav class="nav" aria-label="Основная навигация">
        <NuxtLink v-for="l in NAV_LINKS" :key="l.to" :to="l.to">{{ l.label }}</NuxtLink>
      </nav>

      <div class="hdr__right">
        <UiButton to="/tours" variant="cta" size="sm">Записаться</UiButton>
      </div>

      <button class="burger" aria-label="Меню" :aria-expanded="menuOpen" @click="menuOpen = true">
        <span /><span /><span />
      </button>
    </div>

    <LayoutMobileMenu v-model:open="menuOpen" />
  </header>
</template>

<style scoped>
.hdr {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  transition: background .3s ease, box-shadow .3s ease, transform .3s ease;
}
.hdr.is-solid {
  background: rgb(255 255 255 / .92);
  backdrop-filter: blur(14px);
  box-shadow: 0 1px 0 var(--color-line);
}
.hdr.is-hidden { transform: translateY(-100%); }

.hdr__inner { display: flex; align-items: center; gap: 32px; height: 76px; }

.logo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -.02em;
  color: #fff;
  transition: color .3s;
}
.logo span { color: var(--color-accent); }
.hdr.is-solid .logo { color: var(--color-primary); }

.nav { display: flex; gap: 28px; margin-left: auto; }
.nav a {
  position: relative;
  font-size: 15px;
  font-weight: 600;
  color: rgb(255 255 255 / .88);
  transition: color .2s;
}
.nav a::after {
  content: '';
  position: absolute;
  left: 0; right: 100%; bottom: -5px;
  height: 2px;
  background: var(--color-accent);
  transition: right .25s ease;
}
.nav a:hover::after, .nav a.router-link-active::after { right: 0; }
.hdr.is-solid .nav a { color: var(--color-ink); }

.hdr__right { display: flex; align-items: center; gap: 18px; }

.burger { display: none; width: 44px; height: 44px; flex-direction: column; justify-content: center; gap: 5px; border: 0; background: none; cursor: pointer; }
.burger span { display: block; height: 2px; background: #fff; border-radius: 2px; }
.hdr.is-solid .burger span { background: var(--color-ink); }

@media (max-width: 860px) {
  .nav, .hdr__right { display: none; }
  .burger { display: flex; margin-left: auto; }
}
</style>
