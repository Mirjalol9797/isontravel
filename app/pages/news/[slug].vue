<script setup lang="ts">
const route = useRoute()
const { bySlug, others, categoryLabel } = useNews()
const { dayMonth } = useFormat()

const post = bySlug(String(route.params.slug))
if (!post) throw createError({ statusCode: 404, statusMessage: 'Пост не найден', fatal: true })

const more = others(post.slug)

useSeoMeta({
  title: `${post.title} — Ison Travel`,
  description: post.excerpt,
  ogType: 'article',
  ogImage: post.cover,
  articlePublishedTime: post.date,
})

useSchemaOrg([
  defineArticle({
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Ison Travel' },
  }),
])
</script>

<template>
  <div class="container-site post">
    <UiBreadcrumbs :items="[{ label: 'Новости', to: '/news' }, { label: post.title }]" />

    <article>
      <header class="post__head">
        <p class="post__meta">
          <span class="post__cat">{{ categoryLabel(post.category) }}</span>
          <time :datetime="post.date">{{ dayMonth(post.date) }}</time>
          <span>{{ post.views }} просмотров</span>
        </p>
        <h1>{{ post.title }}</h1>
        <p class="post__lead">{{ post.excerpt }}</p>
      </header>

      <UiPhoto :src="post.cover" :alt="post.title" ratio="16 / 9" class="post__cover" eager />

      <div class="post__body">
        <p v-for="(p, i) in post.body" :key="i">{{ p }}</p>
      </div>

      <footer class="post__foot">
        <UiButton v-if="post.telegramUrl" :href="post.telegramUrl" variant="outline" size="sm">
          Читать в Telegram
        </UiButton>
        <UiButton to="/tours" variant="cta" size="sm">Выбрать тур</UiButton>
      </footer>
    </article>

    <section v-if="more.length" class="post__more">
      <h2>Читать дальше</h2>
      <div class="post__grid">
        <NuxtLink v-for="p in more" :key="p.id" :to="`/news/${p.slug}`" class="mcard">
          <UiPhoto :src="p.cover" :alt="p.title" ratio="16 / 10" />
          <span class="mcard__b">
            <small>{{ dayMonth(p.date) }}</small>
            <b>{{ p.title }}</b>
          </span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.post { padding-bottom: clamp(48px, 7vw, 96px); max-width: 860px; }
.post__head { margin: 8px 0 24px; }
.post__meta { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; font-size: 13px; color: var(--color-muted); margin-bottom: 16px; }
.post__cat { padding: 5px 11px; border-radius: 999px; background: var(--color-accent-soft); color: var(--color-accent-dark); font-weight: 700; }
.post h1 { font-size: clamp(28px, 4vw, 46px); }
.post__lead { margin-top: 16px; font-size: clamp(16px, 1.8vw, 19px); color: var(--color-muted); line-height: 1.55; }

.post__cover { border-radius: var(--radius-xl2); margin-bottom: 28px; }

.post__body p { color: var(--color-body); line-height: 1.75; font-size: 17px; }
.post__body p + p { margin-top: 18px; }

.post__foot { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 32px; padding-top: 26px; border-top: 1px solid var(--color-line); }

.post__more { margin-top: clamp(40px, 6vw, 72px); }
.post__more h2 { font-size: clamp(20px, 2.4vw, 26px); margin-bottom: 18px; }
.post__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.mcard { border-radius: var(--radius-card); overflow: hidden; border: 1px solid var(--color-line); background: var(--color-surface); display: block; transition: transform .25s ease, box-shadow .25s ease; }
.mcard:hover { transform: translateY(-4px); box-shadow: var(--shadow-card); }
.mcard__b { display: block; padding: 16px 18px; }
.mcard__b small { font-size: 12.5px; color: var(--color-muted); }
.mcard__b b { display: block; margin-top: 6px; font-family: var(--font-display); font-size: 16px; font-weight: 600; line-height: 1.3; }

@media (max-width: 700px) { .post__grid { grid-template-columns: 1fr; } }
</style>
