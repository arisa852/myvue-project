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
        <button @click="openLogin" class="login-btn" v-if="!isMobile">登入</button>
      </div>
      <!-- 手機板選單 -->
      <div
        class="hamburger"
        @click="toggleMenu"
        :class="{ open: isOpen }"
        v-show="isMobile"
        aria-controls="mobile-nav"
        :aria-expanded="isOpen ? 'true' : 'false'"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="hamburger-menu" v-if="isOpen && isMobile">
        <ul class="navbar">
          <li v-for="menu in menus" :key="menu.to">
            <RouterLink :to="menu.to" @click="closeMenu">{{ menu.label }}</RouterLink>
          </li>
          <li class="login-icon">
            <button @click="openLogin" aria-label="登入">
              <i class="bi bi-person-circle"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import logoUrl from '../assets/images/logo3.png'

export default {
  name: 'Header',
  emit: ['open-login'],
  setup(props, { emit }) {
    const menus = ref([
      { label: '找美食', to: '/food' },
      { label: '穿搭靈感', to: '/style' },
      { label: '收藏', to: '/collect' },
    ])

    const isOpen = ref(false)
    const isMobile = ref(false)
    let mql = null

    const toggleMenu = () => {
      isOpen.value = !isOpen.value
    }

    const closeMenu = () => {
      isOpen.value = false
    }
    const updateMobile = () => {
      isMobile.value = mql.matches
      if (!isMobile.value) {
        isOpen.value = false
      }
    }

    onMounted(() => {
      mql = window.matchMedia('(max-width:1023px)')
      updateMobile()
      if (mql.addEventListener) {
        mql.addEventListener('change', updateMobile)
      } else if (mql.addListener) {
        mql.addListener(updateMobile)
      }
    })

    onBeforeUnmount(() => {
      if (!mql) return
      if (mql.removeEventListener) {
        mql.removeEventListener('change', updateMobile)
      } else if (mql.removeListener) {
        mql.removeListener(updateMobile)
      }
    })
    const openLogin = () => emit('open-login')
    return { menus, logoUrl, openLogin, isOpen, isMobile, toggleMenu, closeMenu }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.header {
  background-color: #f9f9f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.wrapper {
  display: flex;
  align-items: center;
  max-width: 1080px;
  padding: 8px;
  justify-content: space-between;
  margin: 0 auto;

  @include respond-to(pad) {
    padding: 20px 10px;
    justify-content: space-between;
    align-items: center;
  }
  @include respond-to(mobile) {
    padding: 20px 10px;
    justify-content: space-between;
    align-items: center;
  }
}

.logo-container {
  width: 100px;
  margin-right: 20px;
  justify-items: start;

  @include respond-to(pad) {
    width: 100px;
  }
  @include respond-to(mobile) {
    width: 120px;
    margin: 0 auto;
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
  gap: 16px;
  margin-left: auto;
}

.nav {
  @include respond-to(pad) {
    display: none;
  }
  @include respond-to(mobile) {
    display: none;
  }
}

.menus {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 30px;

  a {
    text-decoration: none;
    color: inherit;
    font-size: 1rem;
    font-weight: 400;
  }
  a:hover {
    text-decoration: underline;
  }
}

.login-btn {
  background-color: #f9f9f9;
  font-size: 1rem;
  border: 2px solid $primary-color;
  cursor: pointer;
  color: $primary-color;
  font-weight: bold;
  border-radius: 30px;
  padding: 8px 16px;
  align-items: center;
  justify-content: end;
}

.hamburger {
  position: relative;
  width: 36px;
  height: 28px;
  cursor: pointer;
  border: 0;
  background-color: transparent;
  display: inline-flex;
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
  top: 65px;
  right: 0;
  background-color: #fff;
  box-shadow: -8px 0 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 16px 12px;
  transform: translateX(100%);
  animation: slideIn 0.2s ease forwards;
  width: 80vw;
  height: calc(100vh - 65px);
  .navbar {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 12px;
  }
  .navbar li a {
    display: block;
    padding: 12px 10px;
    text-decoration: none;
    color: #333;
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
      padding: 0 15px;
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
</style>
