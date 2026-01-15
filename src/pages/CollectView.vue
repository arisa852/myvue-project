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
      <div class="colllect-inner">
        <FavoriteSection :items="allitems"></FavoriteSection>
      </div>
    </section>
  </div>
</template>
<script setup>
import BannerSection from '@/components/BannerSection.vue'
import FavoriteSection from '@/components/FavoriteSection.vue'
import { useAuth } from '@/use/useAuth'
import { computed } from 'vue'
import { useFavoriteStore } from '@/stores/useFavoriteStore'

const { user } = useAuth()
const favStore = useFavoriteStore()

const DisplayName = computed(() => user.value?.email ?? '')

const collectText = computed(() => {
  const count = favStore.totalCount
  if (count === 0) return '尚未收藏'
  return `已收藏 ${count} 個選擇`
})

const allitems = computed(() => favStore.favoriteIds ?? [])
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.collect-page {
  background-color: $background-color;
  min-height: 100vh;
}

.collect-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.collect-banner {
  width: 100%;
  background-color: $primary-color;

  .collect-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .collect-button {
    @include button-style {
      margin-top: $space-xl;
      background-color: $white-color;
      color: darken($tertiary-color, 10%);
    }
  }
  .collect-right-wrap {
    flex: 1;
    display: flex;
    align-items: stretch;
    padding: $space-md;
    background: $white-color;

    .collect-right-card {
      flex: 1;
      padding: 0;
      display: flex;
      align-items: center;
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
