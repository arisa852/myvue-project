<template>
  <section>
    <div class="main-tabs">
      <ul>
        <li
          v-for="tab in mainTabs"
          :key="tab.value"
          :class="{ active: mainTabs.value === tab.value }"
          @click="mainTabs.value = tab.value"
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
          @click="currentSubTabs.value = tab.value"
        >
          {{ tab.label }}
        </li>
      </ul>
    </div>
    <div class="container">
      <RestaurantsCard
        v-for="item in favoriteRestaurants"
        :key="item.id"
        :item="item"
        :show-actions="false"
        :is-favorite="true">
      </RestaurantsCard>
    </div>
  </section>
</template>
<script setup>
import { computed, ref } from 'vue'
import RestaurantsCard from './RestaurantsCard.vue'




const mainTabs = ref([
  { label: '穿的收藏', value: 'wear' },
  { label: '吃的收藏', value: 'food' },
])

const wearSubTabs = ref([
  { label: '上衣', value: 'top' },
  { label: '下衣', value: 'bottom' },
])

const foodSubTabs = ref([
  { label: '中式', value: 'chinese' },
  { label: '咖啡', value: 'cafe' },
  { label: '日式', value: 'japanese' },
  { label: '輕食', value: 'lightmeal' },
])

const currentSubTabs = computed(() => {
  return mainTabs.value === 'wear' ? wearSubTabs  : foodSubTabs
})

const currentSubValue = computed({
  get() {
    return mainTabs.value === 'wear' ? wearSubTabs  : foodSubTabs
  },
  set(v) {
    if (mainTabs.value === 'wear') {
      wearSubTabs.value = v
    } else {
      foodSubTabs.value = v
    }
  },
})
</script>
<style lang="scss" scoped></style>
