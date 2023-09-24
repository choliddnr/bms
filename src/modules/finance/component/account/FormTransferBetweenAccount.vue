<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCashAccountStore } from '../../stores'
import type { TransactionTBA } from '../../types'
import { toCurrency, toNumber } from '@/modules/core/utils/formatNumberCurrentcy'

const cashAccount = useCashAccountStore()

const from = ref<number>()
const to = ref<number>()
const nominal = ref<string>()
const desc = ref<string>()

watch(nominal, () => {
  if (!nominal.value) {
    return
  }
  nominal.value = toCurrency(nominal.value!)
})

const save = (e: any) => {
  e.preventDefault()
  if (from.value && to.value && nominal.value && desc.value) {
    let data = ref<TransactionTBA>({
      datetime: new Date().getTime(),
      from: from.value,
      to: to.value,
      amount: toNumber(nominal.value),
      desc: desc.value,
      type: 'tba',
    })
    cashAccount.tba(data.value)
  } else {
    console.log('something wrong')
  }
}
</script>

<template>
  <!-- // Basic multiple Column Form section start -->
  <section id="multiple-column-form">
    <div class="row match-height">
      <div class="col-12">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <form class="form">
                <div class="row">
                  <div class="col-md-4 col-12">
                    <div class="form-group">
                      <label for="from">From</label>
                      <select class="form-select" aria-label="from" v-model="from">
                        <option v-for="ba in cashAccount.cashAccounts" :value="ba.id">
                          {{ ba.name }} - {{ ba.desc }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4 col-12">
                    <div class="form-group">
                      <label for="to">To</label>
                      <select class="form-select" aria-label="to" v-model="to">
                        <option v-for="ba in cashAccount.cashAccounts" :value="ba.id">
                          {{ ba.name }} - {{ ba.desc }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4 col-12">
                    <div class="form-group">
                      <label for="nominal">Nominal</label>
                      <input
                        type="text"
                        id="nominal"
                        class="form-control"
                        placeholder="Nominal"
                        name="nominal"
                        v-model="nominal"
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-12">
                    <div class="form-group">
                      <label for="desc">Description</label>
                      <textarea class="form-control" rows="2" v-model="desc"></textarea>
                    </div>
                  </div>
                  <p>{{ nominal }}</p>
                  <div class="col-12 d-flex justify-content-end">
                    <button @click="save" class="btn btn-primary me-1 mb-1">Submit</button>
                    <button type="reset" class="btn btn-light-secondary me-1 mb-1">Reset</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- // Basic multiple Column Form section end -->
</template>
