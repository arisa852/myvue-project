<template>
  <section class="entrance">
    <div class="entrance-wrapper">
      <div class="food-space entrance-card">
        <img :src="foodEntrance" :alt="foodAlt" />
        <h4>吃</h4>
        <button @click="$emit('goto-food')" class="entrance-button">找餐廳推薦</button>
      </div>
      <div class="wear-space entrance-card">
        <img :src="wearEntrance" :alt="wearAlt" />
        <h4>穿</h4>
        <button @click="$emit('goto-wear')" class="entrance-button">找穿搭建議</button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'EntranceSection',
  emits: ['goto-food', 'goto-wear'],
  props: {
    foodEntrance: {
      type: String,
      required: true,
    },
    wearEntrance: {
      type: String,
      required: true,
    },
    foodAlt: {
      type: String,
      default: '吃的入口圖',
    },
    wearAlt: {
      type: String,
      default: '穿的入口圖',
    },
  },
  setup(props, { emit }) {
    const gotoFood = () => emit('goto-food')
    const gotoWear = () => emit('goto-wear')
    return { ...props, gotoFood, gotoWear }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.entrance {
  padding: 0;
  margin: $space-4xl $space-lg;
  box-sizing: border-box;
}

.entrance-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $space-md;
  justify-items: center;

  @include respond-to(pad) {
    grid-template-columns: repeat(1, 1fr);
  }
  @include respond-to(mobile) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.entrance-card {
  background-color: $white-color;
  box-shadow: $shadow-sm;
  border-radius: $radius-md;
  text-align: center;
  overflow: hidden;

  & img {
    object-fit: cover;
    display: block;
    margin-bottom: $space-lg;
    display: block;
    width: 100%;
    height: auto;
  }
  & h4 {
    @include subheading-style;
    margin-bottom: $space-xl;
    color: $paragraph-color;

    @include respond-to(pad) {
      margin-bottom: $space-lg;
    }
  }
  .entrance-button {
    @include button-style {
      border: 2px solid $white-color;
      background-color: $primary-color;
      margin-bottom: $space-lg;
    }
  }
}
</style>
