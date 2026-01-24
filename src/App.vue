<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import LoginModal from './components/LoginModal.vue'
import RegisterModal from './components/RegisterModal.vue'
import { useUiStore } from './stores/useUiStore'
import { storeToRefs } from 'pinia'

console.log('DATA_SOURCE:', import.meta.env.VITE_DATA_SOURCE)
console.log('API_BASE:', import.meta.env.VITE_API_BASE_URL)

const uiStore = useUiStore()

const { loginModalOpen, registerModalOpen } = storeToRefs(uiStore)

const handleSwitchToLogin = () => {
  uiStore.openLoginModal()
}

const handleSwitchToRegister = () => {
  uiStore.openRegisterModal()
}
</script>

<template>
  <main>
    <Header @open-login="uiStore.openLoginModal()" />
    <LoginModal v-model:open="loginModalOpen" @switch-to-register="handleSwitchToRegister" />
    <RegisterModal v-model:open="registerModalOpen" @switch-to-login="handleSwitchToLogin" />
    <RouterView />
  </main>
</template>

<style scoped></style>
