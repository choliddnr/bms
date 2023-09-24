<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useFinanceAccountStore } from '../../stores'
import { formatIDR } from '@/modules/core/utils/currencyFormatter'

const account = useFinanceAccountStore()

// const accounts = account.cashAccounts.filter((item) => item.id !== 0)
// const accountInfo = account.cashAccounts.find((item) => item.id === 0)

const loadModalSyncBalance = ref<boolean>(false)
const loadModalEditAccount = ref<boolean>(false)
const isModalSyncBalanceOpen = ref<boolean>(false)
const isModalEditAccountOpen = ref<boolean>(false)
const account_Id = ref<number>(0)
const ModalSyncBalance = defineAsyncComponent(() => import('./ModalSyncBalance.vue'))
const ModalEditAccount = defineAsyncComponent(() => import('./ModalEditAccount.vue'))

const syncBalance = (id: number) => {
  loadModalSyncBalance.value = true
  isModalSyncBalanceOpen.value = true
  account_Id.value = id
}

const editAccount = (id: number) => {
  loadModalEditAccount.value = true
  isModalEditAccountOpen.value = true
  account_Id.value = id
}

const hiddenModal = () => {
  isModalSyncBalanceOpen.value = false
  isModalEditAccountOpen.value = false
}
</script>

<template>
  <div class="row">
    <div class="col-6 col-lg-4 col-md-6" v-for="a in account.accounts">
      <div class="card" v-if="a.id !== 0">
        <div class="card-header d-flex justify-content-between pb-0">
          <h6>{{ a.desc }}</h6>
          <div class="dropdown">
            <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-three-dots-vertical"></i>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuButton"
              style="min-width: 11rem"
            >
              <li>
                <a class="dropdown-item" href="#" @click="syncBalance(a.id!)"
                  ><i class="icon-mid bi bi-arrow-repeat me-2"></i>Sync Balance</a
                >
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="editAccount(a.id!)"
                  ><i class="icon-mid bi bi-pencil-square me-2"></i>Edit</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="card-body px-4 py-0-5">
          <div class="row">
            <div class="d-flex align-items-center">
              <div class="stats-icon blue mb-2">
                <b>{{ a.name }}</b>
              </div>
              <div class="ms-3 name">
                <h6 class="font-extrabold mb-0">{{ formatIDR(a.balance) }}</h6>
                <h6 class="text-muted mb-0">
                  {{ account.accountInfo!.types[a.type] }} -
                  {{ account.accountInfo!.branch[a.branch] }}
                </h6>
                <h6 class="text-muted mb-0" v-if="a.type !== 2">
                  {{ a.number }}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section v-if="loadModalSyncBalance">
    <ModalSyncBalance
      :accountId="account_Id"
      @hiddenModal="hiddenModal"
      :isOpen="isModalSyncBalanceOpen"
    />
  </section>

  <section v-if="loadModalEditAccount">
    <ModalEditAccount
      :accountId="account_Id"
      @hiddenModal="hiddenModal"
      :isOpen="isModalEditAccountOpen"
    />
  </section>
</template>

<style>
.stats-icon {
  color: #fff;
}
</style>
