<template>
  <div class="food-layout">
    <div class="sidebar-fixed">
      <SidebarFood></SidebarFood>
    </div>
    <main class="main-container">
      <BannerSection
        title="每天都在想吃什麼？我們懂"
        content="用分類＋篩選快速縮小範圍，輕鬆決定下一餐"
        :bannerImg="Bnfood"
      >
      </BannerSection>
    </main>
  </div>
</template>
<script setup>
import BannerSection from '@/components/BannerSection.vue'
import SidebarFood from '@/components/SidebarFood.vue'
import Bnfood from '@/assets/images/noodles.png'
</script>
<style lang="scss">
:global(html, body) {
  background-color: #f8f8f8;
}

.food-layout {
  display: flex;
  align-items: stretch;
  margin: 0 auto;
  min-height: 100vh;
  max-width: 1200px;
}

/*桌機版sidebar用*/
.sidebar-fixed {
  width: 240px;
  flex-shrink: 0;
  padding: 16px;
  position: sticky;
  top: 150px;
}

.main-container {
  flex: 1;
  box-sizing: border-box;
  min-width: 0;
  padding: 0 20px;
  display: block;
  margin: 10px 0;
}
</style>
