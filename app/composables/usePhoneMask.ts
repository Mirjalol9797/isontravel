/**
 * Маска узбекского номера: +998 (90) 123-45-67
 *
 * Работает на модели, а не на событиях ввода: что бы человек ни
 * вставил из буфера, остаются только цифры и раскладываются по шаблону.
 */
const TEMPLATE = '+998 (__) ___-__-__'

export const usePhoneMask = (model: Ref<string>) => {
  const digitsOf = (value: string) => {
    let d = value.replace(/\D/g, '')
    // 998 в начале — это код страны из шаблона, а не номер
    if (d.startsWith('998')) d = d.slice(3)
    return d.slice(0, 9)
  }

  const format = (value: string) => {
    const d = digitsOf(value)
    if (!d) return ''

    let out = '+998 ('
    out += d.slice(0, 2)
    if (d.length >= 2) out += ') '
    if (d.length > 2) out += d.slice(2, 5)
    if (d.length > 5) out += '-' + d.slice(5, 7)
    if (d.length > 7) out += '-' + d.slice(7, 9)
    return out
  }

  const onInput = (value: string) => {
    model.value = format(value)
  }

  /** Девять цифр после кода страны — полный номер */
  const isValid = computed(() => digitsOf(model.value).length === 9)
  const digits = computed(() => digitsOf(model.value))

  return { onInput, isValid, digits, placeholder: TEMPLATE }
}
