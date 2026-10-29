<script setup lang="ts">
definePageMeta({ overHero: true })

useSeoMeta({
  title: 'Походы и туры выходного дня из Ташкента — Ison Travel',
  description: 'Однодневные походы в горы, к озёрам и пещерам в двух часах от Ташкента. Выезды каждые выходные с гидом и транспортом, от 280 000 сум. Корпоративные выезды для компаний.',
  ogType: 'website',
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeUpcoming />
    <HomeDestinations />
    <HomeSteps />
    <HomeCorporate />
    <HomeReviews />
    <HomeGuides />
    <HomeNews />
    <HomeFaq />
    <HomeCta />
  </div>
</template>
