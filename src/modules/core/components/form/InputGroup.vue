<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, defineAsyncComponent, ref } from 'vue'
import { type SelectProps } from './Select.vue'
import { type InputProps } from './Input.vue'
import { type TextareaProps } from './Textarea.vue'

export interface InputElementProps {
  name: string
  label?: string
  inputPrefix?: string
  elm: 'input' | 'textarea' | 'select'
  inputText?: string | undefined
  colClass?: string | number
  readonly?: boolean
}
// data?: SelectProps | InputProps | TextareaProps

type InputElementPropsWithoutname = Omit<InputElementProps, 'name'>
export type FieldSelectProps = InputElementPropsWithoutname & SelectProps
export type FieldInputProps = InputElementPropsWithoutname & InputProps
export type FieldTextareaProps = InputElementPropsWithoutname & TextareaProps

// type Fields = {
//   [key: string]: FieldProperty
// }

const props = withDefaults(defineProps<InputElementProps>(), {
  colClass: 'col-12',
})

const Input = defineAsyncComponent(() => import('./Input.vue'))
const Textarea = defineAsyncComponent(() => import('./Textarea.vue'))
const Select = defineAsyncComponent(() => import('./Select.vue'))

const { value, errorMessage, meta, validate } = useField<string>(props.name)
</script>
<template>
  <slot>
    <div :class="colClass">
      <label :for="name">{{ label }} </label>
      <div class="input-group">
        <span v-if="inputPrefix" class="input-group-text">{{ inputPrefix }} </span>
        <Input
          v-if="elm === 'input'"
          v-model="value"
          :name="name"
          :class="[{ 'is-invalid': errorMessage && meta.dirty }]"
        />
        <Textarea
          v-else-if="elm === 'textarea'"
          v-model="value"
          :name="name"
          :class="[{ 'is-invalid': errorMessage && meta.dirty }]"
        ></Textarea>
        <Select
          v-else-if="elm === 'select'"
          v-model="value"
          :name="name"
          :class="[{ 'is-invalid': errorMessage && meta.dirty }]"
        ></Select>
        <!-- :class="[{ 'is-invalid': errorMessage && meta.dirty }, inputClasses]" -->

        <div class="invalid-feedback">{{ errorMessage }}</div>
      </div>
      <div class="form-text text-info-emphasis">{{ inputText }}</div>
    </div>
  </slot>
</template>
