<script setup lang="ts">
definePageMeta({ overHero: true })

const pains = [
  { title: 'Команда выгорела', text: 'Смена обстановки работает лучше, чем ещё один тимбилдинг в переговорке.' },
  { title: 'Новые люди не знакомы', text: 'За день на маршруте люди узнают друг друга лучше, чем за месяц в офисе.' },
  { title: 'Надоел ресторан', text: 'Корпоратив за столом все уже видели. Горы — нет.' },
]

const formats = [
  { title: 'Выездной день', text: 'Лес Сукок, прогулка, обед на природе. Самый простой вход.', from: '320 000' },
  { title: 'Тимбилдинг с активностями', text: 'Командные игры, ведущий, реквизит, зачёт по станциям.', from: '480 000' },
  { title: 'Поход', text: 'Маршрут по силам команды, два гида, настоящая вершина.', from: '420 000' },
  { title: 'Квест на природе', text: 'Сценарий, станции, судьи и финальный разбор.', from: '520 000' },
  { title: 'Зимний выезд', text: 'Снег, горячая кухня, тёплая зона и чай у костра.', from: '560 000' },
]

const takeOn = [
  'Транспорт: автобусы от офиса и обратно',
  'Гиды и инструкторы на всю группу',
  'Питание: от перекусов до полевой кухни',
  'Снаряжение и страховка по запросу',
  'Фотограф и видеоотчёт',
  'Программа и ведущий активностей',
]

const b2bFaq = [
  { id: 'b1', category: 'b2b' as const, question: 'Как оформляется договор?', answer: 'Подписываем договор на оказание услуг, выставляем счёт. После выезда передаём акт и все закрывающие документы. Работаем по безналичному расчёту.' },
  { id: 'b2', category: 'b2b' as const, question: 'Нужна ли предоплата?', answer: 'Для юридических лиц — предоплата 50%, остаток после выезда. Условия обсуждаем, если у вас другой регламент.' },
  { id: 'b3', category: 'b2b' as const, question: 'Что если в день выезда плохая погода?', answer: 'Решение принимаем вместе за сутки до выезда. Переносим дату без штрафов или меняем площадку на более защищённую.' },
  { id: 'b4', category: 'b2b' as const, question: 'Какой максимальный размер группы?', answer: 'Комфортно работаем до шестидесяти человек. Больше — тоже возможно, но нужно больше времени на подготовку.' },
  { id: 'b5', category: 'b2b' as const, question: 'А если в команде есть люди без физподготовки?', answer: 'Это норма. Подбираем площадку, где есть и маршрут, и зона отдыха: кто хочет — идёт, кто не хочет — остаётся с ведущим.' },
]

useSeoMeta({
  title: 'Корпоративные туры и тимбилдинг на природе — Ташкент | Ison Travel',
  description: 'Организуем выездной корпоратив для команды от 15 до 60 человек: транспорт, гиды, питание, активности и фотоотчёт. Работаем с юрлицами по договору и перечислению.',
  ogType: 'website',
})

useSchemaOrg([
  defineWebPage({ '@type': 'FAQPage' }),
  ...b2bFaq.map(f => defineQuestion({ name: f.question, acceptedAnswer: f.answer })),
])
</script>

