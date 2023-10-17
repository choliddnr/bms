<script setup lang="ts">
import { defineAsyncComponent, onMounted, watch } from 'vue'
import { useForm } from 'vee-validate'
import { object, string } from 'yup'

import type { Fields } from './types'

const props = defineProps<{
  fields: Fields
  schema: object
}>()

const { meta, setFieldValue, handleSubmit, resetForm, values } = useForm({
  validationSchema: props.schema,
})

const fieldKeys = Object.keys(props.fields) as (keyof typeof props.fields)[] as string[]
const InputGroup = defineAsyncComponent(() => import('./InputGroup.vue')) as any
const emits = defineEmits(['submit'])

const submit = handleSubmit((values, actions) => {
  emits('submit', values)
  actions.resetForm()
})
const reset = () => resetForm()
onMounted(() => {
  fieldKeys.forEach((e) => {
    console.log('initval', e, props.fields[e].initialValue)
    if (props.fields[e].initialValue) {
      setFieldValue(e, props.fields[e].initialValue, false)
    }
  })
})
</script>

<template>
  <slot>
    <div class="row">
      <InputGroup v-for="key in fieldKeys" :name="key" :data="fields[key]"> </InputGroup>
    </div>
  </slot>
  <slot name="button" :resetBtn="reset" :submitBtn="submit" :isValid="meta.valid">
    <div class="row">
      <div class="col-auto col-ms-12 ms-auto mt-2">
        <button type="button" class="btn btn-light-secondary" @click="resetForm()">Reset</button>
        <button
          type="button"
          class="btn btn-primary ms-2"
          :class="[!meta.valid ? 'disabled' : '']"
          @click="submit"
        >
          Submit
        </button>
      </div>
    </div>
  </slot>
  <span>{{ values }}</span>
</template>
