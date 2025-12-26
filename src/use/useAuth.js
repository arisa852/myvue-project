import { ref, computed } from 'vue'

import { userLogin, userLogout, userRegister } from '@/services/auth.service'

import { auth } from '@/services/firebase'

import { onAuthStateChanged } from 'firebase/auth'

const loading = ref(false)
const error = ref(null)
const user = ref(null)
const Token = ref(null)

let unsub = null
let inited = false

async function syncToken(currentUser) {
  if (!currentUser) {
    Token.value = null
    return
  }
  Token.value = await currentUser.getIdToken()
}

function initAuthListener() {
  if (inited) return
  inited = true

  loading.value = true
  unsub = onAuthStateChanged(auth, async (currentUser) => {
    user.value = currentUser

    try {
      await syncToken(currentUser)
    } finally {
      loading.value = false
    }
  })
}

export function useAuth() {
  initAuthListener()

  const isLoggedIn = computed(() => !!user.value)

  async function login(email, password) {
    loading.value = true
    error.value = null
    try {
      const res = await userLogin(email, password)
      user.value = res.user
      Token.value = res.token
      return res
    } catch (e) {
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }

  async function register(email, password) {
    loading.value = true
    error.value = null
    try {
      const res = await userRegister(email, password)
      user.value = res.user
      Token.value = res.token
      return res
    } catch (e) {
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }
  async function logout() {
    loading.value = true

    try {
      await userLogout()
      user.value = null
      Token.value = null
    } catch (e) {
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }

  async function refreshToken() {
    await syncToken(auth.currentUser)
    return Token.value
  }

  return {
    loading,
    error,
    user,
    isLoggedIn,
    Token,
    useAuth,
    logout,
    register,
    refreshToken,
    login,
  }
}
