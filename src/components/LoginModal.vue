<template>
  <!------遮罩------>
  <div v-if="open" class="mask" @click.self="closeModal"></div>
  <!------彈窗------>
  <div v-if="open" class="modal">
    <div class="modal-panel">
      <button @click="closeModal" class="button-close" aria-label="關閉按鈕" type="button">
        x
      </button>
      <div class="left">
        <img :src="selectAuth" :alt="selectdisorder" />
      </div>
      <div class="content">
        <header class="modal-header">
          <h3>登入</h3>
        </header>
        <form class="login-form" @submit.prevent="userLogin">
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
          <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
          <div class="btn-group">
            <button type="submit" class="btn-primary" :disabled="loading">
              {{ loading ? '登入中...' : '登入' }}
            </button>
            <button type="button" class="btn-register" @click="$router.push('./register')">
              還沒有帳號 →
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch, onMounted } from 'vue'
import selectAuthImg from '@/assets/images/selectdis.jpg'
import { useAuth } from '@/use/useAuth'

const LOGIN_EMAIL_KEY = 'login_email'

export default {
  name: 'LoginModal',
  props: {
    open: { type: Boolean, default: false },
    selectAuth: { type: String, default: selectAuthImg },
    selectdisorder: { type: String, default: 'loginimage' },
  },
  emits: ['update:open', 'login'],
  setup(props, { emit }) {
    const user = reactive({ email: '', password: '' })
    const rememberId = ref(!!localStorage.getItem('LOGIN_EMAIL_KEY'))
    const errorMsg = ref('')

    const { login, loading } = useAuth()

    const saveEmail = localStorage.getItem(LOGIN_EMAIL_KEY)
    if (saveEmail) {
      user.email = saveEmail
    }

    onMounted(() => {
      if (props.open) document.body.style.overflow = 'hidden'
    })
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
      document.body.style.overflow = ''
    }

    async function userLogin() {
      errorMsg.value = ''

      try {
        await login(user.email, user.password)
        console.log('登入成功',user.email)

        if (rememberId.value) {
          localStorage.setItem('LOGIN_EMAIL_KEY', user.email)
        } else {
          localStorage.removeItem('LOGIN_EMAIL_KEY')
        }

        closeModal()
        emit('login')
      } catch {
        errorMsg.value = '登入失敗，請確認帳號密碼'
      }
    }

    return { user, loading, errorMsg, closeModal, userLogin }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.mask {
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  inset: 0;
  z-index: 1000;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 1001;
  display: grid;
  place-items: center;
  z-index: 1001;
  padding: 10px;
}

.modal-panel {
  background-color: $white-color;
  border-radius: $radius-md;
  display: flex;
  box-shadow: $shadow-lg;
  overflow: hidden;
  width: min(90vw, 800px);
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 380px;
  align-items: stretch;
  position: relative;

  @include respond-to(pad) {
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    min-height: 800px;
  }
  @include respond-to(mobile) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    min-height: 600px;
  }

  .button-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
    border: none;
    background: none;
    cursor: pointer;
    z-index: 10;
    font-size: 30px;
    line-height: 1;
    transition: transform 0.15s ease;

    @media (hover: hover) {
      &:hover {
        transform: scale(1.08);
      }
    }
    &:active {
      transform: scale(0.9);
    }

    @include respond-to(pad) {
      font-size: 40px;
    }
    @include respond-to(mobile) {
      font-size: 40px;
    }
  }

  .left {
    width: 50%;
    flex: 1;

    @include respond-to(pad) {
      width: 100%;
    }

    @include respond-to(mobile) {
      width: 100%;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}

.content {
  flex: 1;
  padding: $space-sm $space-md;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .modal-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $space-lg $space-md;

    & h3 {
      margin: 0;
      @include subheading-style;
    }
  }
}

.login-form {
  width: 100%;
  max-width: 360px;
  display: grid;
  row-gap: 14px;
  justify-content: stretch;

  label.field {
    display: grid;
    grid-template-columns: 50px minmax(0, 1fr);
    align-items: center;
    column-gap: 12px;

    &.field > span {
      @include paragraph-style {
        line-height: 1.4;
      }
    }

    &.field > input {
      width: 100%;
      min-width: 40px;
      padding: 8px 16px;
      border: 1px solid $primary-color;
      border-radius: 15px;
      font-size: 1rem;
      box-sizing: border-box;
    }
    &.remember {
      display: flex;
      align-items: center;
      gap: 15px;
      user-select: none;
      color: $text-color;
    }
  }
}

.error {
  color: #e53935;
  font-size: 0.9rem;
}

.btn-group {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  padding: $space-sm $space-md;
  margin-top: $space-lg;

  .btn-primary {
    @include button-style;
    color: $white-color;
    width: 100%;
  }
  .btn-register {
    @include button-style {
      background-color: transparent;
      border: none;
      font-size: 1rem;
      color: $paragraph-color;
    }
    &:hover {
      text-decoration: underline;
      opacity: 1;
    }
  }
}
</style>
