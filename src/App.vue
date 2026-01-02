<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import LoginModal from './components/LoginModal.vue'
import RegisterModal from './components/RegisterModal.vue'

console.log('DATA_SOURCE:', import.meta.env.VITE_DATA_SOURCE)
console.log('API_BASE:', import.meta.env.VITE_API_BASE_URL)

const isLoginOpen = ref(false)
const RegisterOpen = ref(false)

const handleSwitchToLogin = () => {
  RegisterOpen.value = false
  isLoginOpen.value = true
}

const handleSwitchToRegister = () => {
  isLoginOpen.value = false
  RegisterOpen.value = true
}
</script>

<template>
  <main>
    <Header @open-login="isLoginOpen = true" />
    <LoginModal
      :open="isLoginOpen"
      @update:open="isLoginOpen = $event"
      @switch-to-register="handleSwitchToRegister"
    />
    <RegisterModal
      :open="RegisterOpen"
      @update:open="RegisterOpen = $event"
      @switch-to-login="handleSwitchToLogin"
    />
    <RouterView />
  </main>
</template>

<style scoped></style>
