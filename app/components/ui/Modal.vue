<script setup lang="ts">
/** Нативный <dialog>: фокус-ловушка, Esc и подложка бесплатно от браузера */
const open = defineModel<boolean>('open', { default: false })
defineProps<{ title?: string }>()

const dialog = ref<HTMLDialogElement | null>(null)

watch(open, (v) => {
  if (!dialog.value) return
  if (v) {
    dialog.value.showModal()
    document.body.style.overflow = 'hidden'
  } else {
    dialog.value.close()
    document.body.style.overflow = ''
  }
})

onBeforeUnmount(() => { document.body.style.overflow = '' })
</script>

<template>
  <dialog ref="dialog" class="modal" @close="open = false" @click.self="open = false">
    <div class="modal__box">
      <header class="modal__head">
        <h2 v-if="title">{{ title }}</h2>
        <button class="modal__x" aria-label="Закрыть" @click="open = false">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </header>
      <div class="modal__body"><slot /></div>
    </div>
  </dialog>
</template>

<style scoped>
.modal {
  border: 0;
  padding: 0;
  background: transparent;
  max-width: min(560px, calc(100vw - 32px));
  width: 100%;
  color: var(--color-ink);
}
.modal::backdrop { background: rgb(var(--overlay-rgb) / .62); backdrop-filter: blur(3px); }
.modal__box {
  background: var(--color-surface);
  border-radius: var(--radius-xl2);
  box-shadow: var(--shadow-float);
  overflow: hidden;
}
.modal__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 24px 0;
}
.modal__head h2 { font-size: 22px; }
.modal__x {
  flex: none;
  width: 36px; height: 36px;
  border: 0;
  border-radius: 50%;
  background: var(--color-bg);
  display: grid;
  place-items: center;
  cursor: pointer;
  color: inherit;
}
.modal__x:hover { background: var(--color-line); }
.modal__body { padding: 20px 24px 26px; }
</style>
