<template>
  <section class="section-tight">
    <div class="container-site">
      <div v-reveal class="reveal cta">
        <div>
          <span class="eyebrow">Заявка</span>
          <h2>Не знаете, какой тур выбрать?</h2>
          <p class="cta__lead">
            Оставьте номер — гид позвонит, расспросит про опыт и подберёт маршрут под вас.
            Это бесплатно и ни к чему не обязывает.
          </p>
        </div>
        <FormLead />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background: var(--color-accent-soft);
  border-radius: var(--radius-xl2);
  padding: clamp(32px, 5vw, 64px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(28px, 4vw, 56px);
  align-items: center;
}
.cta h2 { margin-top: 16px; }
.cta__lead { margin-top: 16px; color: var(--color-body); font-size: clamp(16px, 1.8vw, 20px); line-height: 1.55; }

@media (max-width: 1100px) { .cta { grid-template-columns: 1fr; } }
</style>
