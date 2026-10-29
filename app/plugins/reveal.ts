/**
 * v-reveal — появление элемента при попадании в экран.
 *
 * Плагин универсальный: директива должна существовать и на сервере,
 * иначе SSR падает на getSSRProps.
 *
 * Скрытое состояние включается классом .reveal-on на <html>, который
 * ставит клиент. Если JS не отработал, контент остаётся видимым —
 * анимация не должна прятать текст от пользователя и поисковика.
 */
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null
  let reduced = false

  if (import.meta.client) {
    reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced) document.documentElement.classList.add('reveal-on')
  }

  const get = () => {
    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          observer?.unobserve(entry.target)
        }
      }, { threshold: 0.12, rootMargin: '0px 0px -60px' })
    }
    return observer
  }

  nuxtApp.vueApp.directive('reveal', {
    // Класс .reveal пишется в шаблоне, а не здесь: если директива
    // добавит его только на сервере, Vue поймает hydration mismatch.
    getSSRProps: () => ({}),

    mounted(el: HTMLElement, binding) {
      if (reduced) { el.classList.add('is-in'); return }

      // v-reveal="2" — задержка ступенькой для соседних карточек
      const step = Number(binding.value)
      if (!Number.isNaN(step) && step > 0) {
        el.style.transitionDelay = `${Math.min(step, 8) * 80}ms`
      }
      get().observe(el)
    },

    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})
