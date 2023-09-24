// import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/app.scss'
import './assets/scss/themes/dark/app-dark.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import bootstrapBundle from 'bootstrap/dist/js/bootstrap.bundle'
// window.bootstrap = bootstrapBundle

import bootstrapBundle from 'bootstrap/dist/js/bootstrap.bundle'
window.bootstrap = bootstrapBundle

import featherIcons from 'feather-icons'
featherIcons.replace()

// import "./assets/static/js/components/dark.js"
// import "./assets/extensions/perfect-scrollbar/perfect-scrollbar.min.js"

const app = createApp(App)

// app.use(bootstrap)
app.use(createPinia())
app.use(router)

app.mount('#app')
