import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/useAuthStore'
import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import './assets/style/main.scss'

import App from './App.vue'
import router from './router/index.js'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const app = createApp(App)
const pinia = createPinia()

app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 5000,
  position: toast.POSITION.TOP_CENTER,
  theme: 'colored',
  pauseOnHover: true,
  closeOnClick: true,
})

const authStore = useAuthStore(pinia)
authStore.initAuthListener()

app.mount('#app')
