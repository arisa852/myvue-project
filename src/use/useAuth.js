import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/useAuthStore'

export function useAuth() {
  const authStore = useAuthStore()

  authStore.initAuthListener()

  const { user, Token, loading, error, isLoggedIn } = storeToRefs(authStore)

  return {
    loading,
    error,
    user,
    isLoggedIn,
    Token,

    login: authStore.login,
    logout: authStore.logout,
    register: authStore.register,
    refreshToken: authStore.refreshToken,
  }
}
