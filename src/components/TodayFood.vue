<template>
  <section class="today-food">
    <div class="sort-bar">
      <button class="price-btn" @click="sortPrice">價格排序</button>
      <button class="rate-btn" @click="sortRate">評分排序</button>
    </div>
    <div class="food-col">
      <RestaurantsCard v-for="food in items" :key="food.id" :item="food" />
    </div>
  </section>
</template>
<script>
import RestaurantsCard from './RestaurantsCard.vue'

export default {
  name: 'TodayFood',
  components: { RestaurantsCard },
  props: {
    items: {
      type: Array,
    },
  },
  emits: ['sortPrice', 'sortRate'],

  setup(props, { emit }) {
    console.log('收到的Filtersfood', props.items)
    const sortPrice = () => emit('sortPrice')
    const sortRate = () => emit('sortRate')

    return { sortPrice, sortRate }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.today-food {
  padding: 10px;
  max-width: 960px;

  .sort-bar {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 20px;
    margin-top: 15px;

    .price-btn {
      @include button-style {
        color: #fff;
      }
    }
    .rate-btn {
      @include button-style {
        color: #fff;
      }
    }
  }

  .food-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }
}
</style>
