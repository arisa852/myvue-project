<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import LoginModal from './components/LoginModal.vue'

const isLoginOpen = ref(false)
</script>

<template>
  <Header @open-login="isLoginOpen = true" />
  <LoginModal :open="isLoginOpen" @update:open="isLoginOpen = $event" />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped></style>
