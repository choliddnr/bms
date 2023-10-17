<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watch, onBeforeUpdate } from 'vue'
import { useUserStore } from './stores'

import { auth } from '@/modules/core/firebase'
import { onAuthStateChanged } from 'firebase/auth'

import Sidebar from './layout/Sidebar.vue'
import Topbar from './layout/Topbar.vue'
import { isDesktop } from './modules/core/utils/isDesktop'
// import Toast from "./Notifications/Toast.vue";
import { useRouter } from 'vue-router'
const router = useRouter()

const sidebar = ref<boolean>(false)
const desktop = ref<boolean>(isDesktop())
const isOnAuthPage = ref<boolean>(false)
const authInitialized = ref<boolean>(false)

const user = useUserStore()

const logout = async () => {
  user.logout()
  router.push({ name: 'Login' })
  isOnAuthPage.value = true
  console.log('Logout', isOnAuthPage.value, user.isAuthenticated)
}

onMounted(async () => {
  await router.isReady()
  onAuthStateChanged(auth, (usr) => {
    authInitialized.value = true
    if (usr) {
      user.isAuthenticated = true
      user.user = usr
    } else {
      user.isAuthenticated = false
      user.user = null
    }
    if (
      router.currentRoute.value.name === 'Register' ||
      router.currentRoute.value.name === 'Login'
    ) {
      if (user.isAuthenticated) {
        router.push({ name: 'Dashboard' })
        isOnAuthPage.value = false
      }
      isOnAuthPage.value = true
    } else {
      isOnAuthPage.value = false
    }
  })
})
</script>

<template v-if="authInitialized">
  <template v-if="isOnAuthPage && !user.isAuthenticated">
    <div class="container-fluid">
      <RouterView />
    </div>
  </template>
  <template v-else>
    <div class="layout-wrapper" id="wrapper">
      <div
        id="sidebar"
        :class="[sidebar ? 'active' : 'inactive', desktop ? 'sidebar-desktop' : '']"
      >
        <Sidebar v-model:isDesktop="desktop" v-model:showSidebar="sidebar" />
      </div>

      <div id="main" class="layout-navbar navbar-fixed">
        <Topbar @toggleSidebar="sidebar = !sidebar" @logout="logout" />

        <!-- Page Content -->
        <div id="main-content">
          <RouterView />
        </div>

        <footer>
          <div class="footer clearfix mb-0 text-muted">
            <div class="float-start">
              <p>2023 &copy; Tsurayya Engineering</p>
            </div>
            <div class="float-end">
              <p>
                Crafted with
                <span class="text-danger"><i class="bi bi-heart-fill icon-mid"></i></span>
                by <a href="#">Tsurayya Engineering Team</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss">
#main {
  margin-left: 250px;
  //padding: 2rem;
  min-height: 100vh;
  @media screen and (max-width: 1199px) {
    margin-left: 0;
  }
  &.layout-navbar {
    padding: 0;
    transition: margin-left 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &.layout-horizontal {
    padding: 0;
    margin: 0;
  }
  #main-content {
    padding: 0 2rem;
  }
  @media (max-width: 576px) {
    #main-content {
      padding: 0;
    }
  }
}
</style>
