import { defineStore } from 'pinia'

export const useUiStore = defineStore('uistore', {
  state: () => {
    return {
      loginModalOpen: false,
      registerModalOpen: false,
    }
  },
  actions: {
    openLoginModal() {
      this.loginModalOpen = true
    },
    closeLoginModal() {
      this.loginModalOpen = false
    },
    openRegisterModal() {
      this.resgisterModalOpen = true
    },
    closeRegisterModal() {
      this.resgisterModalOpen = false
    },
  },
})
