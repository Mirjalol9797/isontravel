<script setup lang="ts">
interface Props {
  /** cta — акцентная (солнце), dark — зелёная, ghost — на фото, outline — на светлом */
  variant?: 'cta' | 'dark' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  to?: string
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'cta',
  size: 'md',
  type: 'button',
})

const tag = computed(() => (props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button'))

const attrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href }
  return { type: props.type, disabled: props.disabled }
})
</script>

<template>
  <component
    :is="tag"
    v-bind="attrs"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
  >
    <slot />
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 13px 26px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 15px;
  white-space: nowrap;
  cursor: pointer;
  transition: transform .18s ease, background .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: translateY(0); }
.btn:disabled { opacity: .5; pointer-events: none; }

.btn--cta {
  background: var(--color-accent);
  color: var(--color-on-accent);
  box-shadow: 0 6px 18px rgb(var(--accent-rgb) / .32);
}
.btn--cta:hover {
  background: var(--color-accent-dark);
  box-shadow: 0 10px 26px rgb(var(--accent-rgb) / .42);
}

.btn--dark { background: var(--color-primary); color: var(--color-on-primary); }
.btn--dark:hover { background: var(--color-primary-deep); }

.btn--ghost {
  border: 1.5px solid rgb(255 255 255 / .5);
  color: #fff;
  backdrop-filter: blur(6px);
}
.btn--ghost:hover { background: rgb(255 255 255 / .14); border-color: #fff; }

.btn--outline {
  border: 1.5px solid var(--color-line);
  background: var(--color-surface);
  color: var(--color-ink);
}
.btn--outline:hover { border-color: var(--color-primary); }

.btn--sm { padding: 10px 20px; font-size: 14px; }
.btn--lg { padding: 17px 34px; font-size: 16px; }
.btn--block { width: 100%; }
</style>
