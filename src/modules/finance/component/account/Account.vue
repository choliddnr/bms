<script setup lang="ts">
// import { DataTable } from 'simple-datatables'
import { onMounted, defineAsyncComponent, ref } from 'vue'
import LoadingSpinner from '@/modules/core/components/LoadingSpinner.vue'

const showList = ref<boolean>(true)
const List = defineAsyncComponent(() => import('./List.vue'))

const showTBAForm = ref<boolean>(false)
const TBAForm = defineAsyncComponent({
  loader: () => import('./FormTransferBetweenAccount.vue'),
  delay: 10000,
  timeout: 3000,
})
</script>

<template>
  <div class="page-heading">
    <div class="page-title">
      <div class="row">
        <div class="col-12 col-md-6 order-md-1 order-last">
          <h3>Account</h3>
        </div>
        <div class="col-12 col-md-6 order-md-2 order-first">
          <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
              <li class="breadcrumb-item active" aria-current="page">Layout Vertical Navbar</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <div class="page-content">
    <section class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <ul class="nav nav-underline" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link active"
                  id="list-tab"
                  data-bs-toggle="tab"
                  href="#list"
                  role="tab"
                  aria-controls="list"
                  aria-selected="false"
                  @click="showList = true"
                  >List</a
                >
              </li>
              <li class="nav-item" role="presentation">
                <a
                  class="nav-link"
                  id="tba-tab"
                  data-bs-toggle="tab"
                  href="#tba"
                  role="tab"
                  aria-controls="tba"
                  aria-selected="false"
                  @click="showTBAForm = true"
                  >Transfer Between Account</a
                >
              </li>
            </ul>
            <hr class="mt-0" />
          </div>
        </div>
        <div class="row">
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade active show"
              id="list"
              role="tabpanel"
              aria-labelledby="list-tab"
            >
              <Suspense v-if="showList">
                <template #default>
                  <List />
                </template>
                <template #fallback>
                  <LoadingSpinner />
                </template>
              </Suspense>
            </div>
            <div class="tab-pane fade" id="tba" role="tabpanel" aria-labelledby="tba-tab">
              <Suspense v-if="showTBAForm">
                <template #default>
                  <TBAForm />
                </template>
                <template #fallback> <LoadingSpinner /> </template>
              </Suspense>
              <!-- <TBAForm v-if="showTBAForm" /> -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
