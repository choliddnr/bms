<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { Modal } from 'bootstrap'
import { useFinanceAccountStore } from '../../stores'
import type { Account } from '../../types'
import { useForm } from 'vee-validate'

import { object, string } from 'yup'
import { toCurrency, toNumber } from '@/modules/core/utils/formatNumberCurrentcy'
import Form from '@/modules/core/components/form/Form.vue'
import Toast from '@/modules/core/notification/Toast.vue'

import type {
  InputElement,
  TextareaElement,
  SelectElement,
  Fields,
} from '@/modules/core/components/form/types'

const account = useFinanceAccountStore()

import financeAccountToSelectOptions from '@/modules/core/utils'
const accountSelectOption = financeAccountToSelectOptions(account.accounts)

/* 
  get branch
*/
import { useBranchStore } from '@/stores/branch'

const branch = useBranchStore()

console.log(account.accounts, branch.branchs)

/*
useCounterStore test
*/

import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
const unsubscribe = branch.$onAction(
  ({
    name, // name of the action
    store, // store instance, same as `someStore`
    args, // array of parameters passed to the action
    after, // hook after the action returns or resolves
    onError, // hook if the action throws or rejects
  }) => {
    // a shared variable for this specific action call
    const startTime = Date.now()
    // this will trigger before an action on `store` is executed
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // this will trigger if the action succeeds and after it has fully run.
    // it waits for any returned promised
    after((result) => {
      console.log(`Finished "${name}" after ${Date.now() - startTime}ms.\nResult: ${result}.`)
    })

    // this will trigger if the action throws or returns a promise that rejects
    onError((error) => {
      console.warn(`Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`)
    })
  },
)

// manually remove the listener
// unsubscribe()

let showModal: Function
let hideModal: Function
let acc: Account
acc = account.accounts.find((item) => item.id === prop.accountId)!
console.log('acc ? ', acc.type, acc.branch)

const formFields = <Fields>{
  initialname: <InputElement>{
    label: 'Initial Nama',
    elm: 'input',
    colClass: 'col-12',
    initialValue: acc.initialname,
  },
  fullname: <InputElement>{
    label: 'Full Name',
    elm: 'input',
    colClass: 'col-12',
    initialValue: acc.fullname,
  },
  balance: <InputElement>{
    elm: 'input',
    label: 'Balance',
    colClass: 'col-12',
    isCurrency: true,
    readonly: true,
    inputPrefix: 'Rp. ',
    initialValue: acc.balance,
  },
  number: <InputElement>{
    elm: 'input',
    label: 'Account Number',
    colClass: 'col-12',
    initialValue: acc.number,
  },
  type: <SelectElement>{
    elm: 'select',
    label: 'Account Type',
    colClass: 'col-12',
    options: accountSelectOption,
    initialValue: acc.type,
  },
  branch: <SelectElement>{
    elm: 'select',
    label: 'Account Type',
    colClass: 'col-12',
    options: accountSelectOption,
    initialValue: acc.branch,
  },
}

const validationSchema = object({
  initialname: string().required().min(3).max(4),
  fullnmae: string().required().max(25),
  balance: string().required(),
  number: string().required(),
  type: string().required(),
  branch: string().required(),
})

const prop = defineProps<{
  accountId: number
  modelValue: boolean
}>()

// const show = ref<boolean>()
const save = (data: any) => {
  console.log(data)
  hideModal()
  // show.value = true
  // if (data.from && data.to && data.nominal && data.desc) {
  //   let result = ref<Account>({
  //     id: prop.accountId,
  //     name: data.name,
  //     desc: data.desc,
  //     balance: data.balance,
  //     number: data.number,
  //     branch: data.branch,
  //     type: data.type,
  //     isActive: true,
  //   })
  //   account.editAccount(result.value)
  // } else {
  //   console.log('something wrong')
  // }
}

const emit = defineEmits(['update:modelValue'])
onMounted(() => {
  const modalEl = document.getElementById('modaleditAccount') as Element
  let modal: Modal = new window.bootstrap.Modal(modalEl, { backdrop: 'static' })
  showModal = () => {
    modal?.show()
    // setFieldValue('name', accounts.name, false)
    // setFieldValue('desc', accounts.desc, false)
    // setFieldValue('number', accounts.number, false)
    // setFieldValue('balance', toCurrency(accounts.balance.toString()), false)
    // setFieldValue('type', accounts.type, false)
    // setFieldValue('branch', accounts.branch, false)
    // setFieldValue('isActive', accounts.isActive, false)
  }
  hideModal = () => {
    modal?.hide()
    // emit('update:modelValue', false)
  }
  if (prop.accountId) {
    showModal()
  }
  modalEl.addEventListener('hidden.bs.modal', () => {
    // emit('hiddenModal')
    // resetForm()
    console.log('modal hidden')
    emit('update:modelValue', false)
  })
})
</script>

<template>
  <div
    class="modal fade text-left"
    id="modaleditAccount"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel33"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="editAccount">Edit Account</h4>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i data-feather="x"></i>
          </button>
          <button type="button" class="btn-primary" @click="branch.inc">c inc</button>
        </div>
        <div class="modal-body">
          <Form :fields="formFields" :schema="validationSchema" @submit="save">
            <template #button="{ isValid, submitBtn }">
              <div class="row">
                <div class="col-auto col-ms-12 ms-auto mt-2">
                  <button type="button" class="btn btn-light-secondary" data-bs-dismiss="modal">
                    <i class="bx bx-x d-block d-sm-none"></i>
                    <span class="d-none d-sm-block">Cancel</span>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary ms-2"
                    :class="[!isValid ? 'disabled' : '']"
                    @click="submitBtn"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </template>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
