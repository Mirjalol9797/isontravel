import type { Lead } from '~/types'

/* ============================================================
   Единственная точка отправки заявок.

   Бэкенда нет и на этом этапе не планируется: сайт статический.
   Когда появится приёмник (бот в Telegram или форма-сервис),
   меняется ТОЛЬКО тело send() — ни одна форма не трогается.
   ============================================================ */

export type LeadState = 'idle' | 'sending' | 'done' | 'error'

export const useLead = () => {
  const state = ref<LeadState>('idle')
  const error = ref('')

  const send = async (lead: Lead) => {
    state.value = 'sending'
    error.value = ''

    try {
      // Заглушка: имитируем сеть, чтобы были видны все состояния формы.
      await new Promise(resolve => setTimeout(resolve, 700))

      if (import.meta.dev) console.info('[lead]', lead)

      state.value = 'done'
      return true
    } catch {
      state.value = 'error'
      error.value = 'Не получилось отправить. Напишите нам в Telegram.'
      return false
    }
  }

  const reset = () => {
    state.value = 'idle'
    error.value = ''
  }

  return { state, error, send, reset }
}
