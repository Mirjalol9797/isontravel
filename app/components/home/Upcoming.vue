<script setup lang="ts">
const { upcoming } = useCatalog()
/** По одному ближайшему выезду на тур — витрина, а не расписание */
const next = upcoming(4, true)

/** Обратный отсчёт до самого ближнего выезда */
const nearest = next[0]
const left = ref('')
let timer: ReturnType<typeof setInterval> | undefined

const tick = () => {
  if (!nearest) return
  const [h, m] = nearest.date.departAt.split(':').map(Number)
  const target = new Date(nearest.date.date)
  target.setHours(h ?? 6, m ?? 0, 0, 0)

  const diff = target.getTime() - Date.now()
  if (diff <= 0) { left.value = ''; return }

  const d = Math.floor(diff / 864e5)
  const hh = Math.floor((diff % 864e5) / 36e5)
  const mm = Math.floor((diff % 36e5) / 6e4)
  left.value = d > 0 ? `${d}д ${hh}ч ${mm}м` : `${hh}ч ${mm}м`
}

onMounted(() => { tick(); timer = setInterval(tick, 30_000) })
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="tours" class="section">
    <div class="container-site">
      <div v-reveal class="reveal sec-head">
        <UiSectionTitle
          eyebrow="Ближайшие выезды"
          title="Куда идём в ближайшие выходные"
          text="Места закрепляются после оплаты. Группы небольшие — обычно 12–18 человек."
        />
        <NuxtLink to="/schedule" class="link-arrow">
          Всё расписание
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>

      <div class="grid-tours">
        <TourCard
          v-for="(item, i) in next"
          :key="item.date.id"
          v-reveal="i"
          class="reveal"
          :tour="item.tour"
          :date="item.date"
          :hot="i === 0"
        >
          <template v-if="i === 0 && left" #top>
            <p class="countdown">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.6" />
                <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              </svg>
              до выезда <b>{{ left }}</b>
            </p>
          </template>
        </TourCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid-tours { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

.countdown {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 20px;
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-size: 13px;
  font-weight: 700;
}
.countdown b { font-family: var(--font-display); letter-spacing: .02em; }

@media (max-width: 1100px) { .grid-tours { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 760px) { .grid-tours { grid-template-columns: 1fr; } }
</style>
