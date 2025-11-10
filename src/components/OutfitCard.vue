<template>
  <div class="outfit-card">
    <img :src="item.image" :alt="item.name" v-if="item" />
    <p>{{ item.name }}</p>
  </div>
</template>
<script>
export default {
  name: 'outfit-card',
  props: {
    item: {
      type: Object,
      required: true,
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 15px;
  width: 216px;
  text-align: center;

  img {
    width: 100%;
    max-width: 120px;
    overflow: hidden;
    object-fit: cover;
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  p {
    @include paragraph-style;
  }
}
</style>
