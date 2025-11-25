<template>
  <div class="food-layout">
    <div class="sidebar-fixed">
      <SidebarFood @select-change="handleSelectChange"></SidebarFood>
    </div>
    <main class="main-container">
      <div v-if="loading">載入中</div>
      <div v-else-if="error">發生錯誤:{{ error.message }}</div>
      <BannerSection
        title="每天都在想吃什麼？我們懂"
        content="用分類＋篩選快速縮小範圍，輕鬆決定下一餐"
        :bannerImg="Bnfood"
      >
      </BannerSection>
      <TodayFood
        v-if="top3.length > 0"
        :items="top3"
        @sortPrice="sortPrice"
        @sortRate="sortRate"
      ></TodayFood>
    </main>
  </div>
</template>
<script setup>
import BannerSection from '@/components/BannerSection.vue'
import SidebarFood from '@/components/SidebarFood.vue'
import Bnfood from '@/assets/images/noodles.png'
import TodayFood from '@/components/TodayFood.vue'
import { useGetRestaurantList } from '@/use/useGetRestaurantList'
import { computed, onMounted, watch } from 'vue'

const {
  loading,
  error,
  selects,
  todayItems,
  sortPrice,
  sortRate,
  fetchRestaurantlist,
  getOpentime,
} = useGetRestaurantList()

function handleSelectChange(newVal) {
  console.log('sidebar的值', newVal)
  Object.assign(selects, newVal)
}

const top3 = computed(() =>
  todayItems.value.slice(0, 2).map((item) => ({
    ...item,
    openNow: getOpentime(item),
  })),
)

watch(todayItems, (v) => {
  console.log(
    'todayItems',
    v.map((x) => x.name),
  )
})

onMounted(async () => {
  console.log('foodview開始執行')
  await fetchRestaurantlist()
})
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
