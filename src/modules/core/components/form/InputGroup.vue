<script setup lang="ts">
import { useField } from 'vee-validate'
import { defineAsyncComponent, onMounted, watch } from 'vue'

import type { InputElement, TextareaElement, SelectElement, Fields } from './types'

const props = defineProps<{
  data: InputElement | TextareaElement | SelectElement
  name: string
}>()

const Input = defineAsyncComponent(() => import('./Input.vue'))
const Textarea = defineAsyncComponent(() => import('./Textarea.vue'))
const Select = defineAsyncComponent(() => import('./Select.vue'))

const { value, errorMessage, meta, handleChange } = useField<string>(props.name)
// console.log(props.data)
// if (props.data.elm === 'input' && props.data.isCurrency) {
//   watch(value, () => {
//     // handleChange(value.value)
//     console.log(value.value)
//   })
// }
// onMounted(() => {
//   if (props.data.elm === 'input' && props.data.isCurrency) {
//     console.log(value.value)
//   }
// })
</script>
<template>
  <slot>
    <div :class="data.colClass">
      <label :for="name">{{ data.label }} </label>
      <div class="input-group">
        <span v-if="data.inputPrefix" class="input-group-text">{{ data.inputPrefix }} </span>
        <Input
          v-if="data.elm === 'input'"
          v-model="value"
          :name="name"
          :id="name"
          :type="data.type"
          :initialValue="data.initialValue"
          :isCurrency="data.isCurrency"
          :class="[{ 'is-invalid': errorMessage && meta.dirty }]"
          :readonly="data.readonly"
        />
        <Textarea
          v-else-if="data.elm === 'textarea'"
          v-model="value"
          :name="name"
          :id="name"
          :rows="data.rows"
          :class="[{ 'is-invalid': errorMessage && meta.dirty }]"
          :readonly="data.readonly"
        ></Textarea>
        <Select
          v-else-if="data.elm === 'select'"
          v-model="value"
          :name="name"
          :id="name"
          :options="data.options"
          :class="[{ 'is-invalid': errorMessage && meta.dirty }]"
          :readonly="data.readonly"
        ></Select>

        <div class="invalid-feedback">{{ errorMessage }}</div>
      </div>
      <div class="form-text text-info-emphasis">{{ data.inputText }}</div>
    </div>
  </slot>
</template>
