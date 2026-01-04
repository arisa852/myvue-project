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
          <h3>登入</h3>
        </header>
        <form class="auth-form" @submit.prevent="userLogin">
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
          <label class="remember">
            <input type="checkbox" v-model="rememberId" />
            <span class="remember-text">記住帳號</span>
          </label>
          <p v-if="errorMsg" class="auth-error">{{ errorMsg }}</p>
          <div class="auth-btn-group">
            <button type="submit" class="btn-primary" :disabled="loading">
              {{ loading ? '登入中...' : '登入' }}
            </button>
            <button type="button" class="btn-register" @click="goToRegister">還沒有帳號 →</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import selectAuthImg from '@/assets/images/selectdis.jpg'
import { useAuth } from '@/use/useAuth'
import { toast } from 'vue3-toastify'

const LOGIN_EMAIL_KEY = 'login_email'

export default {
  name: 'LoginModal',
  props: {
    open: { type: Boolean, default: false },
    selectAuth: { type: String, default: selectAuthImg },
    selectdisorder: { type: String, default: 'loginimage' },
  },
  emits: ['update:open', 'login', 'switch-to-register'],
  setup(props, { emit }) {
    const user = reactive({ email: '', password: '' })
    const rememberId = ref(!!localStorage.getItem('LOGIN_EMAIL_KEY'))
    const errorMsg = ref('')
    const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/

    const { login, loading } = useAuth()

    const saveEmail = localStorage.getItem(LOGIN_EMAIL_KEY)
    if (saveEmail) {
      user.email = saveEmail
    }

    watch(
      () => props.open,
      (v) => {
        document.body.style.overflow = v ? 'hidden' : ''
      },
      { immediate: true },
    )
    const closeModal = () => {
      console.log('closeModal click')
      emit('update:open', false)
    }

    const goToRegister = () => {
      closeModal()
      emit('switch-to-register')
    }

    async function userLogin() {
      errorMsg.value = ''

      if (!user.email) {
        errorMsg.value = 'Email欄位不可為空'
        return
      }

      if (!user.password) {
        errorMsg.value = 'Password欄位不可為空'
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
        await login(user.email, user.password)
        console.log('登入成功', user.email)

        if (rememberId.value) {
          localStorage.setItem('LOGIN_EMAIL_KEY', user.email)
        } else {
          localStorage.removeItem('LOGIN_EMAIL_KEY')
        }

        closeModal()
        emit('login')
        toast.success('登入成功')
      } catch (e) {
        console.error(e)
        errorMsg.value = '登入失敗，請確認帳號密碼'
      }
    }

    return { user, loading, errorMsg, closeModal, userLogin, goToRegister }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.auth-content > .remember {
  display: flex;
  align-items: center;
  gap: $space-md;
  user-select: none;
  color: $text-color;
}
</style>
