<template>
  <section class="fav-wrapper">
    <div class="fav-panel">
      <!-- Tabs -->
      <div class="fav-panel_tabs">
        <div class="main-tabs">
          <ul>
            <li
              v-for="tab in mainTabs"
              :key="tab.value"
              :class="{ active: activeMainTabs === tab.value }"
              @click="activeMainTabs = tab.value"
            >
              {{ tab.label }}
            </li>
          </ul>
        </div>
        <div class="sub-tabs">
          <ul>
            <li
              v-for="tab in currentSubTabs"
              :key="tab.value"
              :class="{ 'is-active': currentSubValue === tab.value }"
              @click="currentSubValue = tab.value"
            >
              {{ tab.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Body -->
    <div class="collect-panel_body">
      <div class="fav-container">
        <p v-if="props.items.length === 0">清單尚未載入</p>
        <RestaurantsCard
          v-for="item in favoriteItems"
          :key="item.id"
          :item="item"
          :show-actions="false"
          :is-favorite="true"
        >
        </RestaurantsCard>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import RestaurantsCard from './RestaurantsCard.vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})

console.log('FavoriteSection props.items:', props.items)

const mainTabs = [
  { label: '穿的收藏', value: 'wear' },
  { label: '吃的收藏', value: 'food' },
]

const wearSubTabs = [
  { label: '上衣', value: 'top' },
  { label: '下衣', value: 'bottom' },
]

const foodSubTabs = [
  { label: '中式', value: 'chinese' },
  { label: '咖啡', value: 'cafe' },
  { label: '日式', value: 'japanese' },
  { label: '輕食', value: 'lightmeal' },
]

const activeMainTabs = ref('wear')
const activeWearSubTab = ref('top')
const activeFoodSubTab = ref('chinese')

const currentSubTabs = computed(() => {
  return activeMainTabs.value === 'wear' ? wearSubTabs : foodSubTabs
})

const favoriteItems = computed(() => props.items)

const currentSubValue = computed({
  get() {
    return activeMainTabs.value === 'wear' ? activeWearSubTab.value : activeFoodSubTab.value
  },
  set(v) {
    if (activeMainTabs.value === 'wear') {
      activeWearSubTab.value = v
    } else {
      activeFoodSubTab.value = v
    }
  },
})

watch(
  () => props.items,
  (newVal) => {
    console.log('props.items changed:', newVal)
  },
  { immediate: true },
)
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.fav-wrapper {
  padding: 0;
  margin: $space-lg 0;
  box-sizing: border-box;
  width: 100%;
}

.main-tabs {
  display: flex;
  justify-content: flex-start;
  gap: $space-sm;
  background-color: $white-color;
  border-radius: $radius-md;
  width: 100%;
  box-shadow: $shadow-md;

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
    gap: $space-sm;
    font-size: 1.25rem;
    display: flex;
  }
  & li {
    padding: $space-md $space-lg;
    border-radius: $radius-sm;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-bottom: 5px solid $paragraph-color;
      background-color: lighten($primary-color, 30%);
    }

    &.active {
      border-bottom: 5px solid $paragraph-color;
      color: $primary-color;
      font-weight: 700;
    }
  }
}

.sub-tabs {
  margin: $space-md 0;
  display: flex;
  justify-content: flex-start;
  gap: $space-md;

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
    gap: $space-sm;
    font-size: 1.15rem;
    display: flex;
  }
  & li {
    padding: $space-sm $space-lg;
    border-radius: $radius-sm;
    cursor: pointer;
    transition: all 0.2s;
    color: $paragraph-color;

    &:hover {
      background-color: lighten($primary-color, 30%);
      color: $text-color;
    }
    & .is-active {
      background-color: $second-primary-color;
      color: $white-color;
      border-color: $second-primary-color;
      font-weight: 700;
    }
  }
}

.fav-panel {
  overflow: hidden;
  padding: $space-sm 0;
  width: 100%;
}

.fav-container {
  display: flex;
  flex-direction: column;
  gap: $space-md;
  justify-content: center;
}

.fav-panel_tabs {
  padding: 0;
}

.fav-panel_body {
  padding: $space-lg;
}
</style>
