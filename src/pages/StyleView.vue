<template>
  <div class="style-layout">
    <SideBar class="sidebar-fixed"></SideBar>

    <main class="main-content">
      <BannerSection title="探索最新穿搭靈感" content="一鍵探索，穿搭沒煩惱" :bannerImg="Artboard">
        <template #cta>
          <button @click="Start" class="start-button">立即抽</button>
        </template>
      </BannerSection>
      <TodayOutfit v-if="outfit" :outfit="outfit" @reroll="reroll"></TodayOutfit>
    </main>
  </div>
</template>
<script setup>
import BannerSection from '@/components/BannerSection.vue'
import SideBar from '@/components/SideBar.vue'
import Artboard from '@/assets/images/instration.png'
import { onMounted } from 'vue'
import TodayOutfit from '@/components/TodayOutfit.vue'
import { useOutfitRandomizer } from '@/use/useOutfitRandomizer'

const { outfit, fetchAll, reroll } = useOutfitRandomizer()

onMounted(async () => {
  await fetchAll
  reroll()
})
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

:global(html, body) {
  background-color: #f8f8f8;
}

.style-layout {
  display: flex;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  max-width: 1200px;
}

.sidebar-fixed {
  width: 240px;
  flex-shrink: 0;
  padding: 16px;
  position: sticky;
  top: 150px;
  box-sizing: border-box;
  min-height: calc(100vh - 100px);
}

.main-content {
  flex: 1;
  padding: 15px;
  box-sizing: border-box;
  min-width: 0;
  display: block;
  border-radius: 30px;
}

.start-button {
  @include button-style {
    border: 1px solid $primary-color;
    background-color: #fff;

    &:hover {
      background-color: $primary-color;
      color: #fff;
      opacity: 1;
      box-shadow: 0 4px 8px #a5a5a5;
    }
  }
}
</style>
