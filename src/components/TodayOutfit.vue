<template>
  <section class="today-outfit" v-if="top || bottom">
    <h2>今日穿搭<span>系統隨機抽</span></h2>
    <div class="outfit-row">
      <OutfitCard :item="top" v-if="top"></OutfitCard>
      <OutfitCard :item="bottom" v-if="bottom"></OutfitCard>
      <OutfitCard :item="hero" :is-hero="true" v-if="hero"></OutfitCard>
    </div>
    <button @click="reRoll" class="reroll-button">再抽一次</button>
  </section>
</template>
<script>
import { computed } from 'vue'
import OutfitCard from './OutfitCard.vue'

export default {
  name: 'tradeOutfit',
  components: { OutfitCard },
  props: {
    outfit: {
      type: Object,
      default: null,
    },
    hero: {
      type: Object,
      default: null,
    },
  },
  emits: ['reroll'],

  setup(props, { emit }) {
    const top = computed(() => props.outfit?.top || null)
    const bottom = computed(() => props.outfit?.bottom || null)
    const reRoll = () => emit('reroll')

    console.log('[TodayOutfit]收到的outfit:', props.outfit)
    console.log('[TodayOutfit]收到的hero:', props.hero)
    return { top, bottom, reRoll }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.today-outfit {
  padding: 30px 20px;
  max-width: 960px;

  h2 {
    @include minheading-style;
    text-align: left;
    margin-left: 20px;

    @include respond-to(pad) {
      text-align: center;
      margin-left: 20px;
    }
    @include respond-to(mobile) {
      text-align: center;
      margin-left: 20px;
    }
  }
  & span {
    @include paragraph-style;
    margin-left: 30px;
  }
}

.outfit-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin-top: 24px;
  justify-items: center;
  gap: 10px;

  @include respond-to(pad) {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }
  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }
}

.reroll-button {
  @include button-style {
    color: #fff;
    display: block;
    margin: 24px auto 24px;
  }
  @include respond-to(pad) {
    align-items: center;
  }
  @include respond-to(mobile) {
    align-items: center;
    padding: 20px 16px;
  }
}
</style>
