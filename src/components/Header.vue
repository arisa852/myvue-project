<template>
  <header class="header">
    <div class="wrapper">
      <div class="logo-container">
        <RouterLink to="/">
          <img :src="logoUrl" alt="logo" />
        </RouterLink>
      </div>
      <div class="list-container">
        <nav class="nav">
          <ul class="menus">
            <li v-for="item in menus" :key="item.to">
              <RouterLink :to="item.to">{{ item.label }}</RouterLink>
            </li>
          </ul>
        </nav>
        <div class="area-auth">
          <button
            v-if="!isLoggedIn"
            @click="openLogin"
            class="login-btn"
            type="button"
            :disabled="loading"
          >
            {{ loading ? '載入中' : '登入' }}
          </button>

          <!-- 已登入 -->
          <div v-else class="user-area">
            <span class="user-email">{{ displayName }}</span>
            <button type="button" class="logout-btn" @click="onClickLogout" :disabled="loading">
              登出
            </button>
          </div>
        </div>
      </div>

      <!-- 手機板選單 -->
      <div
        class="hamburger"
        @click="toggleMenu"
        :class="{ open: isOpen }"
        aria-controls="mobile-nav"
        :aria-expanded="isOpen ? 'true' : 'false'"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="hamburger-menu" v-if="isOpen">
        <ul class="navbar">
          <li v-for="menu in menus" :key="menu.to">
            <RouterLink :to="menu.to" @click="closeMenu">{{ menu.label }}</RouterLink>
          </li>
          <li class="login-icon">
            <button @click="openLogin" aria-label="登入" v-if="!isLoggedIn">
              <i class="bi bi-person-circle"></i>
            </button>
            <button v-else @click="onClickLogout" type="button">
              <i class="bi bi-person-check-fill logged-in"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import logoUrl from '../assets/images/logo3.png'
import { useAuth } from '@/use/useAuth'
import { toast } from 'vue3-toastify'

export default {
  name: 'Header',
  emits: ['open-login'],
  setup(props, { emit }) {
    const menus = ref([
      { label: '找美食', to: '/food' },
      { label: '穿搭靈感', to: '/style' },
      // { label: '收藏', to: '/collect' },
    ])

    const isOpen = ref(false)
    let mql = null
    let handle = null

    const { user, isLoggedIn, logout, loading } = useAuth()
    const toggleMenu = () => {
      isOpen.value = !isOpen.value
    }

    const closeMenu = () => {
      isOpen.value = false
    }

    onMounted(() => {
      mql = window.matchMedia('(min-width:1024px)')

      handle = () => {
        if (mql.matches) {
          isOpen.value = false
        }
      }
      handle()
      mql.addEventListener?.('change', handle)
      mql.addListener?.(handle)
    })

    onBeforeUnmount(() => {
      mql?.removeEventListener?.('change', handle)
      mql?.removeListener?.(handle)
    })

    const onClickLogout = async () => {
      try {
        await logout()
        toast.success('已成功登出')
      } catch (e) {
        console.log('登出失敗', e)
      }
    }

    const displayName = computed(() => user.value?.email ?? '訪客')

    const openLogin = () => emit('open-login')
    return {
      menus,
      logoUrl,
      openLogin,
      isOpen,
      toggleMenu,
      closeMenu,
      onClickLogout,
      displayName,
      isLoggedIn,
      loading,
    }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.header {
  background-color: $white-color;
  box-shadow: $shadow-md;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
}

.wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: $space-sm;
  justify-content: space-between;
  margin: 0 auto;

  @include respond-to(pad) {
    padding: $space-lg;
    justify-content: space-between;
    align-items: center;
    max-width: 768px;
  }
  @include respond-to(mobile) {
    padding: $space-md $space-sm;
    justify-content: space-between;
    align-items: center;
    max-width: 600px;
  }
}

.logo-container {
  width: 100px;
  margin-right: 20px;
  justify-items: start;

  @include respond-to(pad) {
    width: 100px;
    margin-right: 0;
  }
  @include respond-to(mobile) {
    width: 120px;
  }

  img {
    width: 100%;
    object-fit: cover;
    display: block;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.list-container {
  display: flex;
  align-items: center;
  gap: $space-md;
  margin-left: auto;
}

.menus {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: $space-2xl;

  a {
    text-decoration: none;
    color: inherit;
    font-size: 1rem;
    font-weight: 400;
  }
  a:hover {
    color: $primary-color;
  }
}

.area-auth {
  display: flex;
  align-items: center;
  justify-content: end;

  .login-btn {
    @include button-style {
      background-color: $white-color;
      border: 2px solid $primary-color;
      color: $primary-color;
      font-weight: bold;
      border-radius: $radius-xl;
    }
  }
  .user-email {
    @include paragraph-style;
    color: $text-color;
    margin-right: $space-sm;
  }
  .logout-btn {
    @include button-style {
      background-color: $white-color;
      border: 2px solid $primary-color;
      color: $primary-color;
      border-radius: $radius-xl;
    }
  }
}

.hamburger {
  position: relative;
  width: 36px;
  height: 28px;
  cursor: pointer;
  border: 0;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  z-index: 1001;

  & span {
    position: absolute;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #333;
    border-radius: 2px;
    transition: transform 0.2s ease;
  }

  span:nth-child(1) {
    top: 4px;
  }
  span:nth-child(2) {
    top: 12px;
  }
  span:nth-child(3) {
    top: 20px;
  }

  &.open {
    span:nth-child(1) {
      top: 12px;
      transform: rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      top: 12px;
      transform: rotate(-45deg);
    }
  }
}

.hamburger-menu {
  position: fixed;
  top: 40px;
  right: 0;
  background-color: #fff;
  box-shadow: -8px 0 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: $space-sm $space-md;
  transform: translateX(100%);
  animation: slideIn 0.2s ease forwards;
  width: 80vw;
  height: calc(100vh - 65px);
  @include respond-to(mobile) {
    top: 55px;
  }
  .navbar {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: $space-sm;
  }
  .navbar li a {
    display: block;
    padding: $space-sm;
    text-decoration: none;
    color: $paragraph-color;
    font-size: 1.275rem;
    border-radius: 8px;
    transition: background-color 0.2s ease;
  }
  .navbar li a:hover {
    background-color: #f5f5f5;
  }
}
.login-icon {
  button {
    @include button-style {
      padding: 0 $space-md;
      margin: 0;
      display: inline-flex;
      appearance: none;
      cursor: pointer;
      background-color: #fff;
    }
  }

  .bi {
    font-size: 2.75rem;
    color: $primary-color;
    transition:
      transform 0.3s,
      color 0.3s ease;

    &:hover {
      opacity: 0.8;
      transform: scale(1.2);
    }
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* ===== 桌機（> 1024） ===== */
.nav {
  display: block;
}

.login-btn {
  display: inline-flex;
}

.logout-btn {
  display: inline-flex;
}

.hamburger {
  display: none;
}
/* ===== 1024 以下（平板 + 手機） ===== */

@include respond-to(desktop) {
  .nav {
    display: none;
  }

  .area-auth {
    display: none;
  }

  .hamburger {
    display: inline-flex;
  }
}
</style>
