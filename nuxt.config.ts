import tailwindcss from '@tailwindcss/vite'

/**
 * Домен нужен модулям SEO для абсолютных URL в sitemap, canonical и og:image.
 * На GitHub Pages он известен только после создания репозитория,
 * поэтому берётся из переменной окружения с запасным значением.
 */
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://isontravel.uz'
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-29',
  devtools: { enabled: true },

  modules: ['@nuxt/image', '@nuxt/icon', '@vueuse/nuxt', '@nuxtjs/seo'],

  css: ['~/assets/css/main.css'],

  site: {
    url: siteUrl,
    name: 'Ison Travel',
    description: 'Походы выходного дня и корпоративные выезды из Ташкента',
    defaultLocale: 'ru',
  },

  robots: {
    // Служебные пути в индекс не пускаем
    disallow: ['/_nuxt'],
    // robots.txt обязан лежать в корне домена. Если сайт развёрнут
    // в подпапке (owner.github.io/repo/), файл физически некуда положить —
    // поисковик его там не ищет. Тогда не генерируем совсем.
    robotsTxt: !baseURL || baseURL === '/',
  },

  sitemap: {
    exclude: ['/ui-kit'],
  },

  schemaOrg: {
    identity: {
      type: 'LocalBusiness',
      name: 'Ison Travel',
      description: 'Походы выходного дня, треккинг и корпоративные выезды из Ташкента',
      url: siteUrl,
      logo: `${siteUrl}/img/logo.png`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ташкент',
        addressCountry: 'UZ',
      },
      sameAs: [
        'https://t.me/ison_travel_ru',
      ],
    },
  },

  ogImage: {
    // Картинки для превью рисуем сами в компоненте OgImage
    defaults: { component: 'Default', width: 1200, height: 630 },
  },

  vite: {
    plugins: [tailwindcss()],
    vue: {
      template: {
        // Пути вида /img/... лежат в public/ и отдаются как есть.
        // Без этого Vue пытается импортировать их как модули и падает.
        transformAssetUrls: { includeAbsolute: false },
      },
    },
  },

  app: {
    // На GitHub Pages проект часто живёт в подпапке owner.github.io/repo/.
    // Значение приходит из переменной окружения при сборке.
    baseURL,

    head: {
      htmlAttrs: { lang: 'ru' },
      // Название компании уже вшито в каждый title вручную —
      // иначе модуль SEO приписывает его вторым хвостом
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#4F7A12' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@500;600;700&display=swap',
        },
      ],
    },
  },

  // Каждая публичная страница должна отдаваться отрендеренной —
  // без этого вся SEO-часть плана не работает.
  nitro: {
    prerender: {
      crawlLinks: true,
      // sitemap и robots на статике должны стать файлами, а не маршрутами сервера:
      // GitHub Pages ничего не исполняет
      routes: baseURL === '/'
        ? ['/', '/sitemap.xml', '/robots.txt']
        : ['/', '/sitemap.xml'],
    },
  },

  image: {
    quality: 78,
    format: ['avif', 'webp'],
    screens: { xs: 375, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 },
  },
})
