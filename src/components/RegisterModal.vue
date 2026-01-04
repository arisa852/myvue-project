<template>
  <!------遮罩------>
  <div v-if="open" class="auth-mask" @click.self="closeModal"></div>
  <!------彈窗------>
  <div v-if="open" class="auth-modal">
    <div class="auth-modal-panel">
      <button @click="closeModal" class="auth-button-close" aria-label="關閉按鈕" type="button">
        x
      </button>
      <div class="auth-left">
        <img :src="selectAuth" :alt="selectdisorder" />
      </div>
      <div class="auth-content">
        <header class="modal-header">
          <h3>註冊</h3>
        </header>
        <form class="auth-form" @submit.prevent="handleRegister">
          <label class="field">
            <span>帳號</span>
            <input type="email" v-model.trim="user.email" required placeholder="you@example.com" />
          </label>
          <!-----密碼-->
          <label class="field">
            <span>密碼</span>
            <input
              type="password"
              v-model.trim="user.password"
              required
              placeholder="請輸入密碼"
              minlength="6"
            />
          </label>
          <label class="field">
            <span>確認密碼</span>
            <input
              type="password"
              v-model.trim="passwordconfirm"
              required
              placeholder="請再次輸入密碼"
              minlength="6"
            />
          </label>
          <p v-if="errorMsg" class="auth-error">{{ errorMsg }}</p>
          <div class="auth-btn-group">
            <button type="submit" class="btn-primary" :disabled="loading">
              {{ loading ? '註冊中...' : '註冊' }}
            </button>
            <button type="button" class="btn-register" @click="goToLogin">已有帳號 →</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useAuth } from '@/use/useAuth'
import selectAuthImg from '@/assets/images/selectdis.jpg'
import { toast } from 'vue3-toastify'

defineProps({
  open: { type: Boolean, default: false },
  selectAuth: { type: String, default: selectAuthImg },
  selectdisorder: { type: String, default: 'loginimage' },
})

const emit = defineEmits(['update:open', 'register', 'switch-to-login'])

const user = reactive({ email: '', password: '' })
const passwordconfirm = ref('')

const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
const errorMsg = ref('')

const { register, loading } = useAuth()

const closeModal = () => {
  emit('update:open', false)
}

const goToLogin = () => {
  closeModal()
  emit('switch-to-login')
}

async function handleRegister() {
  errorMsg.value = ''

  if (!user.email) {
    errorMsg.value = 'Email欄位不可為空'
    return
  }

  if (!user.password) {
    errorMsg.value = 'Password欄位不可為空'
    return
  }

  if (user.password !== passwordconfirm.value) {
    errorMsg.value = '兩次輸入的密碼不一致'
    return
  }

  if (!emailRule.test(user.email)) {
    errorMsg.value = '請輸入正確的 Email 格式'
    return
  }

  if (user.password.length < 6) {
    errorMsg.value = '密碼至少需要 6 個字元'
    return
  }

  try {
    await register(user.email, user.password)
    console.log('註冊成功', user.email)
    closeModal()
    emit('register')
    toast.success('註冊成功')
  } catch (e) {
    console.error(e)
    errorMsg.value = '註冊失敗，請確認帳號密碼'
  }
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;
</style>
