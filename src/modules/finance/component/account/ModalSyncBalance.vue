<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Modal } from 'bootstrap'
import { useFinanceAccountStore } from '../../stores'
import type { Account } from '../../types'

import { useForm } from 'vee-validate'
import { object, string } from 'yup'

import { toCurrency, toNumber } from '@/modules/core/utils/formatNumberCurrentcy'

const accounts = useFinanceAccountStore()

const schema = object({
  actualBalance: string().required().min(5),
  desc: string().required().min(25),
})

const { meta, errors, defineInputBinds, setFieldValue, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})
const sel = defineInputBinds('sel')
const currentBalance = defineInputBinds('currentBalance')
const actualBalance = defineInputBinds('actualBalance')
const desc = defineInputBinds('desc')

let showModal: Function
let account: Account

const prop = defineProps<{
  accountId: number
  isOpen: boolean
}>()
const emit = defineEmits(['hiddenModal'])
onMounted(() => {
  const modalEl = document.getElementById('modalSyncbalance') as Element
  let modal: Modal = new window.bootstrap.Modal(modalEl, { backdrop: 'static' })
  showModal = () => {
    modal?.show()
    account = accounts.accounts.find((item) => item.id === prop.accountId)!
    setFieldValue('currentBalance', toCurrency(account.balance.toString()), false)
  }
  if (prop.accountId) {
    showModal()
  }
  modalEl.addEventListener('hidden.bs.modal', () => {
    emit('hiddenModal')
    resetForm()
  })
  setFieldValue('sel', 2)
})
const submit = handleSubmit((values) => {
  accounts.syncBalance({
    id: prop.accountId,
    datetime: new Date().getTime(),
    amount: values.actualBalance,
    desc: values.desc,
    type: 'SyncBalance',
  })
  console.log(values)
})
watch(
  () => prop.isOpen,
  (newVal) => {
    if (newVal) {
      showModal()
    }
  },
)
watch(actualBalance, (newVal) => {
  if (newVal.value !== undefined) {
    setFieldValue('actualBalance', toCurrency(toNumber(newVal.value).toString()), true)
  }
})
</script>

<template>
  <div
    class="modal fade text-left"
    id="modalSyncbalance"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel33"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="syncBalance">Synchronize Balance Form</h4>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <i data-feather="x"></i>
          </button>
        </div>

        <form class="">
          <div class="modal-body">
            <label for="currentBalance">select Balance: </label>
            <div class="input-group">
              <select name="sel" id="sel" class="form-control" v-bind="sel">
                <option>chosee</option>
                <option value="1">satu</option>
                <option value="2">dua</option>
                <option value="3">tiga</option>
              </select>
            </div>
            <label for="currentBalance">Current Balance: </label>
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">Rp. </span>
              <input
                id="currentBalance"
                name="currentBalance"
                type="text"
                placeholder="Current Balance"
                class="form-control"
                v-bind="currentBalance"
                readonly
              />
            </div>
            <label for="actualBalance">Actual Balance: </label>
            <div class="input-group">
              <span class="input-group-text">Rp. </span>
              <input
                id="actualBalance"
                name="actualBalance"
                type="text"
                placeholder="New Balance"
                class="form-control"
                :class="{ 'is-invalid': errors.actualBalance }"
                v-bind="actualBalance"
              />
              <div class="invalid-feedback">{{ errors.actualBalance }}</div>
            </div>
            <label for="desc">Description: </label><br />
            <div class="input-group">
              <textarea
                id="desc"
                name="desc"
                rows="3"
                class="form-control"
                :class="{ 'is-invalid': errors.desc }"
                v-bind="desc"
              ></textarea>

              <div class="invalid-feedback">{{ errors.desc }}</div>
            </div>
            <code>Describe why recorded balance is different with actual balance!</code>
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
              @click="submit()"
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
