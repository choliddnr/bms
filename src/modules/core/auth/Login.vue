<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from '../../../stores'

const user = useUserStore()
const router = useRouter()

const email = ref<string>()
const password = ref<string>()
const login = () => {
  if (email && password) {
    user.login(email.value, password.value)
    router.push({ name: 'Dashboard' })
  }
}
</script>
<template>
  <div class="row h-100">
    <div class="col-md-6 col-lg-5 col-12">
      <div id="auth-left" class="p-5">
        <h1 class="auth-title text-center">Log in.</h1>
        <p class="auth-subtitle mb-5 text-center">
          Log in with your data that you entered during registration.
        </p>

        <div class="form-group position-relative has-icon-left mb-4">
          <input type="email" class="form-control" placeholder="Email" v-model="email" />
          <div class="form-control-icon">
            <i class="bi bi-envelope"></i>
          </div>
        </div>
        <div class="form-group position-relative has-icon-left mb-4">
          <input type="password" class="form-control" placeholder="Password" v-model="password" />
          <div class="form-control-icon">
            <i class="bi bi-shield-lock"></i>
          </div>
        </div>
        <div class="form-check form-check-lg d-flex align-items-end">
          <input class="form-check-input me-2" type="checkbox" value="" id="flexCheckDefault" />
          <label class="form-check-label text-gray-600" for="flexCheckDefault">
            Keep me logged in
          </label>
        </div>
        <button class="btn btn-primary btn-block mt-3" @click="login">Log in</button>
        <div class="text-center mt-5 fs-5">
          <p class="text-gray-600">
            Don't have an account?
            <RouterLink to="/auth/register" class="font-bold">Sign Up</RouterLink>
          </p>
          <p><a class="font-bold" href="auth-forgot-password.html">Forgot password?</a>.</p>
        </div>
      </div>
    </div>
    <div class="col-lg-7 d-none d-lg-block">
      <div id="auth-right"></div>
    </div>
  </div>
</template>
