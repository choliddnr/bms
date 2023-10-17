<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFinanceAccountStore } from '../../stores'
import type { TransactionTBA } from '../../types'
import { toNumber } from '@/modules/core/utils/formatNumberCurrentcy'
import Form from '@/modules/core/components/form/Form.vue'
import Toast from '@/modules/core/notification/Toast.vue'

import type {
  InputElement,
  TextareaElement,
  SelectElement,
  Fields,
} from '@/modules/core/components/form/types'
import { object, string } from 'yup'

const accounts = useFinanceAccountStore()

import financeAccountToSelectOptions from '@/modules/core/utils'
const accountSelectOption = financeAccountToSelectOptions(accounts.accounts)

const formFields = <Fields>{
  from: <SelectElement>{
    elm: 'select',
    label: 'From Account',
    colClass: 'col-md-4',
    options: accountSelectOption,
  },
  to: <SelectElement>{
    elm: 'select',
    label: 'To Account',
    colClass: 'col-md-4',
    options: accountSelectOption,
  },
  nominal: <InputElement>{
    label: 'Nominal',
    elm: 'input',
    type: 'text',
    isCurrency: true,
    colClass: 'col-md-4',
    inputPrefix: 'Rp. ',
  },
  desc: <TextareaElement>{
    elm: 'textarea',
    rows: 3,
    label: 'Description',
  },
}

const validationSchema = object({
  from: string().required(),
  to: string().required(),
  nominal: string().required().min(4),
  desc: string().required().min(10).max(30),
})

const show = ref<boolean>()
const save = (data: any) => {
  console.log(data)
  show.value = true
  if (data.from && data.to && data.nominal && data.desc) {
    let result = ref<TransactionTBA>({
      datetime: new Date().getTime(),
      from: data.from,
      to: data.to,
      amount: toNumber(data.nominal),
      desc: data.desc,
      type: 'tba',
    })
    accounts.tba(result.value)
  } else {
    console.log('something wrong')
  }
}
</script>

<template>
  <Toast v-if="show" type="success" message="testing toast" title="cek" v-model="show" />
  <section id="multiple-column-form">
    <div class="row match-height">
      <div class="col-12">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <Form :fields="formFields" :schema="validationSchema" @submit="save"></Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
