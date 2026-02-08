<template>
  <article class="favorite-wear">
    <div class="fav-wear">
      <button type="button" @click="handleCancel" class="fav-wear_btn">
        <i class="bi bi-heartbreak-fill"></i>
      </button>
      <div class="fav-wear_image">
        <img :src="wearItem?.image" :alt="wearItem?.name || '未命名單品'" />
      </div>
      <div class="fav-wear_title">
        <h4>
          {{ wearItem.name || '未命名單品'
          }}<span class="fav-wear-meta"><!-- 之後放收藏時間 --></span>
        </h4>
        <div class="fav-wear_tags">
          <span v-for="t in displayTags" :key="t" class="fav-wear_tag">{{ t }}</span>
        </div>
      </div>
    </div>
  </article>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  wearItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['unfavorite'])

const handleCancel = () => {
  emit('unfavorite', props.wearItem.id)
}

const tagMaps = {
  formal: '正式',
  casual: '休閒',
  street: '街頭',
  sport: '運動',
  fresh: '清新',
  clean: '清爽',
  cute: '可愛',
  sweet: '甜美',
  elegant: '優雅',
  sexy: '性感',
  energetic: '活力',

  office: '通勤/上班',
  interview: '面試',
  party: '派對',
  date: '約會',
  home: '居家',
  vacation: '度假',
  beach: '海邊',

  shirt: '襯衫',
  tshirt: 'T恤',
  'tank-top': '背心',
  jacket: '外套',
  pants: '長褲',
  shorts: '短褲',
  skirt: '裙子',
  dress: '洋裝',
  swimsuit: '泳裝',
  bikini: '比基尼',
  suit: '西裝',
  tie: '領帶',

  'long-sleeve': '長袖',
  'short-sleeve': '短袖',
  sleeveless: '無袖',
  'one-piece': '連身',
  cutout: '鏤空',
  string: '繫帶',
  versatile: '百搭',
  warm: '保暖',
  light: '輕盈',
  daily: '日常',

  stripe: '條紋',
  diagonal: '斜紋',
  smile: '笑臉',
  ribbon: '蝴蝶結',

  spring: '春',
  summer: '夏',
  autumn: '秋',
  winter: '冬',

  black: '黑色',
  white: '白色',
  gray: '灰色',
  blue: '藍色',
  lightblue: '淺藍',
  navy: '深藍',
  red: '紅色',
  pink: '粉色',
  orange: '橘色',
  yellow: '黃色',
  green: '綠色',
  purple: '紫色',
  teal: '藍綠色',
}

const displayTags = computed(() => props.wearItem.tags.map((t) => tagMaps[t] ?? t))
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.favorite-wear {
  padding: 0;
  box-sizing: border-box;
}

.fav-wear {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $white-color;
  box-shadow: $shadow-lg;
  width: calc(220px - 20px);
  padding: $space-xl;
  border-radius: $radius-md;

  &_btn {
    align-self: flex-end;
    @include button-style {
      padding: 0;
      background-color: $white-color;
    }

    .bi {
      font-size: 1.25rem;
      color: $primary-color;
    }
  }

  &_image {
    width: 100%;
    overflow: hidden;
    border-radius: $radius-md;

    & img {
      width: 100%;
      max-width: 400px;
      object-fit: cover;
    }
  }

  &_title {
    @include paragraph-style;
    display: flex;
    flex-direction: column;

    & h4 {
      @include subheading-style;
      margin-bottom: $space-sm;
    }

    & .fav-wear_tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    & .fav-wear_tag {
      display: inline-block;
      padding: $space-xs $space-sm;
      border-radius: $radius-sm;
      background: $tag-color;
      color: $white-color;
      font-size: 0.9rem;
    }
  }
}
</style>
