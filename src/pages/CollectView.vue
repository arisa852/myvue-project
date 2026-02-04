<template>
  <div class="collect-page">
    <section class="collect-banner">
      <div class="collect-inner">
        <BannerSection title="我的收藏" content="把喜歡的先收下，下一次選擇更快。">
          <template #left-extra>
            <div class="collect-left-wrap">
              <div class="user-info" v-if="user">
                <h3>
                  <span> <i class="bi bi-person-circle"></i></span>{{ DisplayName }}
                </h3>
                <p>
                  {{ collectText }} |
                  <span class="tag"
                    ><img
                      src="@/assets/icons/shopping-bag.svg"
                      class="icon"
                      alt="穿的icon"
                      aria-hidden="true"
                    />{{ wearText }}
                  </span>
                  |
                  <span class="tag"
                    ><img
                      src="@/assets/icons/cake.svg"
                      class="icon"
                      alt="吃的icon"
                      aria-hidden="true"
                    />{{ foodText }}</span
                  >
                </p>
              </div>
            </div>
          </template>
          <template #right>
            <div class="collect-right-wrap">
              <div class="collect-image">
                <img :src="collectBanner" alt="收藏的圖" />
              </div>
            </div>
          </template>
        </BannerSection>
      </div>
    </section>
    <section class="collect-favorite">
      <div class="collect-inner">
        <div class="collect-panel">
          <p v-if="!isReady">清單載入中...</p>
          <FavoriteSection
            v-else
            :food-favorites="favorites.restaurants"
            :wear-favorites="favorites.outfits"
          />
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import BannerSection from '@/components/BannerSection.vue'
import FavoriteSection from '@/components/FavoriteSection.vue'
import { useAuth } from '@/use/useAuth'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useGetRestaurantList } from '@/use/useGetRestaurantList'
import { useOutfitRandomizer } from '@/use/useOutfitRandomizer'
import collectBanner from '../assets/images/collect2.png'

const { user } = useAuth()
const { restaurantlists, fetchRestaurantlist } = useGetRestaurantList()
const { all, fetchAll } = useOutfitRandomizer()

const favStore = useFavoriteStore()

const dataReady = ref(false)

const DisplayName = computed(() => user.value?.email ?? '')

const collectText = computed(() => {
  const count = favStore.totalCount
  if (count === 0) return '尚未收藏'
  return `已收藏 ${count} 個選擇`
})

const foodText = computed(() => favStore.restaurantCount)
const wearText = computed(() => favStore.outfitCount)

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
  dataReady.value = true
  console.log('collectBanner =', collectBanner)
})

const isReady = computed(() => favStore.loaded && dataReady.value)

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
  padding: 0;

  .collect-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    gap: $space-sm;
    background-color: $white-color;
    width: 100%;
    max-width: 220px;
    border-radius: $radius-md;
    padding: $space-sm $space-md;
    border: 1px solid rgba(255, 255, 255, 0.6);
    margin-top: $space-sm;

    h3 {
      @include minheading-style;
      display: flex;
      align-items: center;
      gap: $space-xs;
      color: $second-primary-color;
    }
    p {
      @include paragraph-style;
      color: darken($primary-color, 20%);
      font-size: 1rem;
      font-weight: 500;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      gap: $space-sm;
      white-space: nowrap;
      font-size: 0.95rem;
      color: darken($primary-color, 20%);
      vertical-align: middle;

      .icon {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        display: block;
        opacity: 0.7;
      }
    }
  }

  .collect-right-wrap {
    flex: 1;
    display: flex;
    padding: 0;
    justify-content: flex-end;

    & img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}
</style>
