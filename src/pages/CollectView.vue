<template>
  <div class="collect-page">
    <section class="collect-banner">
      <div class="collect-inner">
        <BannerSection
          title="收藏，是為了讓選擇更簡單"
          content="把喜歡的餐廳與靈感先收下來，當你猶豫要吃什麼、去哪裡時，它們就在這裡等你。"
        >
          <template #cta>
            <button class="collect-button">查看我的收藏</button>
          </template>
          <template #right>
            <div class="collect-right-wrap">
              <div class="collect-right-card">
                <div class="user-info" v-if="user">
                  <h3>
                    <span> <i class="bi bi-person-circle"></i></span>{{ DisplayName }}
                  </h3>
                  <p>{{ collectText }}</p>
                </div>
              </div>
            </div>
          </template>
        </BannerSection>
      </div>
    </section>
    <section class="collect-favorite">
      <div class="collect-inner">
        <div class="collect-panel">
          <FavoriteSection :items="favorites" />
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import BannerSection from '@/components/BannerSection.vue'
import FavoriteSection from '@/components/FavoriteSection.vue'
import { useAuth } from '@/use/useAuth'
import { computed, onMounted, watchEffect } from 'vue'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useGetRestaurantList } from '@/use/useGetRestaurantList'
import { useOutfitRandomizer } from '@/use/useOutfitRandomizer'

const { user } = useAuth()
const { restaurantlists, fetchRestaurantlist } = useGetRestaurantList()
const { all, fetchAll } = useOutfitRandomizer()

const favStore = useFavoriteStore()

const DisplayName = computed(() => user.value?.email ?? '')

const collectText = computed(() => {
  const count = favStore.totalCount
  if (count === 0) return '尚未收藏'
  return `已收藏 ${count} 個選擇`
})

const favorites = computed(() => {
  const reIds = favStore.restaurantIds.map(String)
  const ouIds = favStore.outfitIds.map(String)
  const restaurants = (restaurantlists.value ?? []).filter((r) => reIds.includes(String(r.id)))

  const outfits = (all.value ?? []).filter((o) => ouIds.includes(String(o.id)))

  return {
    restaurants,
    outfits,
  }
})

onMounted(async () => {
  favStore.load()
  await Promise.all([fetchRestaurantlist(), fetchAll()])
})

watchEffect(() => {
  console.log('store.restaurantIds =', favStore.restaurantIds)
  console.log('store.outfitIds =', favStore.outfitIds)
  console.log('restaurantLists =', restaurantlists.value)
  console.log('favoriteRestaurants =', favorites.value.restaurants)
  console.log('favoriteOutfits =', favorites.value.outfits)
})
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.collect-page {
  min-height: 100vh;
  background-color: $background-color;
}

.collect-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.collect-banner {
  width: 100%;
  background: linear-gradient(to right, $primary-color, $white-color);
  padding: $space-lg 0;

  .collect-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    gap: $space-md;
  }

  .collect-button {
    @include button-style {
      margin-top: $space-xl;
      background-color: $white-color;
      color: darken($tertiary-color, 10%);
      max-width: 150px;
    }
  }
  .collect-right-wrap {
    flex: 1;
    display: flex;
    align-items: stretch;
    padding: $space-md;

    .collect-right-card {
      flex: 1;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      gap: $space-sm;

      & h3 {
        @include minheading-style;
        display: flex;
        align-items: center;
        gap: $space-xs;
      }
      p {
        @include subheading-style;
      }
    }
  }
}
</style>
