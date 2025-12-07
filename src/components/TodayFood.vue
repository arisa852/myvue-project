<template>
  <section class="today-food">
    <div class="sort-bar">
      <button class="price-btn" @click="onClickprice">
        價格排序
        <span v-if="sortState.priceMode === 'asc'">↑</span>
        <span v-else-if="sortState.priceMode === 'desc'">↓</span>
        <span v-else>-</span>
      </button>
      <button class="rate-btn" @click="onClickrate">
        評分排序
        <span v-if="sortState.rateMode === 'asc'">↑</span>
        <span v-else-if="sortState.rateMode === 'desc'">↓</span>
        <span v-else>-</span>
      </button>
    </div>
    <div class="food-col">
      <RestaurantsCard
        v-for="food in items"
        :key="food.id"
        :item="food"
        @open-drawer="onOpenDrawer"
      />
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
      required: true,
    },
    sortState: {
      type: Object,
      required: true,
    },
  },
  emits: ['toggle-Price', 'toggle-Rate','open-drawer'],

  setup(props, { emit }) {
    const onClickprice = () => emit('toggle-Price')
    const onClickrate = () => emit('toggle-Rate')
   

    function onOpenDrawer(item) {
      emit('open-drawer', item)
    }

    return { onClickprice, onClickrate, onOpenDrawer }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.today-food {
  max-width: 860px;
  margin: 0 20px;

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
