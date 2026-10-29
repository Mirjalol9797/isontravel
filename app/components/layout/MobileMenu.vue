<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })
const route = useRoute()

watch(open, (v) => { document.body.style.overflow = v ? 'hidden' : '' })
watch(() => route.fullPath, () => { open.value = false })
onBeforeUnmount(() => { document.body.style.overflow = '' })

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') open.value = false }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Transition name="mm">
    <div v-if="open" class="mm">
      <div class="mm__top container-site">
        <span class="logo">ISON<span>travel</span></span>
        <button class="mm__x" aria-label="Закрыть меню" @click="open = false">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>

      <nav class="mm__nav container-site" aria-label="Мобильная навигация">
        <NuxtLink v-for="(l, i) in NAV_LINKS" :key="l.to" :to="l.to" :style="{ '--i': i }">
          {{ l.label }}
        </NuxtLink>
      </nav>

      <div class="mm__foot container-site">
        <UiButton to="/tours" variant="cta" size="lg" block>Записаться на выезд</UiButton>
        <a :href="CONTACTS.phoneHref" class="mm__phone">{{ CONTACTS.phone }}</a>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.mm {
  position: fixed;
  inset: 0;
  z-index: 150;
  display: flex;
  flex-direction: column;
  background: var(--color-primary-deep);
  color: #fff;
  padding-block: 0 32px;
}
.mm__top { display: flex; align-items: center; justify-content: space-between; height: 76px; }
.logo { font-family: var(--font-display); font-weight: 700; font-size: 20px; }
.logo span { color: var(--color-accent); }
.mm__x { width: 44px; height: 44px; border: 0; background: rgb(255 255 255 / .1); border-radius: 50%; color: #fff; display: grid; place-items: center; cursor: pointer; }

.mm__nav { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 4px; }
.mm__nav a {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(28px, 8vw, 40px);
  letter-spacing: -.02em;
  padding: 10px 0;
  animation: rise .45s cubic-bezier(.22, 1, .36, 1) backwards;
  animation-delay: calc(var(--i) * 55ms + 80ms);
}
.mm__nav a.router-link-active { color: var(--color-accent); }
@keyframes rise { from { opacity: 0; transform: translateY(18px); } }

.mm__foot { display: grid; gap: 16px; }
.mm__phone { text-align: center; font-weight: 700; color: rgb(255 255 255 / .8); }

.mm-enter-active, .mm-leave-active { transition: opacity .25s ease; }
.mm-enter-from, .mm-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .mm__nav a { animation: none; }
}
</style>
