<template>
  <article class="favorite-food">
    <div class="left-col">
      <div class="food-text">
        <h6>{{ foodItem.name }}</h6>
        <p class="food-text_rate">{{ foodItem.rating }}</p>
        <p :class="foodItem.openNow ? 'open' : 'close'">
          {{ foodItem.openNow ? '營業中' : '休息' }}
        </p>
        <p>{{ displaylocationTag }}</p>
        <p>{{ foodItem.address }}</p>
        <p>{{ foodItem.description }}</p>
      </div>
      <div class="btn-group">
        <button type="button" class="favorite-btn" @click="cancelFavorites" aria-label="取消收藏">
          取消收藏
        </button>
      </div>
    </div>
    <div class="right-col">
      <img :src="foodItem.coverImage" :alt="foodItem.name" />
    </div>
  </article>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  foodItem: {
    type: Object,
    required: true,
  },
})

console.log(props.foodItem)

const emit = defineEmits(['unfavorite'])

const locationMap = {
  'taipei-main': '台北車站',
  yongkang: '永康街',
  'taipei-east': '台北東區',
  'xinyi-shopping': '信義商圈',
}

const cancelFavorites = () => {
  emit('unfavorite', props.foodItem.id)
}

const displaylocationTag = computed(
  () => locationMap[props.foodItem.locationTag] ?? props.foodItem.locationTag,
)
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.favorite-food {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $white-color;
  box-shadow: $shadow-md;
  padding: $space-lg;
  border-radius: $radius-md;
  width: 100%;
  box-sizing: border-box;
}

.left-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $space-sm;
}

.food-text {
  display: flex;
  flex-direction: column;

  h6 {
    @include minheading-style;
    color: $primary-color;
    font-weight: 700;
  }
  p {
    @include paragraph-style;
    font-weight: 400;
    margin-bottom: $space-xs;
  }
  .food-text_rate {
    @include subheading-style;
    color: $opentime-color;
  }
  .open {
    color: darken($primary-color, 10%);
    font-size: 1.275rem;
    font-weight: 500;
  }
  .close {
    color: $opentime-color;
    font-size: 1.275rem;
    font-weight: 500;
  }
}

.right-col {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 100%;
    max-width: 400px;
    border-radius: 16px;
    object-fit: cover;
  }
}

.btn-group {
  display: flex;
  align-items: flex-start;
  gap: $space-sm;

  .favorite-btn {
    @include button-style;
    color: #fff;
  }
}
</style>
