import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  { path: '/home', redirect: { name: 'home' } },
  {
    path: '/food',
    name: 'food',
    component: '',
  },
  {
    path: '/wear',
    name: 'wear',
    component: '',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
