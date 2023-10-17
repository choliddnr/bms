<script setup lang="ts">
import { ref, watch } from 'vue'
import Form from './Form.vue'
import type { InputElement, TextareaElement, SelectElement, Fields } from './types'
import { object, string } from 'yup'

const fields: Fields = {
  fullname: <InputElement>{
    elm: 'input',
    type: 'text',
    label: 'Full Name',
    colClass: 'col-md-4',
  },
  phonenumber: <InputElement>{
    elm: 'input',
    type: 'number',
    label: 'Phone Number',
    inputPrefix: '+62',
    colClass: 'col-md-4',
  },
  balance: <InputElement>{
    label: 'Balance',
    elm: 'input',
    type: 'text',
    isCurrency: true,
    inputPrefix: 'Rp. ',
    colClass: 'col-md-4',
    initialValue: 900000,
  },
  selection: <SelectElement>{
    elm: 'select',
    label: 'Selection',
    options: [
      {
        val: 1,
        desc: 'abc',
      },
      {
        val: 2,
        desc: 'def',
      },
      {
        val: 3,
        desc: 'ghi',
      },
    ],
    colClass: 'col-md-6',
    inputText: 'Describe why recorded balance is different with actual balance!',
  },
  desc: <TextareaElement>{
    label: 'Description',
    elm: 'textarea',
    rows: 3,
    colClass: 'col-md-6',
    inputText: 'Describe why recorded balance is different with actual balance!',
  },
}

const propSchema = object({
  fullname: string().email(),
  // balance: string().required().min(4),
  desc: string().required().min(10).max(26),
  phonenumber: string().required().min(5).max(20),
})

const submit = (val: JSON) => {
  console.log('val', val)
}
const values = ref<object>({})
// watch(values.value, () => {
//   console.log(values)
// })
</script>

<template>
  <div class="card">
    <div class="card-body">
      <Form :fields="fields" :schema="propSchema" @submit="submit">
        <!-- <template #button="{ resetBtn, submitBtn, isValid }">
          <button type="button" class="btn btn-light-secondary col-3 ms-3" @click="resetBtn">
            Reset**
          </button>
          <button
            type="button"
            class="btn btn-primary ms-1 col-3"
            :class="[!isValid ? 'disabled' : '']"
            @click="submitBtn"
          >
            Submit**
          </button>
        </template> -->
      </Form>
    </div>
  </div>
</template>