<template>
  <div>
    <!-- ───────── Hero ───────── -->
    <section class="chero">
      <div class="chero__media ph">
        <img :src="asset('/img/stock/1037.jpg')" alt="Корпоративный выезд компании в лес" fetchpriority="high">
      </div>
      <div class="container-site chero__inner">
        <span class="eyebrow eyebrow-light">Для компаний</span>
        <h1>Тимбилдинг на природе для вашей команды</h1>
        <p class="chero__sub">
          Берём на себя весь выезд: транспорт, гиды, питание, активности и отчётные документы.
          От 15 до 60 человек, в двух часах от офиса.
        </p>
        <div class="chero__cta">
          <UiButton href="#kp" variant="cta" size="lg">Получить КП</UiButton>
          <UiButton href="#case" variant="ghost" size="lg">Смотреть кейс</UiButton>
        </div>
        <p class="chero__legal">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6.5 8.5l1.5 1.5 3-3.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5" />
          </svg>
          Договор, счёт, акт — всё официально, по перечислению
        </p>
      </div>
    </section>

    <div class="container-site">
      <!-- ───────── Боли ───────── -->
      <section v-reveal class="reveal csec">
        <UiSectionTitle eyebrow="Зачем" title="Когда это нужно" />
        <div class="pains">
          <article v-for="p in pains" :key="p.title" class="pain">
            <h3>{{ p.title }}</h3>
            <p>{{ p.text }}</p>
          </article>
        </div>
      </section>

      <!-- ───────── Форматы ───────── -->
      <section v-reveal class="reveal csec">
        <UiSectionTitle
          eyebrow="Форматы"
          title="Пять вариантов выезда"
          text="Цены указаны за человека при группе 25–40 человек. Точную смету считаем под задачу."
        />
        <div class="formats">
          <article v-for="f in formats" :key="f.title" class="format">
            <h3>{{ f.title }}</h3>
            <p>{{ f.text }}</p>
            <p class="format__price">от <b>{{ f.from }}</b> сум / чел.</p>
          </article>
        </div>
      </section>

      <!-- ───────── Кейс ───────── -->
      <section id="case" v-reveal class="reveal csec">
        <div class="case">
          <div class="case__media ph">
            <img :src="asset('/img/stock/1043.jpg')" alt="Выезд компании UzMetr в лес Сукок" loading="lazy">
          </div>
          <div class="case__text">
            <span class="eyebrow">Кейс</span>
            <h2>UzMetr: 35 человек в лесу Сукок</h2>
            <p>
              Суббота, золотая осень. Забрали команду от офиса в 8 утра, в 9:30 были на поляне.
              Прогулка по лесу, командные игры, обед на природе, фотограф весь день.
              В 17:00 всех вернули в город.
            </p>
            <dl class="case__stats">
              <div><dt>35</dt><dd>участников</dd></div>
              <div><dt>1 день</dt><dd>от сбора до возвращения</dd></div>
              <div><dt>0</dt><dd>вопросов у бухгалтерии</dd></div>
            </dl>
            <blockquote>
              «Всё закрыли сами: автобусы, еда, активности, фотограф.
              Бухгалтерия получила документы без единого вопроса.»
              <cite>Рустам А., UzMetr</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <!-- ───────── Что берём на себя ───────── -->
      <section v-reveal class="reveal csec">
        <UiSectionTitle eyebrow="Организация" title="Что берём на себя" />
        <ul class="take">
          <li v-for="t in takeOn" :key="t">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="8" style="fill: var(--color-primary)" fill-opacity=".12" />
              <path d="M5.8 9.2l2.1 2.1 4.3-4.6" style="stroke: var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ t }}
          </li>
        </ul>
      </section>

      <!-- ───────── Калькулятор ───────── -->
      <section v-reveal class="reveal csec">
        <UiSectionTitle
          eyebrow="Бюджет"
          title="Прикиньте стоимость"
          text="Подвигайте ползунок — увидите порядок цифр до разговора с менеджером."
        />
        <CorporateCalculator />
      </section>

      <!-- ───────── Форма КП ───────── -->
      <section id="kp" v-reveal class="reveal csec">
        <div class="kp">
          <div>
            <span class="eyebrow">Заявка</span>
            <h2>Пришлём коммерческое предложение</h2>
            <p class="kp__lead">
              Оставьте контакт — зададим три уточняющих вопроса и пришлём смету с программой
              в течение рабочего дня.
            </p>
            <ul class="kp__list">
              <li>Без предоплаты за просчёт</li>
              <li>Смета с разбивкой по статьям</li>
              <li>Два-три варианта программы на выбор</li>
            </ul>
          </div>
          <FormLead interest="Корпоративный выезд" :with-interest="false" submit-label="Получить КП" />
        </div>
      </section>

      <!-- ───────── FAQ ───────── -->
      <section v-reveal class="reveal csec csec--last">
        <UiSectionTitle eyebrow="Вопросы" title="Для юридических лиц" center />
        <div class="b2bfaq">
          <UiAccordion :items="b2bFaq" open-first />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.chero { position: relative; min-height: clamp(420px, 68vh, 640px); display: flex; align-items: flex-end; padding-bottom: clamp(36px, 5vw, 64px); overflow: hidden; }
