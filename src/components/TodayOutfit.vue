<template>
  <section class="today-outfit">
    <h2>今日穿搭<span>系統隨機抽</span></h2>
    <div class="outfit-container">
      <OutfitCard :item="outfit.top"></OutfitCard>
      <OutfitCard :item="outfit.bottom"></OutfitCard>
      <OutfitCard :item="outfit.extra"></OutfitCard>
    </div>
    <div class="outfit-show" v-if="outfit">
      <img :src="outfits.previewImg" alt="今日穿搭預覽" />
    </div>
    <button @click="reRoll">再抽一次</button>
  </section>
</template>
<script>
import OutfitCard from './OutfitCard.vue'

export default {
  name: 'tradeOutfit',
  components: { OutfitCard },
  props: {
    outfit: {
      type: Object,
      required: true,
    },
  },
  emits: ['reroll'],

  setup(props, { emit }) {
    const reRoll = () => emit('reroll')
    return { reRoll }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.today-outfit {
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    @include minheading-style;
  }
  & span {
    @include paragraph-style;
  }
}

.outfit-container {
  display: flex;
  gap: 20px;
}

.outfit-show > img {
  width: 200px;
  margin-top: 20px;
}
</style>
