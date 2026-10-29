<script setup lang="ts">
const { allGuides, allTours } = useCatalog()
const guides = allGuides()

const stats = [
  { to: 240, label: 'туров проведено' },
  { to: 3800, label: 'участников' },
  { to: allTours().length, label: 'маршрутов в расписании' },
  { to: 7, label: 'лет в горах' },
]

const values = [
  {
    title: 'Темп по самому медленному',
    text: 'В группе всегда есть тот, кому тяжелее. Мы идём по нему, а не по самому быстрому — поэтому доходят все.',
  },
  {
    title: 'Небольшие группы',
    text: 'Десять-двадцать человек. Больше — это уже не поход, а колонна: гид перестаёт видеть каждого.',
  },
  {
    title: 'Честные условия',
    text: 'Цена, что входит и что будет при отказе — написано до оплаты, а не в переписке после.',
  },
  {
    title: 'Официально',
    text: 'С компаниями работаем по договору и перечислению, отдаём все закрывающие документы.',
  },
]

useSeoMeta({
  title: 'О нас — команда Ison Travel, Ташкент',
  description: 'Кто водит наши походы: Исон, Ильвина, Иброхим и Абдулазиз. Как мы работаем, почему группы небольшие и что входит в наши туры.',
})
</script>

<template>
  <div class="container-site about">
    <UiBreadcrumbs :items="[{ label: 'О нас' }]" />

    <section class="about__intro">
      <UiSectionTitle as="h1" eyebrow="О нас" title="Мы водим людей в горы с 2019 года" />
      <div class="about__text">
        <p>
          Начиналось всё с того, что Исон звал знакомых на выходные в Чимган. Ходили своей компанией,
          потом знакомые стали приводить знакомых, и в какой-то момент выездов стало больше, чем свободных суббот.
        </p>
        <p>
          Сейчас в команде шесть человек, расписание расписано на месяцы вперёд, а к нам приезжают компании
          на корпоративные выезды. Но суть не изменилась: мы возим туда, куда ходили бы сами.
        </p>
        <p>
          Большинство наших участников идут в горы впервые. Поэтому мы объясняем, что брать, держим темп
          по силам группы и никогда не бросаем отстающих — это не про спорт, это про хороший день.
        </p>
      </div>
    </section>

    <ul v-reveal class="reveal about__stats">
      <li v-for="s in stats" :key="s.label">
        <UiCounter :to="s.to" />
        <span>{{ s.label }}</span>
      </li>
    </ul>

    <section v-reveal class="reveal about__sec">
      <UiSectionTitle eyebrow="Принципы" title="Как мы работаем" />
      <div class="values">
        <article v-for="v in values" :key="v.title" class="value">
          <h3>{{ v.title }}</h3>
          <p>{{ v.text }}</p>
        </article>
      </div>
    </section>

    <section v-reveal class="reveal about__sec">
      <UiSectionTitle eyebrow="Команда" title="Гиды" text="У каждого своя специализация и свои любимые маршруты." />
      <div class="guides">
        <NuxtLink v-for="g in guides" :key="g.slug" :to="`/guides/${g.slug}`" class="guide">
          <UiPhoto :src="g.photo" :alt="g.name" ratio="3 / 4" class="guide__media" />
          <h3>{{ g.name }}</h3>
          <p>{{ g.role }} · {{ g.experience }}</p>
        </NuxtLink>
      </div>
    </section>

    <section v-reveal class="reveal about__cta">
      <div>
        <h2>Пойдёте с нами?</h2>
        <p>Выберите маршрут в расписании или оставьте номер — подберём под ваш уровень.</p>
      </div>
      <div class="about__cta-btns">
        <UiButton to="/schedule" variant="cta">Смотреть расписание</UiButton>
        <UiButton to="/contacts" variant="outline">Связаться</UiButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about { padding-bottom: clamp(48px, 7vw, 96px); }

.about__intro { display: grid; grid-template-columns: .9fr 1.1fr; gap: clamp(28px, 5vw, 64px); align-items: start; margin: 8px 0 clamp(36px, 5vw, 56px); }
.about__text p { color: var(--color-body); line-height: 1.75; font-size: 16.5px; }
.about__text p + p { margin-top: 16px; }

.about__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: clamp(26px, 3vw, 40px);
  border-radius: var(--radius-xl2);
  background: var(--color-primary);
  color: #fff;
  list-style: none;
}
.about__stats :deep(b) { display: block; font-family: var(--font-display); font-size: clamp(26px, 3.4vw, 40px); font-weight: 600; line-height: 1; }
.about__stats span { display: block; margin-top: 8px; font-size: 13.5px; color: rgb(255 255 255 / .72); }

.about__sec { padding-top: clamp(44px, 6vw, 80px); }
.about__sec :deep(.st) { margin-bottom: clamp(24px, 3vw, 36px); }

.values { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.value { padding: 26px; border: 1px solid var(--color-line); border-radius: var(--radius-card); background: var(--color-surface); }
.value h3 { font-size: 18px; margin-bottom: 10px; }
.value p { font-size: 15px; color: var(--color-muted); line-height: 1.65; }

.guides { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.guide__media { border-radius: var(--radius-card); margin-bottom: 16px; }
.guide__media :deep(img) { transition: transform .5s cubic-bezier(.22, 1, .36, 1); }
.guide:hover .guide__media :deep(img) { transform: scale(1.05); }
.guide h3 { font-size: 19px; margin-bottom: 4px; }
.guide p { font-size: 14px; color: var(--color-muted); }

.about__cta {
  margin-top: clamp(44px, 6vw, 80px);
  padding: clamp(28px, 4vw, 48px);
  border-radius: var(--radius-xl2);
  background: var(--color-accent-soft);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.about__cta h2 { font-size: clamp(22px, 2.8vw, 30px); }
.about__cta p { margin-top: 8px; color: var(--color-body); }
.about__cta-btns { display: flex; gap: 10px; flex-wrap: wrap; }

@media (max-width: 1100px) {
  .about__intro { grid-template-columns: 1fr; }
  .about__stats { grid-template-columns: repeat(2, 1fr); }
  .guides { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) { .values { grid-template-columns: 1fr; } }
</style>
