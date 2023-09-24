<script setup lang="ts">
import initDataTable from '@/modules/core/utils/initSimpleDatatable'
import { onMounted } from 'vue'

onMounted(() => {
  const tableEL = document.querySelector('#dtMutation') as HTMLTableElement
  const datatable = initDataTable(tableEL)
  console.log(datatable)
})
</script>

<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <div class="dropdown-centered">
        <a
          class="dropdown-toggle text-gray-600"
          href="#"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          This Week
          <!-- <i class='bi bi-envelope bi-sub fs-4'></i> -->
        </a>
        <hr class="mt-0" />
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
          <li><a class="dropdown-item" href="#">Today</a></li>
          <li><a class="dropdown-item" href="#">This Week</a></li>
          <li><a class="dropdown-item" href="#">This Month</a></li>
          <li><a class="dropdown-item" href="#">This Year</a></li>
          <li><a class="dropdown-item" href="#">All</a></li>
          <!-- <li><a class="dropdown-item" href="#">Custom Range</a></li> -->
        </ul>
      </div>
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
            <a class="dropdown-item" href="#"
              ><i class="icon-mid bi bi-person me-2"></i>Add New Mutation</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#"><i class="icon-mid bi bi-gear me-2"></i> Settings</a>
          </li>
          <li>
            <a class="dropdown-item" href="#"><i class="icon-mid bi bi-wallet me-2"></i> Wallet</a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" href="#"
              ><i class="icon-mid bi bi-box-arrow-left me-2"></i> Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="card-body">
      <table class="table table-striped" id="dtMutation">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Graiden</td>
            <td>vehicula.aliquet@semconsequat.co.uk</td>
            <td>076 4820 8838</td>
            <td>Offenburg</td>
            <td>
              <span class="badge bg-success">Active</span>
            </td>
          </tr>
          <tr>
            <td>Nathaniel</td>
            <td>mi.Duis@diam.edu</td>
            <td>(012165) 76278</td>
            <td>Grumo Appula</td>
            <td>
              <span class="badge bg-danger">Inactive</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
