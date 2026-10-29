<script setup lang="ts">
const steps = [
  { title: 'Выбираете тур', text: 'Смотрите маршрут, сложность, программу по часам и что взять с собой.' },
  { title: 'Оставляете заявку', text: 'Заполняете форму — заявка сразу уходит гиду в Telegram, он подтверждает место.' },
  { title: 'Оплачиваете', text: 'Место закрепляется после полной оплаты. Юрлицам — по договору и перечислению.' },
  { title: 'Едете', text: 'Сбор в городе рано утром, вечером того же дня вы дома. Транспорт наш.' },
]
</script>

<template>
  <section class="section-tight">
    <div class="container-site">
      <UiSectionTitle
        v-reveal
        class="reveal"
        eyebrow="Как это проходит"
        title="Четыре шага до выезда"
        center
        style="margin-bottom: clamp(28px, 4vw, 52px)"
      />

      <ol v-reveal class="reveal steps">
        <li v-for="(s, i) in steps" :key="s.title" class="step">
          <span class="step__num">{{ i + 1 }}</span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; position: relative; list-style: none; }
.steps::before { content: ''; position: absolute; top: 28px; left: 7%; right: 7%; height: 2px; background: repeating-linear-gradient(90deg, var(--color-line) 0 8px, transparent 8px 16px); }
.step { position: relative; text-align: center; }
.step__num {
  width: 56px; height: 56px; margin: 0 auto 20px;
  border-radius: 50%; display: grid; place-items: center;
  background: var(--color-bg); border: 2px solid var(--color-line);
  font-family: var(--font-display); font-weight: 600; font-size: 18px; color: var(--color-primary);
  position: relative; z-index: 2;
}
.step:first-child .step__num { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); }
.step h3 { font-size: 18px; margin-bottom: 10px; }
.step p { font-size: 14.5px; color: var(--color-muted); }

@media (max-width: 860px) {
  .steps { grid-template-columns: repeat(2, 1fr); row-gap: 40px; }
  .steps::before { display: none; }
}
</style>
