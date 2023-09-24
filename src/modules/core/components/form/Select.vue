<script setup lang="ts">
import { ref } from 'vue'
type Obj = {
  [key: string]: number | string
}

export type SelectProps = {
  modelValue?: string | number
  data?: Obj
  classes?: string
  readonly?: boolean
}

defineEmits(['update:modelValue'])

const props = defineProps<SelectProps>()
</script>
<template>
  <!-- <input @input="onTyping" class="form-control" :value="modelValue" v-bind="$attrs" /> -->
  <select
    v-bind="$attrs"
    class="form-control"
    :class="classes"
    :readonly="readonly"
    @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
    <option v-for="(value, keys) in data" :value="value">
      {{ keys }}
    </option>
  </select>
</template>
