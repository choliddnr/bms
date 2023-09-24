<script setup lang="ts">
export interface TextareaProps {
  modelValue?: string | number | undefined
  rows?: string | number
  classes?: string
  readonly?: boolean
}
const props = withDefaults(defineProps<TextareaProps>(), {
  rows: 3,
  readonly: false,
})
defineEmits(['update:modelValue'])
</script>
<template>
  <textarea
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="form-control"
    :rows="rows"
    :readonly="readonly"
  ></textarea>
</template>
