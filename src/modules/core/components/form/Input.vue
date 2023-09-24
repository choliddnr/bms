<script setup lang="ts">
import { onMounted, ref, inject } from 'vue'
import { toCurrency, toNumber } from '@/modules/core/utils/formatNumberCurrentcy'

export interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'number' | 'email' | 'password'
  isCurrency?: boolean
  classes?: string
  readonly?: boolean
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  isCurrency: false,
})

const emits = defineEmits(['update:modelValue'])
onMounted(() => {
  if (props.isCurrency && props.modelValue) {
    emits('update:modelValue', toCurrency(toNumber(props.modelValue).toString()))
  }
})
let val = ref<string | number>()
const onTyping = (e: Event) => {
  if (props.isCurrency) {
    val.value = toCurrency(toNumber((e.target as HTMLInputElement).value).toString())
  } else {
    val.value = (e.target as HTMLInputElement).value
  }
  emits('update:modelValue', val.value)
}
const message = inject('message')
console.log('inject', message)
</script>
<template>
  <input
    @input="onTyping"
    class="form-control"
    :value="modelValue"
    :type="type"
    v-bind="$attrs"
    :class="classes"
    :readonly="readonly"
  />
</template>
