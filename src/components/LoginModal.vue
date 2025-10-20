<template>
  <!------遮罩------>
  <div v-if="open" class="mask" @click.self="closeModal"></div>
  <!------彈窗------>
  <div v-if="open" class="modal">
    <div class="modal-panel">
      <div class="left">
        <img :src="selectAuth" :alt="selectdisorder" />
      </div>
      <div class="content">
        <header class="modal-header">
          <h3>登入</h3>
          <button @click="closeModal" class="button-close" aria-label="關閉按鈕">x</button>
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
    const rememberId = ref(!!localStorage.getItem('saveEmail'))
    const loading = ref(false)
    const errorMsg = ref('')

    onMounted(() => {
      const saved = localStorage.getItem('saveEmail')
      if (saved) user.email = saved
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
      emit('update:open', false)
      document.body.style.overflow = ''
    }
    const userLogin = async () => {
      loading.value = true
      errorMsg.value = ''
      try {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (user.email === 'test@example.com' && user.password === '123456') {
              resolve()
            } else {
              reject(new Error('帳號密碼錯誤'))
            }
          }, 800)
        })

        if (rememberId.value) {
          localStorage.setItem('saveEmail', user.email)
        } else {
          localStorage.removeItem('saveEmail')
        }
        emit('login', { email: user.email })
        closeModal()
      } catch (err) {
        errorMsg.value = err?.message || '登入失敗'
      } finally {
        loading.value = false
      }
    }
    return { user, rememberId, loading, errorMsg, closeModal, userLogin }
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
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: min(90vw, 800px);
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 420px;
  align-items: stretch;

  .left {
    width: 50%;
    flex: 1;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      overflow: hidden;
      display: block;
    }
  }
}

.content {
  flex: 1;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .modal-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 12px;
    position: relative;

    & h3 {
      margin: 0;
      @include subheading-style;
    }

    .button-close {
      background: none;
      border: none;
      font-size: 30px;
      cursor: pointer;
      line-height: 1;
      position: absolute;
      right: -150px;
      top: -50px;
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
  display: inline-block;
  padding: 8px 16px;
  margin-top: 10px;
  position: relative;

  .btn-primary {
    @include button-style;
    color: #fff;
    width: 100%;
  }
  .btn-register {
    position: absolute;
    right: 0;
    top: 60px;
    @include button-style {
      background-color: transparent;
      border: none;
      font-size: 1rem;
      color: #666;
    }
    &:hover {
      text-decoration: underline;
      opacity: 1;
    }
  }
}
</style>
