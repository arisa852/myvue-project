<template>
  <div class="style-layout">
    <!-- <------桌機版sidebar左側固定------>
    <SideBar v-if="!isFiltersMobile" class="sidebar-fixed" @filters-change="handleFiltersChange" />
    <!-- <------手機版彈窗sidebar------>
    <div
      v-if="isFiltersMobile && isFiltersOpen"
      class="sidebar-mobile-overlay"
      @click.self="toggleFilters"
    >
      <div class="sidebar-mobile-modal">
        <div class="sidebar-modal">
          <SideBar
            :showClose="true"
            class="sidebar-modal"
            @filters-change="handleFiltersChange"
            @close="toggleFilters"
          >
          </SideBar>
        </div>
      </div>
    </div>
    <main class="main-content">
      <BannerSection title="探索最新穿搭靈感" content="一鍵探索，穿搭沒煩惱" :bannerImg="Artboard">
        <template #cta>
          <button @click="handleStart" class="start-button">立即抽</button>
          <button v-if="isFiltersMobile" class="filter-button-mobile" @click="toggleFilters">
            {{ isFiltersOpen ? '關閉篩選' : '篩選條件' }}
          </button>
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import TodayOutfit from '@/components/TodayOutfit.vue'
import { useOutfitRandomizer } from '@/use/useOutfitRandomizer'
import InspirationCarousel from '@/components/InspirationCarousel.vue'
import { useGetinspiration } from '@/use/useGetinspiration'

const { outfit, fetchAll, reroll, setFilters, all, hero } = useOutfitRandomizer()
const { loading, error, inspirations, fetchInspiration } = useGetinspiration()

const isFiltersMobile = ref(false)
const isFiltersOpen = ref(false)
let mql = null

const toggleFilters = () => {
  isFiltersOpen.value = !isFiltersOpen.value
}

const updateMobile = () => {
  if (!mql) {
    return
  }
  isFiltersMobile.value = mql.matches
  if (!isFiltersMobile.value) {
    isFiltersOpen.value = false
  }
}

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

  //設定rwb
  mql = window.matchMedia('(max-width:1023px)')
  updateMobile()
  console.log(mql.value)
  if (mql.addEventListener) {
    mql.addEventListener('change', updateMobile)
  } else if (mql.addListener) {
    mql.addListener(updateMobile)
  }

  //取得資料
  await fetchAll()
  fetchInspiration()
  reroll()
  console.log('[stylepage]呼叫完fetchAll', '呼叫完fetchInspiration')
})

onBeforeUnmount(() => {
  if (!mql) return
  if (mql.removeEventListener) {
    mql.removeEventListener('change', updateMobile)
  } else if (mql.removeListener) {
    mql.removeListener(updateMobile)
  }
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
  align-items: stretch;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  max-width: 1200px;
}

/*桌機版sidebar用*/
.sidebar-fixed {
  width: 240px;
  flex-shrink: 0;
  padding: 16px;
  position: sticky;
  top: 150px;
  box-sizing: border-box;
  min-height: calc(100vh - 120px);
}

/*手機版sidebar用*/
.sidebar-mobile {
  &-overlay {
    display: flex;
    background: rgba(0, 0, 0, 0.4);
    inset: 0;
    z-index: 1000;
    align-items: center;
    justify-content: center;
    position: fixed;
  }
  &-modal {
    padding: 10px;
    width: 100%;
    max-width: 400px;
  }
}

.sidebar-modal {
  background-color: #fff;
  width: auto;
  margin: 20px;
  max-width: 340px;
  max-height: 80vh;
  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
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

.filter-button-mobile {
  @include button-style {
    color: #fff;
    margin-left: 20px;
  }
}

.today-outfit {
  background-color: #fff;
  padding: 10px 0;
  margin-top: 16px;
  border-radius: 15px 15px 0px 0px;
  overflow: hidden;
  
}
.inspiration-carousel {
  background-color: #ffffff;
  padding: 10px 0 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
  border-radius: 0px 0px 15px 15px;
}
</style>
