<template>
  <section class="today-outfit" v-if="top || bottom">
    <h2>今日穿搭<span>系統隨機抽</span></h2>
    <div class="outfit-row">
      <div class="outfit-container">
        <OutfitCard :item="top" v-if="top"></OutfitCard>
        <OutfitCard :item="bottom" v-if="bottom"></OutfitCard>
      </div>

      <div class="outfit-show" v-if="hero">
        <img :src="hero.image" alt="hero.name||'今日穿搭預覽'" />
        <p>{{ hero.name }}</p>
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
    const hero = computed(() => props.hero || null)
    const reRoll = () => emit('reroll')

    console.log('[TodayOutfit]收到的outfit:', props.outfit)
    console.log('[TodayOutfit]收到的hero:', props.hero)
    return { top, bottom, hero, reRoll }
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
  justify-content: center;
  padding: 30px 20px;
  max-width: 960px;
  margin: 0 auto;

  h2 {
    @include minheading-style;
    text-align: left;
    margin-left: 20px;
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
  }
}

.outfit-row {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 24px; // 卡片區與 hero 的距離
  margin-top: 24px;
  padding: 20px;
}

.outfit-container {
  display: flex;
  gap: 20px;
}

.outfit-show {
  background-color: #fff;
  box-shadow: 0 8px 20px rgba(0, 191, 166, 0.25);
  border: 1px solid #b3ede4;
  padding: 24px 16px;
  border-radius: 16px;
  width: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & img {
    width: 140px;
    margin-bottom: 12px;
    display: block;
    object-fit: contain;
  }
  & p {
    text-align: center;
    @include paragraph-style;
  }
}
</style>
