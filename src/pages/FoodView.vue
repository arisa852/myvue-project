<template>
  <div class="food-page">
    <div class="food-layout">
      <!------桌機版sidebar左側固定------>
      <SidebarFood v-if="!isMobile" class="sidebar-fixed" @select-change="handleSelectChange">
      </SidebarFood>
      <!------手機版sidebar左側固定------>
      <div v-if="isMobile && isOpen" class="sidebar-mobile-overlay" @click.self="toggleSelect">
        <div class="sidebar-mobile-modal">
          <div class="sidebar-modal">
            <SidebarFood
              :isClose="true"
              class="sidebar-modal"
              @select-change="handleSelectChange"
              @closeSidebar="toggleSelect"
            >
            </SidebarFood>
          </div>
        </div>
      </div>
      <main class="main-container">
        <div v-if="loading">載入中</div>
        <div v-else-if="error">發生錯誤:{{ error.message }}</div>
        <div class="food-banner">
          <BannerSection
            title="每天都在想吃什麼？我們懂"
            content="用分類＋篩選快速縮小範圍，輕鬆決定下一餐"
            :bannerImg="Bnfood"
          >
            <template #cta>
              <button v-if="isMobile" class="select-button-mobile" @click="toggleSelect">
                {{ isOpen ? '關閉篩選' : '篩選條件' }}
              </button>
            </template>
          </BannerSection>
        </div>
        <TodayFood
          v-if="top3.length > 0"
          :items="top3"
          :sort-state="sortState"
          @toggle-Price="handleClickPrice"
          @toggle-Rate="handleClickRate"
          @open-drawer="onOpenDrawer"
          @need-login="onOpenLoginModal"
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
  </div>
</template>
<script setup>
import BannerSection from '@/components/BannerSection.vue'
import SidebarFood from '@/components/SidebarFood.vue'
import Bnfood from '@/assets/images/noodles.png'
import TodayFood from '@/components/TodayFood.vue'
import RestaurantsDetail from '@/components/RestaurantsDetail.vue'
import { useGetRestaurantList } from '@/use/useGetRestaurantList'
import { computed, onMounted, watch, ref, onBeforeUnmount } from 'vue'
import { useUiStore } from '@/stores/useUiStore'

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

const ui = useUiStore()

const isMobile = ref(false)
const isOpen = ref(false)
let mql = null

const toggleSelect = () => {
  isOpen.value = !isOpen.value
}

const updateMobile = () => {
  if (!mql) {
    return
  }
  isMobile.value = mql.matches
  if (!isMobile.value) {
    isOpen.value = false
  }
}

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

function onOpenLoginModal() {
  console.log('need-login received')
  ui.openLoginModal()
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

watch(
  isOpen,
  (newVal) => {
    const body = document.body

    if (!body) return
    if (newVal) {
      body.classList.add('modal-open')
    } else {
      body.classList.remove('modal-open')
    }
  },
  { immediate: false },
)

onMounted(async () => {
  console.log('foodview開始執行')
  mql = window.matchMedia('(max-width:1023px)')
  updateMobile()
  if (mql.addEventListener) {
    mql.addEventListener('change', updateMobile)
  } else if (mql.addListener) {
    mql.addListener(updateMobile)
  }

  await fetchRestaurantlist()
})

onBeforeUnmount(() => {
  if (!mql) return
  if (mql.removeEventListener) {
    mql.removeEventListener('change', updateMobile)
  } else if (mql.removeListener) {
    mql.removeListener(updateMobile)
  }
  document.body.classList.remove('modal-open')
})
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.food-page {
  background-color: $background-color;
  min-height: 100vh;
}

.food-layout {
  display: flex;
  align-items: stretch;
  margin: 0 auto;
  max-width: 1200px;
  gap: $space-lg;
}

/*桌機版sidebar用*/
.sidebar-fixed {
  width: 240px;
  flex-shrink: 0;
  padding: $space-md;
  position: sticky;
  top: 20px;
  margin-right: $space-lg;
}

.sidebar-mobile {
  &-overlay {
    @include overlay-base;
  }
  &-modal {
    width: 100%;
    max-width: 400px;
  }
}

.sidebar-modal {
  background-color: $white-color;
  width: auto;
  max-width: 300px;
  border-radius: $radius-lg;
  padding: $space-md;
  max-height: 80vh;
  overflow-y: auto;
}

.main-container {
  flex: 1;
  min-width: 0;
  box-sizing: border-box;
  margin: $space-sm 0;
}

.food-banner {
  background: linear-gradient(to bottom, $primary-color, $white-color);
  padding: $space-sm $space-md;
}

.select-button-mobile {
  @include button-style {
    background-color: $white-color;
    border: 2px solid darken($primary-color, 10%);
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-top: $space-lg;
  gap: $space-sm;

  .page-info {
    @include paragraph-style;
    height: 40px;
    line-height: 1.2;
    color: $paragraph-color;
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
