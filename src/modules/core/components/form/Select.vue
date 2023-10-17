<script setup lang="ts">
import { ref } from 'vue'
type Obj = {
  val: number | string
  desc: number | string
}

export type SelectProps = {
  modelValue?: string | number
  options?: Obj[]
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
    @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :value="modelValue"
  >
    <option selected>choosee....</option>
    <option v-for="o in options" :value="o.val">
      {{ o.desc }}
    </option>
  </select>
</template>
