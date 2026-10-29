<script setup lang="ts">
const { allDestinations } = useCatalog()
const destinations = allDestinations()
</script>

<template>
  <section class="section-tight">
    <div class="container-site">
      <UiSectionTitle
        v-reveal
        class="reveal"
        eyebrow="Направления"
        title="Куда мы возим"
        text="У каждого направления своя страница с описанием, сезонностью и турами."
        style="margin-bottom: clamp(28px, 4vw, 52px)"
      />

      <div v-reveal class="reveal mosaic">
        <NuxtLink
          v-for="d in destinations"
          :key="d.slug"
          :to="`/napravleniya/${d.slug}`"
          class="mtile"
        >
          <img :src="asset(d.cover)" :alt="d.name" loading="lazy" decoding="async">
          <div class="mtile__body">
            <div>
              <h3>{{ d.name }}</h3>
              <span>{{ d.toursCount }} туров · {{ d.seasons }}</span>
            </div>
            <span class="mtile__go" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mosaic { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 200px; gap: 16px; }
.mtile { position: relative; overflow: hidden; border-radius: var(--radius-card); display: flex; align-items: flex-end; }
.mtile:nth-child(1) { grid-column: span 2; grid-row: span 2; }
.mtile:nth-child(4), .mtile:nth-child(7) { grid-column: span 2; }
.mtile img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; transition: transform .6s cubic-bezier(.22, 1, .36, 1); }
.mtile:hover img { transform: scale(1.07); }
.mtile::before { content: ''; position: absolute; inset: 0; z-index: 2; background: linear-gradient(180deg, transparent 35%, rgb(var(--overlay-rgb) / .88) 100%); }
.mtile__body { position: relative; z-index: 3; width: 100%; padding: 20px; color: #fff; display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; }
.mtile__body h3 { font-size: clamp(18px, 2vw, 26px); }
.mtile__body span { font-size: 13px; color: rgb(255 255 255 / .75); display: block; margin-top: 4px; }
.mtile__go { flex: none; width: 38px; height: 38px; border-radius: 50%; background: rgb(255 255 255 / .16); backdrop-filter: blur(6px); display: grid; place-items: center; transition: background .22s ease, transform .22s ease; }
.mtile:hover .mtile__go { background: var(--color-accent); color: var(--color-on-accent); transform: rotate(-45deg); }

@media (max-width: 1100px) {
  .mosaic { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; }
  .mtile:nth-child(1) { grid-column: span 2; grid-row: span 1; }
}
@media (max-width: 560px) {
  .mosaic { grid-template-columns: 1fr; }
  .mtile, .mtile:nth-child(1), .mtile:nth-child(4), .mtile:nth-child(7) { grid-column: span 1; }
}
</style>
