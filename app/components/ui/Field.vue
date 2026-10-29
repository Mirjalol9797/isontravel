<script setup lang="ts">
interface Props {
  label?: string
  type?: string
  placeholder?: string
  /** передаём набор опций — и поле становится select */
  options?: string[]
  error?: string
  required?: boolean
}
withDefaults(defineProps<Props>(), { type: 'text' })
const model = defineModel<string>({ default: '' })
const id = useId()
</script>

<template>
  <div class="field">
    <label v-if="label" :for="id">{{ label }}<span v-if="required" aria-hidden="true"> *</span></label>

    <select v-if="options" :id="id" v-model="model" :class="{ 'is-bad': error }">
      <option v-for="o in options" :key="o" :value="o">{{ o }}</option>
    </select>

    <input
      v-else
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :aria-invalid="!!error"
      :class="{ 'is-bad': error }"
    >

    <p v-if="error" class="field__err">{{ error }}</p>
  </div>
</template>

<style scoped>
.field { flex: 1; min-width: 160px; }
label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 7px; color: var(--color-muted); }
input, select {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1.5px solid transparent;
  background: var(--color-surface);
  font: inherit;
  font-size: 15px;
  color: var(--color-ink);
  transition: border-color .2s ease;
}
input:focus, select:focus { border-color: var(--color-accent); outline: none; }
.is-bad { border-color: var(--color-hard); }
.field__err { margin-top: 6px; font-size: 13px; color: var(--color-hard); }
</style>
