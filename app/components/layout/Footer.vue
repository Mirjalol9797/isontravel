<script setup lang="ts">
const { allDestinations } = useCatalog()
const destinations = allDestinations().slice(0, 5)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container-site">
      <div class="footer__grid">
        <div>
          <NuxtLink to="/" class="footer__logo">ISON<span>travel</span></NuxtLink>
          <p class="footer__about">
            Походы и корпоративные выезды из Ташкента с 2019 года. Официально, по договору.
          </p>
          <div class="soc">
            <a :href="CONTACTS.telegram" target="_blank" rel="noopener" aria-label="Telegram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3L18.7 19c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.3-.1-.5-.6-.2L6.2 12.1 1.3 10.6c-1-.3-1.1-1 .2-1.5L20.5 2.9c.9-.3 1.6.2 1.4 1.4z"/></svg>
            </a>
            <a :href="CONTACTS.instagram" target="_blank" rel="noopener" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h2 class="footer__h">Туры</h2>
          <ul>
            <li v-for="l in FOOTER_TOURS" :key="l.to"><NuxtLink :to="l.to">{{ l.label }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h2 class="footer__h">Направления</h2>
          <ul>
            <li v-for="d in destinations" :key="d.slug">
              <NuxtLink :to="`/napravleniya/${d.slug}`">{{ d.name }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="footer__h">Компания</h2>
          <ul>
            <li><NuxtLink to="/about">О нас</NuxtLink></li>
            <li><NuxtLink to="/news">Новости</NuxtLink></li>
            <li><NuxtLink to="/reviews">Отзывы</NuxtLink></li>
            <li><NuxtLink to="/faq">Частые вопросы</NuxtLink></li>
            <li><NuxtLink to="/corporate">Корпоративным</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h2 class="footer__h">Контакты</h2>
          <ul>
            <li><a :href="CONTACTS.phoneHref">{{ CONTACTS.phone }}</a></li>
            <li><a :href="CONTACTS.telegram" target="_blank" rel="noopener">{{ CONTACTS.telegramName }}</a></li>
            <li><NuxtLink to="/contacts">Все контакты</NuxtLink></li>
            <li><NuxtLink to="/cancellation">Оферта и условия отмены</NuxtLink></li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <span>© {{ year }} Ison Travel</span>
        <span>Походы выходного дня из Ташкента</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--color-primary-deep);
  color: rgb(255 255 255 / .72);
  padding-top: clamp(48px, 6vw, 80px);
  margin-top: var(--section);
}
.footer__grid {
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  gap: 40px;
  padding-bottom: 48px;
}
.footer__logo { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 16px; display: block; }
.footer__logo span { color: var(--color-accent); }
.footer__about { font-size: 14.5px; max-width: 34ch; }
.footer__h { font-family: var(--font-display); font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 18px; letter-spacing: .02em; }
.footer li + li { margin-top: 11px; }
.footer a { font-size: 14.5px; transition: color .2s; }
.footer a:hover { color: var(--color-accent); }
.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  padding: 24px 0;
  border-top: 1px solid rgb(255 255 255 / .12);
  font-size: 13px;
}
.soc { display: flex; gap: 10px; margin-top: 20px; }
.soc a { width: 40px; height: 40px; border-radius: 50%; background: rgb(255 255 255 / .1); display: grid; place-items: center; color: #fff; transition: background .2s ease, transform .2s ease; }
.soc a:hover { background: var(--color-accent); color: var(--color-on-accent); transform: translateY(-3px); }

@media (max-width: 1100px) { .footer__grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 760px) { .footer__grid { grid-template-columns: 1fr; gap: 32px; } }
</style>
