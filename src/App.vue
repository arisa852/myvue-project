<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import LoginModal from './components/LoginModal.vue'

console.log('DATA_SOURCE:', import.meta.env.VITE_DATA_SOURCE)
console.log('API_BASE:', import.meta.env.VITE_API_BASE_URL)

const isLoginOpen = ref(false)
</script>

<template>
  <Header @open-login="isLoginOpen = true" />
  <LoginModal :open="isLoginOpen" @update:open="isLoginOpen = $event" />
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
