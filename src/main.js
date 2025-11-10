import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style/main.scss'

import App from './App.vue'
import router from './router/index.js'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
