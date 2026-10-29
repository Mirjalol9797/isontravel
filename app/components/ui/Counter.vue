<script setup lang="ts">
const props = withDefaults(defineProps<{ to: number; duration?: number }>(), { duration: 1400 })

const el = ref<HTMLElement | null>(null)
const shown = ref(0)
const fmt = new Intl.NumberFormat('ru-RU')

onMounted(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) { shown.value = props.to; return }

  const io = new IntersectionObserver((entries, obs) => {
    if (!entries.some(e => e.isIntersecting)) return
    obs.disconnect()
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - t0) / props.duration, 1)
      shown.value = Math.round(props.to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
  if (el.value) io.observe(el.value)
})
</script>

<template>
  <b ref="el">{{ fmt.format(shown) }}</b>
</template>
