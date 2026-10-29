<template>
  <section class="section-tight">
    <div class="container-site">
      <div v-reveal class="reveal band">
        <div class="band__grid">
          <div class="band__text">
            <span class="eyebrow eyebrow-light">Для компаний</span>
            <h2>Тимбилдинг на природе вместо корпоратива в ресторане</h2>
            <p>
              Организуем выезд для всей команды: транспорт, гиды, питание, активности
              и фотоотчёт. От 15 до 60 человек.
            </p>

            <dl class="band__stats">
              <div><dt>35</dt><dd>участников<br>в выезде UzMetr</dd></div>
              <div><dt>1 день</dt><dd>от сбора<br>до возвращения</dd></div>
              <div><dt>100%</dt><dd>официально,<br>с документами</dd></div>
            </dl>

            <div class="band__cta">
              <UiButton to="/corporate" variant="cta">Получить КП</UiButton>
              <UiButton to="/corporate#case" variant="ghost">Смотреть кейс</UiButton>
            </div>

            <p class="band__note">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6.5 8.5l1.5 1.5 3-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5" />
              </svg>
              Работаем с юрлицами по перечислению — счёт, договор, акт
            </p>
          </div>

          <div class="band__media ph">
            <img :src="asset('/img/stock/1037.jpg')" alt="Корпоративный выезд в лес Сукок" loading="lazy" decoding="async">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.band { background: var(--color-primary); color: #fff; border-radius: var(--radius-xl2); overflow: hidden; }
.band__grid { display: grid; grid-template-columns: 1.05fr .95fr; }
.band__text { padding: clamp(32px, 5vw, 64px); display: flex; flex-direction: column; justify-content: center; }
.band__text h2 { margin: 16px 0 20px; }
.band__text > p { color: rgb(255 255 255 / .8); max-width: 46ch; }

.band__stats { display: flex; flex-wrap: wrap; gap: 40px; margin: 32px 0; }
.band__stats dt { font-family: var(--font-display); font-size: 34px; font-weight: 600; color: var(--color-accent); line-height: 1; }
.band__stats dd { font-size: 13.5px; color: rgb(255 255 255 / .7); margin: 6px 0 0; }

.band__cta { display: flex; gap: 12px; flex-wrap: wrap; }
.band__note {
  display: inline-flex; align-items: center; gap: 10px;
  margin-top: 26px; padding: 11px 18px;
  border-radius: 999px; background: rgb(255 255 255 / .1);
  font-size: 13.5px; font-weight: 600; align-self: flex-start;
}
.band__media { position: relative; min-height: 340px; aspect-ratio: auto; }

@media (max-width: 1100px) {
  .band__grid { grid-template-columns: 1fr; }
  .band__media { min-height: 260px; order: -1; }
}
</style>
