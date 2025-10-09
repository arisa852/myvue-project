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
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.entrance {
  padding: 40px 0;
  background: linear-gradient(to top, $primary-color, #fff);
  overflow: hidden;
}

.entrance-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 1000px;
  margin-inline: auto;
  justify-items: center; // 每個格子水平置中
  align-items: start;
  padding: 20px;

  @include respond-to(pad) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 800px;
  }
  @include respond-to(mobile) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 300px;
  }
}

.entrance-card {
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  text-align: center;
  overflow: hidden;

  & img {
    object-fit: cover;
    display: block;
    margin: 0 auto;
    margin-bottom: 30px;
    display: block;
    max-width: 450px;

    @include respond-to(pad) {
      max-width: 400px;
    }
    @include respond-to(mobile) {
      max-width: 200px;
    }
  }
  & h4 {
    @include subheading-style; 
    margin-bottom: 30px;
    color: #666;

    @include respond-to(pad){
      margin-bottom: 20px;
    }
  }
  .entrance-button {
    @include button-style {
      border: 2px solid #fff;
      background-color:$primary-color;
      margin-bottom: 30px;
      color: #fff;
    }
  }
}
</style>
