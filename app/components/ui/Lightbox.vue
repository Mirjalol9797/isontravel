<script setup lang="ts">
/** Просмотр галереи: стрелки, свайп, Esc, счётчик */
const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ images: string[]; alt?: string; start?: number }>()

const index = ref(props.start ?? 0)
const total = computed(() => props.images.length)

const go = (step: number) => {
  index.value = (index.value + step + total.value) % total.value
}

watch(open, (v) => {
  if (v) index.value = props.start ?? 0
  document.body.style.overflow = v ? 'hidden' : ''
})
onBeforeUnmount(() => { document.body.style.overflow = '' })

const onKey = (e: KeyboardEvent) => {
  if (!open.value) return
  if (e.key === 'Escape') open.value = false
  if (e.key === 'ArrowRight') go(1)
  if (e.key === 'ArrowLeft') go(-1)
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

/* свайп */
let startX = 0
const onStart = (e: TouchEvent) => { startX = e.touches[0]?.clientX ?? 0 }
const onEnd = (e: TouchEvent) => {
  const dx = (e.changedTouches[0]?.clientX ?? 0) - startX
  if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="lb">
      <div v-if="open" class="lb" role="dialog" aria-modal="true" aria-label="Просмотр фотографий">
        <button class="lb__x" aria-label="Закрыть" @click="open = false">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>

        <button v-if="total > 1" class="lb__nav lb__nav--prev" aria-label="Предыдущее фото" @click="go(-1)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <figure class="lb__stage" @touchstart.passive="onStart" @touchend.passive="onEnd">
          <img :src="asset(images[index])" :alt="alt ?? ''">
          <figcaption v-if="total > 1">{{ index + 1 }} / {{ total }}</figcaption>
        </figure>

        <button v-if="total > 1" class="lb__nav lb__nav--next" aria-label="Следующее фото" @click="go(1)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <div class="lb__scrim" @click="open = false" />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lb {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: clamp(16px, 4vw, 48px);
}
.lb__scrim { position: absolute; inset: 0; z-index: -1; background: rgb(var(--overlay-rgb) / .94); backdrop-filter: blur(6px); }

.lb__stage { margin: 0; display: grid; justify-items: center; gap: 14px; min-width: 0; }
.lb__stage img { max-width: 100%; max-height: 80vh; border-radius: var(--radius-card); object-fit: contain; }
.lb__stage figcaption { color: rgb(255 255 255 / .7); font-size: 13px; font-weight: 600; letter-spacing: .08em; }

.lb__x, .lb__nav {
  width: 48px; height: 48px;
  border: 0; border-radius: 50%;
  background: rgb(255 255 255 / .12);
  color: #fff;
  display: grid; place-items: center;
  cursor: pointer;
  transition: background .2s;
}
.lb__x:hover, .lb__nav:hover { background: var(--color-accent); color: var(--color-on-accent); }
.lb__x { position: absolute; top: clamp(16px, 4vw, 40px); right: clamp(16px, 4vw, 40px); z-index: 2; }

.lb-enter-active, .lb-leave-active { transition: opacity .2s ease; }
.lb-enter-from, .lb-leave-to { opacity: 0; }

@media (max-width: 760px) {
  .lb { grid-template-columns: 1fr; }
  .lb__nav { position: absolute; bottom: 24px; z-index: 2; }
  .lb__nav--prev { left: 24px; }
  .lb__nav--next { right: 24px; }
}
</style>
