<script setup lang="ts">
/** Липкая панель на мобильном: ближайший выезд всегда под рукой */
const { nextDeparture } = useCatalog()
const { price, dayMonth, statusLabel } = useFormat()
const next = nextDeparture()

/** На карточке тура своя панель брони — две сразу не нужны */
const route = useRoute()
const hidden = computed(() => route.path.startsWith('/tours/'))

const shown = ref(false)
const onScroll = () => { shown.value = window.scrollY > window.innerHeight * 0.7 }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div v-if="next && !hidden" class="mcta" :class="{ 'is-on': shown }">
    <NuxtLink :to="`/tours/${next.tour.slug}`" class="mcta__t">
      <b>{{ next.tour.title }} · {{ dayMonth(next.date.date) }}</b>
      <span>{{ price(next.date.price) }} сум · {{ statusLabel(next.date.status, next.date.seatsLeft) }}</span>
    </NuxtLink>
    <UiButton :to="`/tours/${next.tour.slug}`" variant="cta" size="sm">Записаться</UiButton>
  </div>
</template>

<style scoped>
.mcta {
  position: fixed;
  z-index: 90;
  left: 12px; right: 12px; bottom: 12px;
  display: none;
  align-items: center;
  gap: 12px;
  padding: 10px 10px 10px 18px;
  border-radius: 999px;
  background: rgb(var(--overlay-rgb) / .96);
  backdrop-filter: blur(12px);
  color: #fff;
  box-shadow: var(--shadow-float);
  transform: translateY(140%);
  transition: transform .35s cubic-bezier(.22, 1, .36, 1);
}
.mcta.is-on { transform: none; }
.mcta__t { flex: 1; min-width: 0; }
.mcta__t b { display: block; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mcta__t span { font-size: 12px; color: rgb(255 255 255 / .65); }

@media (max-width: 760px) { .mcta { display: flex; } }
</style>
