<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Modal } from 'bootstrap'
import { useFinanceAccountStore } from '../../stores'
import type { Account } from '../../types'

import { useForm } from 'vee-validate'
import { object, string } from 'yup'

import { toCurrency, toNumber } from '@/modules/core/utils/formatNumberCurrentcy'

const account = useFinanceAccountStore()

const schema = object({
  name: string().required().min(2).max(4),
  desc: string().required().min(10).max(26),
  number: string().required().min(5).max(20),
  balance: string().required().min(4),
  type: string().required().max(2),
  branch: string().required().max(2),
  isActive: string().required(),
})

const { meta, errors, defineInputBinds, setFieldValue, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

const name = defineInputBinds('name')
const desc = defineInputBinds('desc')
const number = defineInputBinds('number')
const balance = defineInputBinds('balance')
const type = defineInputBinds('type')
const branch = defineInputBinds('branch')
const isActive = defineInputBinds('isActive')

let showModal: Function
let accounts: Account

const prop = defineProps<{
  accountId: number
  isOpen: boolean
}>()
const emit = defineEmits(['hiddenModal'])
onMounted(() => {
  const modalEl = document.getElementById('modaleditAccount') as Element
  let modal: Modal = new window.bootstrap.Modal(modalEl, { backdrop: 'static' })
  showModal = () => {
    modal?.show()
    accounts = account.accounts.find((item) => item.id === prop.accountId)!
    setFieldValue('name', accounts.name, false)
    setFieldValue('desc', accounts.desc, false)
    setFieldValue('number', accounts.number, false)
    setFieldValue('balance', toCurrency(accounts.balance.toString()), false)
    setFieldValue('type', accounts.type, false)
    setFieldValue('branch', accounts.branch, false)
    setFieldValue('isActive', accounts.isActive, false)
  }
  if (prop.accountId) {
    showModal()
  }
  modalEl.addEventListener('hidden.bs.modal', () => {
    emit('hiddenModal')
    resetForm()
  })
})
const submit = handleSubmit((values) => {
  // accounts.editAccount()
  let data = values
  data.id = prop.accountId
  console.log(data)
})
watch(
  () => prop.isOpen,
  (newVal) => {
    if (newVal) {
      showModal()
    }
  },
)
watch(name, () => {
  console.log('name', name, name.value.value)
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
          <h4 class="modal-title" id="editAccount">Edit Account Form</h4>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i data-feather="x"></i>
          </button>
        </div>

        <form class="">
          <div class="modal-body">
            <label for="currentBalance">Initial Name: </label>
            <div class="input-group">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Initial Name"
                class="form-control"
                :class="{ 'is-invalid': errors.actualBalance }"
                v-bind="name"
              />
            </div>
            <div class="invalid-feedback">{{ errors.actualBalance }}</div>

            <label for="currentBalance">Full Name: </label>
            <div class="input-group">
              <input
                id="desc"
                name="desc"
                type="text"
                placeholder="Full Name"
                class="form-control"
                :class="{ 'is-invalid': errors.actualBalance }"
                v-bind="desc"
              />
            </div>
            <div class="invalid-feedback">{{ errors.actualBalance }}</div>

            <label for="currentBalance">Balance: </label>
            <code> Change balance only on Sync Balance menu</code>
            <div class="input-group">
              <input
                id="balance"
                name="balance"
                type="text"
                placeholder="Balance"
                class="form-control"
                :class="{ 'is-invalid': errors.actualBalance }"
                v-bind="balance"
                readonly
              />
            </div>

            <label for="currentBalance">Account Number: </label>
            <div class="input-group">
              <input
                id="number"
                name="number"
                type="text"
                placeholder="number"
                class="form-control"
                :class="{ 'is-invalid': errors.actualBalance }"
                v-bind="number"
              />
              <div class="invalid-feedback">{{ errors.actualBalance }}</div>
            </div>

            <label for="currentBalance">Account Type: </label>
            <div class="input-group">
              <select
                name="type"
                id="type"
                v-bind="type"
                class="form-control"
                :class="{ 'is-invalid': errors.actualBalance }"
              >
                <option v-for="(typ, index) in account.accountInfo?.types" :value="index">
                  {{ typ }}
                </option>
              </select>
            </div>

            <label for="currentBalance">Branch: </label>
            <div class="input-group">
              <select
                name="branch"
                id="branch"
                v-bind="branch"
                class="form-control"
                :class="{ 'is-invalid': errors.actualBalance }"
              >
                <option v-for="(brnch, index) in account.accountInfo?.branch" :value="index">
                  {{ brnch }}
                </option>
              </select>

              <input type="checkbox" id="checkbox" v-model="isActive" />
              <label for="isActive">Activate? </label>
            </div>

            <!-- <code>Describe why recorded balance is different with actual balance!</code> -->
            <!-- <pre>values: {{ values }}</pre>
            <pre>errors: {{ errors }}</pre> -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-light-secondary" data-bs-dismiss="modal">
              <i class="bx bx-x d-block d-sm-none"></i>
              <span class="d-none d-sm-block">Cancel</span>
            </button>
            <button
              type="button"
              class="btn btn-primary ms-1"
              :class="[errors && !meta.valid ? 'disabled' : '']"
            >
              <i class="bx bx-check d-block d-sm-none"></i>
              <span class="d-none d-sm-block">Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
