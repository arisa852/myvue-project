<template>
  <section>
    <div class="main-tabs">
      <ul>
        <li
          v-for="tab in mainTabs"
          :key="tab.value"
          :class="{ active: activeMainTabs.value === tab.value }"
          @click="activeMainTabs.value = tab.value"
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
    <div class="container">
      <RestaurantsCard
        v-for="item in favoriteItems"
        :key="item.id"
        :item="item"
        :show-actions="false"
        :is-favorite="true"
      >
      </RestaurantsCard>
    </div>
  </section>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import RestaurantsCard from './RestaurantsCard.vue'
import { useFavoriteStore } from '@/stores/useFavoriteStore'

const fav = useFavoriteStore()

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

onMounted(() => fav.load())

const favoriteItems = computed(() => {
  console.log('before filter:', props.items)
  return props.items.filter((item) => fav.favoriteIds.includes(String(item.id)))
})

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
<style lang="scss" scoped></style>
