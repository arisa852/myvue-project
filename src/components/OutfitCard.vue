<template>
  <article class="outfit-card" :class="{ 'outfit-card--hero': isHero }">
    <img
      :src="item.image"
      :alt="item.name || '服裝圖片'"
      v-if="item && item.image"
      class="outfit-card_image"
    />
    <p class="outfit-card_name">{{ item && item.name ? item.name : '未命名單品' }}</p>
  </article>
</template>
<script>
export default {
  name: 'outfit-card',
  props: {
    item: {
      type: Object,
      required: true,
    },
    isHero: {
      type: Boolean,
      default: null,
    },
  },
  setup(props) {
    console.log(props)
    return { props }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.outfit-card {
  background-color: #fff;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  padding: 24px;
  border-radius: 16px;
  width: calc(220px - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  &_image {
    width: 100%;
    object-fit: cover;
    margin: 0 auto 16px;
    display: block;
  }

  &_name {
    @include paragraph-style;
    margin: 0;
  }
  &--hero {
    box-shadow: 0 8px 20px rgba(0, 191, 166, 0.25);
    border: 1px solid #b3ede4;
    padding: 24px 16px;
  }
}
</style>
