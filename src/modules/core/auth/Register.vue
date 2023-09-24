<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import { useUserStore } from '../../../stores'

const user = useUserStore()
const router = useRouter()

const username = ref<string>()
const email = ref<string>()
const password = ref<string>()
const confPassword = ref<string>()
const register = () => {
  if (password.value !== confPassword.value) {
    console.log(`password and confirm password doesn't match`)
    return
  }
  user.register(username.value, email.value, password.value)
  router.push({ name: 'Dashboard' })
}
</script>

<template>
  <div class="row h-100">
    <div class="col-md-6 col-lg-5 col-12">
      <div id="auth-left" class="p-5">
        <h1 class="auth-title text-center">Sign Up</h1>
        <p class="auth-subtitle mb-5 text-center">Input your data to register to our website.</p>

        <form action="index.html">
          <div class="form-group position-relative has-icon-left mb-4">
            <input
              type="text"
              class="form-control form-control"
              placeholder="Email"
              v-model="email"
            />
            <div class="form-control-icon">
              <i class="bi bi-envelope"></i>
            </div>
          </div>
          <div class="form-group position-relative has-icon-left mb-4">
            <input
              type="text"
              class="form-control form-control"
              placeholder="Username"
              v-model="username"
            />
            <div class="form-control-icon">
              <i class="bi bi-person"></i>
            </div>
          </div>
          <div class="form-group position-relative has-icon-left mb-4">
            <input
              type="password"
              class="form-control form-control"
              placeholder="Password"
              v-model="password"
            />
            <div class="form-control-icon">
              <i class="bi bi-shield-lock"></i>
            </div>
          </div>
          <div class="form-group position-relative has-icon-left mb-4">
            <input
              type="password"
              class="form-control form-control"
              placeholder="Confirm Password"
              v-model="confPassword"
            />
            <div class="form-control-icon">
              <i class="bi bi-shield-lock"></i>
            </div>
          </div>
          <button class="btn btn-primary btn-block btn shadow mt-1" @click="register">
            Sign Up
          </button>
        </form>
        <div class="text-center mt-5 fs-5">
          <p class="text-gray-600">
            Already have an account?
            <RouterLink to="/auth/login" class="font-bold">Login</RouterLink>
          </p>
        </div>
      </div>
    </div>
    <div class="col-7 d-none d-block">
      <div id="auth-right"></div>
    </div>
  </div>
</template>
