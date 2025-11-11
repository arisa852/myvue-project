<template>
  <section class="today-outfit" v-if="top || bottom">
    <h2>今日穿搭<span>系統隨機抽</span></h2>
    <div class="outfit-row">
      <div class="outfit-container">
        <OutfitCard :item="top" v-if="top"></OutfitCard>
        <OutfitCard :item="bottom" v-if="bottom"></OutfitCard>
        <OutfitCard :item="hero" :is-hero="true" v-if="hero"></OutfitCard>
      </div>
    </div>
    <button @click="reRoll">再抽一次</button>
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 20px;
  max-width: 960px;
  margin: 0 auto;

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
  & button {
    margin: 24px auto 0px;
    @include button-style {
      color: #fff;
    }
    @include respond-to(pad) {
      align-items: center;
      text-align: center;
    }
    @include respond-to(mobile) {
      align-items: center;
      text-align: center;
      padding: 20px 16px;
    }
  }
}

.outfit-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  padding: 10px 0;
  width: 100%;

  @include respond-to(pad) {
    flex-direction: column;
    align-items: center;
  }
  @include respond-to(mobile) {
    flex-direction: column;
    align-items: center;
  }
}

.outfit-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex: 0 0 auto;

  @include respond-to(pad) {
    flex-direction: column;
  }
  @include respond-to(mobile) {
    flex-direction: column;
  }
}

/* .outfit-show {
  background-color: #fff;
  box-shadow: 0 8px 20px rgba(0, 191, 166, 0.25);
  border: 1px solid #b3ede4;
  padding: 24px 16px;
  border-radius: 16px;
  width: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;

  & img {
    width: 100%;
    margin-bottom: 12px;
    display: block;
    object-fit: contain;
  }
  & p {
    text-align: center;
    @include paragraph-style;
  }
  @include respond-to(pad) {
    width: 100%;
    max-width: 250px;
    margin: 0 40px;
  }

  @include respond-to(mobile) {
    width: 100%;
    max-width: 250px;
    margin: 0 40px;
  }
} */
</style>
