import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import StyleView from '../pages/StyleView.vue'
import FoodView from '@/pages/FoodView.vue'
import CollectView from '@/pages/CollectView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  { path: '/home', redirect: { name: 'home' } },
  {
    path: '/style',
    name: 'style',
    component: StyleView,
  },
  {
    path: '/food',
    name: 'food',
    component: FoodView,
  },
  {
    path: '/collect',
    name: 'collect',
    component: CollectView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
