<template>
  <div class="style-layout">
    <SideBar class="sidebar-fixed" @filters-change="handleFiltersChange"></SideBar>

    <main class="main-content">
      <BannerSection title="探索最新穿搭靈感" content="一鍵探索，穿搭沒煩惱" :bannerImg="Artboard">
        <template #cta>
          <button @click="handleStart" class="start-button">立即抽</button>
        </template>
      </BannerSection>
      <section class="today-outfit">
        <TodayOutfit v-if="outfit && hero" :outfit="outfit" :hero="hero" @reroll="reroll">
        </TodayOutfit>
      </section>
      <section class="inspiration-carousel">
        <InspirationCarousel
          :inspirations="inspirations"
          :loading="loading"
          :error="error"
        ></InspirationCarousel>
      </section>
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
import InspirationCarousel from '@/components/InspirationCarousel.vue'
import { useGetinspiration } from '@/use/useGetinspiration'

const { outfit, fetchAll, reroll, setFilters, all, hero } = useOutfitRandomizer()
const { loading, error, inspirations, fetchInspiration } = useGetinspiration()

function handleFiltersChange(newFilters) {
  setFilters(newFilters)
  if (all.value.length > 0) {
    reroll()
  }
}

function handleStart() {
  reroll()
}

onMounted(async () => {
  console.log('[stylepage]onMounted執行了')
  await fetchAll()
  fetchInspiration()
  reroll()
  console.log('[stylepage]呼叫完fetchAll', '呼叫完fetchInspiration')
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

.banner-section {
  border-radius: 0px 0px 15px 15px;
}

.today-outfit {
  background-color: #fff;
  padding: 10px 0;
  margin-top: 16px;
  border-radius: 15px 15px 0px 0px;
}
.inspiration-carousel {
  background-color: #ffffff;
  padding: 10px 0 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
  border-radius: 0px 0px 15px 15px;
}
</style>
