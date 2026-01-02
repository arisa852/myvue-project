import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import './assets/style/main.scss'

import App from './App.vue'
import router from './router/index.js'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 5000,
  position: toast.POSITION.TOP_CENTER,
  theme: 'colored',
  pauseOnHover: true,
  closeOnClick: true,
})

app.mount('#app')
