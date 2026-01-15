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
        :show-actions="true"
        :is-favorite="favorite.isFavorite(food.id)"
        @open-drawer="onOpenDrawer"
        @need-login="handleNeedLogin"
        @is-Favorite="handleToggleFavorite"
      />
    </div>
  </section>
</template>
<script>
import { onMounted } from 'vue'
import RestaurantsCard from './RestaurantsCard.vue'
import { useFavoriteStore } from '@/stores/useFavoriteStore'
import { useAuth } from '@/use/useAuth'

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
  emits: ['toggle-Price', 'toggle-Rate', 'open-drawer', 'need-login'],

  setup(props, { emit }) {
    const onClickprice = () => emit('toggle-Price')
    const onClickrate = () => emit('toggle-Rate')
    const favorite = useFavoriteStore()
    const auth = useAuth()

    function onOpenDrawer(item) {
      emit('open-drawer', item)
    }

    function handleToggleFavorite(id) {
      if (!auth.user?.value) {
        emit('need-login')
        return
      }
      favorite.toggle(id)
    }

    const handleNeedLogin = () => emit('need-login')

    onMounted(() => favorite.load())

    return {
      onClickprice,
      onClickrate,
      onOpenDrawer,
      handleToggleFavorite,
      handleNeedLogin,
      favorite,
      auth,
    }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.today-food {
  width: 100%;
  margin: 0;
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;

  .sort-bar {
    display: flex;
    align-items: flex-start;
    gap: $space-sm;
    margin: $space-md 0;

    @include respond-to(pad) {
      margin-left: $space-lg;
    }
    @include respond-to(mobile) {
      margin-left: $space-lg;
    }

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
    gap: $space-md;
    justify-content: center;

    @include respond-to(pad) {
      padding: 0 $space-lg;
    }
    @include respond-to(mobile) {
      padding: 0 $space-lg;
    }
  }
}
</style>