.chero__media { position: absolute; inset: 0; aspect-ratio: auto; }
.chero__media::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(180deg, rgb(var(--overlay-rgb) / .74) 0%, rgb(var(--overlay-rgb) / .35) 42%, rgb(var(--overlay-rgb) / .92) 100%);
}
.chero__inner { position: relative; z-index: 3; color: #fff; padding-top: 120px; }
.chero h1 { font-size: clamp(30px, 5vw, 60px); max-width: 17ch; margin-top: 16px; }
.chero__sub { margin-top: 18px; max-width: 56ch; font-size: clamp(16px, 1.8vw, 20px); color: rgb(255 255 255 / .86); }
.chero__cta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }
.chero__legal { display: inline-flex; align-items: center; gap: 10px; margin-top: 26px; padding: 11px 18px; border-radius: 999px; background: rgb(255 255 255 / .12); font-size: 13.5px; font-weight: 600; }

.csec { padding: clamp(44px, 6vw, 80px) 0 0; }
.csec--last { padding-bottom: clamp(48px, 7vw, 96px); }
.csec :deep(.st) { margin-bottom: clamp(24px, 3vw, 40px); }

.pains { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.pain { padding: 26px; border: 1px solid var(--color-line); border-radius: var(--radius-card); background: var(--color-surface); }
.pain h3 { font-size: 18px; margin-bottom: 10px; }
.pain p { font-size: 15px; color: var(--color-muted); line-height: 1.6; }

.formats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.format { padding: 26px; border: 1px solid var(--color-line); border-radius: var(--radius-card); background: var(--color-surface); display: flex; flex-direction: column; transition: .22s; }
.format:hover { border-color: var(--color-primary); transform: translateY(-4px); box-shadow: var(--shadow-card); }
.format h3 { font-size: 18px; margin-bottom: 10px; }
.format p { font-size: 14.5px; color: var(--color-muted); line-height: 1.6; flex: 1; }
.format__price { margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--color-line); font-size: 14px; color: var(--color-muted); }
.format__price b { font-family: var(--font-display); font-size: 19px; font-weight: 600; color: var(--color-ink); }

.case { display: grid; grid-template-columns: .9fr 1.1fr; gap: 0; border-radius: var(--radius-xl2); overflow: hidden; border: 1px solid var(--color-line); background: var(--color-surface); }
.case__media { aspect-ratio: auto; min-height: 340px; }
.case__text { padding: clamp(26px, 4vw, 48px); }
.case__text h2 { font-size: clamp(22px, 2.8vw, 32px); margin: 14px 0 16px; }
.case__text > p { color: var(--color-body); line-height: 1.7; max-width: 56ch; }
.case__stats { display: flex; flex-wrap: wrap; gap: 32px; margin: 26px 0; }
.case__stats dt { font-family: var(--font-display); font-size: 28px; font-weight: 600; color: var(--color-primary); }
.case__stats dd { margin: 4px 0 0; font-size: 13.5px; color: var(--color-muted); }
.case blockquote { margin: 0; padding: 18px 22px; border-left: 3px solid var(--color-accent); background: var(--color-bg); border-radius: 0 12px 12px 0; font-size: 15px; line-height: 1.6; }
.case cite { display: block; margin-top: 10px; font-style: normal; font-size: 13.5px; font-weight: 700; color: var(--color-muted); }

.take { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px 24px; list-style: none; }
.take li { display: flex; align-items: center; gap: 12px; font-size: 15.5px; }
.take svg { flex: none; }

.kp { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px, 4vw, 56px); align-items: center; padding: clamp(28px, 4vw, 56px); border-radius: var(--radius-xl2); background: var(--color-accent-soft); }
.kp h2 { margin-top: 16px; font-size: clamp(24px, 3vw, 34px); }
.kp__lead { margin-top: 14px; color: var(--color-body); font-size: 16px; line-height: 1.6; }
.kp__list { margin-top: 20px; list-style: none; display: grid; gap: 8px; }
.kp__list li { position: relative; padding-left: 22px; font-size: 14.5px; color: var(--color-body); }
.kp__list li::before { content: ''; position: absolute; left: 0; top: 7px; width: 11px; height: 6px; border-left: 2px solid var(--color-accent-dark); border-bottom: 2px solid var(--color-accent-dark); transform: rotate(-45deg); }

.b2bfaq { max-width: 820px; margin-inline: auto; }

@media (max-width: 1100px) {
  .pains, .formats, .take { grid-template-columns: repeat(2, 1fr); }
  .case { grid-template-columns: 1fr; }
  .case__media { min-height: 240px; }
  .kp { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .pains, .formats, .take { grid-template-columns: 1fr; }
}
</style>
