<script setup lang="ts">
import { defineAsyncComponent, onMounted, readonly, watch } from 'vue'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'

import type { InputElementProps } from './InputGroup.vue'

import { type SelectProps } from './Select.vue'
import { type InputProps } from './Input.vue'
import { type TextareaProps } from './Textarea.vue'

import type { FieldSelectProps, FieldInputProps, FieldTextareaProps } from './InputGroup.vue'

const fullname = <FieldSelectProps>{
  label: 'Full Name',
  colClass: 'col-md-4',
  data: { op1: 12 },
  elm: 'select',
}
// elm: 'input',
// data: { type: 'email' },

type PropsWithoutname = Omit<InputElementProps, 'name'>
type FieldProperty = PropsWithoutname & {
  inputType?: string
}

type Fields = {
  [key: string]: FieldProperty
}

const fields: Fields = {
  fullname: {
    elm: 'input',
    label: 'Full Name',
    data: <InputProps>{ type: 'email' },
    colClass: 'col-md-4',
  },
  number: {
    label: 'Number',
    data: <InputProps>{
      type: 'number',
    },
    elm: 'input',
    inputPrefix: '+62',
    colClass: 'col-md-4',
  },
  balance: {
    label: 'Balance',
    elm: 'input',
    data: <InputProps>{
      isCurrency: true,
    },
    readonly: true,
    inputPrefix: 'Rp. ',
    colClass: 'col-md-4',
  },
  selection: {
    label: 'Description',
    elm: 'select',
    data: <SelectProps>{
      data: { abc: 1, def: 2, ghi: 3 },
    },
    colClass: 'col-md-6',
    inputText: 'Describe why recorded balance is different with actual balance!',
  },
  desc: {
    label: 'Description',
    elm: 'textarea',
    data: <TextareaProps>{
      rows: 3,
    },
    colClass: 'col-md-6',
    inputText: 'Describe why recorded balance is different with actual balance!',
  },
}

const propSchema = object({
  fullname: string().email(),
  // balance: string().required().min(4),
  desc: string().required().min(10).max(26),
  number: string().required().min(5).max(20),
})

const {
  meta,
  setFieldValue,
  // handleSubmit,
  resetForm,
  values,
} = useForm({
  validationSchema: propSchema,
})

const fieldKeys = Object.keys(fields) as (keyof typeof fields)[]

const Input = defineAsyncComponent(() => import('./Input.vue')) as any
const InputGroup = defineAsyncComponent(() => import('./InputGroup.vue')) as any

onMounted(() => {
  setFieldValue('balance', 8000000, false)
})
watch(values, () => {
  console.log('value', values)
})

import { provide } from 'vue'

provide(/* key */ 'message', /* value */ 'hello!')
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <InputGroup
          v-for="key in fieldKeys"
          :name="key"
          :label="fields[key].label"
          :data="fields[key].data"
          :elm="fields[key].elm"
          :inputPrefix="fields[key].inputPrefix"
          :inputText="fields[key].inputText"
          :colClass="fields[key].colClass"
          :readonly="fields[key].readonly"
        >
        </InputGroup>
      </div>
      <div class="row">
        <button type="button" class="btn btn-light-secondary col-3 ms-3" @click="resetForm()">
          <i class="bx bx-x d-block d-sm-none"></i>
          <span class="d-none d-sm-block">Cancel</span>
        </button>
        <button
          type="button"
          class="btn btn-primary ms-1 col-3"
          :class="[!meta.valid ? 'disabled' : '']"
        >
          <i class="bx bx-check d-block d-sm-none"></i>
          <span class="d-none d-sm-block">Submit</span>
        </button>
      </div>
    </div>
  </div>
</template>
