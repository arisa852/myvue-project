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
        :sort-state="sortState"
        @toggle-Price="handleClickPrice"
        @toggle-Rate="handleClickRate"
        @open-drawer="onOpenDrawer"
      ></TodayFood>
      <RestaurantsDetail
        :show="showDetail"
        :restaurantlist="activeRestaurant"
        @close="oncloseDetail"
      >
      </RestaurantsDetail>
      <div class="pagination">
        <button @click="prePage" :disabled="currentPage === 1" class="arrow-btn">
          <i class="bi bi-chevron-compact-left"></i>
        </button>
        <span class="page-info">第{{ currentPage }}頁 / 第{{ totalPages }}頁</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="arrow-btn">
          <i class="bi bi-chevron-compact-right"></i>
        </button>
      </div>
    </main>
  </div>
</template>
<script setup>
import BannerSection from '@/components/BannerSection.vue'
import SidebarFood from '@/components/SidebarFood.vue'
import Bnfood from '@/assets/images/noodles.png'
import TodayFood from '@/components/TodayFood.vue'
import RestaurantsDetail from '@/components/RestaurantsDetail.vue'
import { useGetRestaurantList } from '@/use/useGetRestaurantList'
import { computed, onMounted, watch, ref } from 'vue'

const {
  loading,
  error,
  selects,
  sortState,
  togglePricesort,
  toggleRatesort,
  currentPage,
  totalPages,
  paginationItem,
  nextPage,
  prePage,
  fetchRestaurantlist,
} = useGetRestaurantList()

function handleSelectChange(newVal) {
  console.log('sidebar的值', newVal)
  Object.assign(selects, newVal)
}

function handleClickPrice() {
  togglePricesort()
}

function handleClickRate() {
  toggleRatesort()
}

const showDetail = ref(false)

const activeRestaurant = ref(null)

function onOpenDrawer(item) {
  activeRestaurant.value = item
  showDetail.value = true
}

function oncloseDetail() {
  showDetail.value = false
}

const top3 = computed(() => paginationItem.value.slice(0, 3))

watch(paginationItem, (v) => {
  console.log(
    '目前頁顯示的餐廳',
    v.map((x) => x.name),
  )
})

watch(top3, (v) => {
  console.log(
    '父層top3更新:',
    v.map((i) => i.name),
  )
})

onMounted(async () => {
  console.log('foodview開始執行')
  await fetchRestaurantlist()
})
</script>
<style lang="scss">
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

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
  padding: 20px;
  display: inline-block;
  margin: 10px 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-top: 20px;
  gap: 10px;

  .page-info {
    @include paragraph-style;
    height: 40px;
    line-height: 1.2;
    color: #333;
  }

  .arrow-btn {
    @include button-style {
      display: inline-flex;
      justify-content: center;
      align-items: baseline;
      background-color: transparent;
      color: $primary-color;
      width: 40px;
      height: 40px;
      cursor: pointer;
      padding: 0;
    }
    .bi {
      font-size: 1.25rem;
      color: $primary-color;
      line-height: 1;
    }
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
}
</style>
