<script setup lang="ts">
import { onMounted, ref, inject, watch } from 'vue'
import { toCurrency, toNumber } from '@/modules/core/utils/formatNumberCurrentcy'

export interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'number' | 'email' | 'password'
  isCurrency?: boolean
  readonly?: boolean
  initialValue?: number | string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  isCurrency: false,
})

const emits = defineEmits(['update:modelValue'])
onMounted(() => {
  if (props.isCurrency && props.initialValue) {
    emits('update:modelValue', toCurrency(toNumber(props.initialValue).toString()))
  }
})
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace']
let val = ref<string | number>()
const onTyping = (e: Event) => {
  if (props.isCurrency) {
    val.value = toCurrency(toNumber((e.target as HTMLInputElement).value).toString())
  } else {
    val.value = (e.target as HTMLInputElement).value
  }
  emits('update:modelValue', val.value)
}
watch(val, () => {
  console.log(val.value)
})

const checkKey = (e: KeyboardEvent) => {
  if (!props.isCurrency || numbers.indexOf(e.key) != -1) return
  e.preventDefault()
  return false
}
</script>
<template>
  <input
    @keydown="checkKey"
    @input="onTyping"
    class="form-control"
    :value="modelValue"
    :type="type"
    v-bind="$attrs"
    :readonly="readonly"
  />
</template>
