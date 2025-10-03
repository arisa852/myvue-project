<template>
  <header class="header">
    <div class="wrapper">
      <div class="logo-container">
        <img :src="logoUrl" alt="logo" />
      </div>
      <div class="list-container">
        <nav class="nav">
          <ul class="menus">
            <li v-for="item in menus" :key="item.to">
              <RouterLink :to="item.to">{{ item.label }}</RouterLink>
            </li>
          </ul>
        </nav>
        <button @click="login" ref="login" class="login-btn">登入</button>
      </div>
    </div>
  </header>
</template>
<script>
import { ref } from 'vue'
import logoUrl from '../assets/images/logo3.png'

export default {
  name: 'header',
  setup() {
    const menus = ref([
      { label: '找美食', to: '/food' },
      { label: '穿搭靈感', to: '/style' },
      { label: '收藏', to: '/collect' },
    ])
    function login() {
      console.log('login clicked')
    }
    return { menus, logoUrl, login }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.header {
  background-color: #fff;
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
  padding: 20px;
  justify-content: space-between;
  margin: 0 auto;

  /* 先用 media query 代替 mixin，之後再換回 @include */
  @media (max-width: 1024px) {
    padding: 20px 10px;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: 768px) {
    padding: 20px 10px;
    justify-content: space-between;
    align-items: center;
  }
}

.logo-container {
  width: 200px;
  margin-right: 20px;
  justify-items: start;

  @media (max-width: 1024px) {
    width: 100px;
  }
  @media (max-width: 768px) {
    width: 120px;
    margin: 0 auto;
  }

  img {
    width: 100%;
    object-fit: cover;
    display: block;
  }
}

.list-container {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

.nav {
  @media (max-width: 1024px) {
    display: none;
  }
  @media (max-width: 768px) {
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
    font-size: 1.25rem;
    font-weight: 400;
  }
  a:hover {
    text-decoration: underline;
  }
}

.login-btn {
  background-color: #f9f9f9;
  font-size: 1.25rem;
  border: 2px solid $primary-color;
  cursor: pointer;
  color: $primary-color;
  font-weight: bold;
  border-radius: 30px;
  padding: 10px 24px;
  align-items: center;
  justify-content: end;
}
</style>
