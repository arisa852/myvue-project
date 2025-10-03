<template>
  <BannerSection title="解決選擇障礙的首頁" content="吃與穿的靈感，一鍵開啟。" :bannerImg="heroUrl">
    <template #cta>
      <button @click="goStart" class="cta-button">立即開始</button>
    </template>
  </BannerSection>
  <FeatureSection></FeatureSection>
</template>
<script>
import BannerSection from '@/components/BannerSection.vue'
import heroUrl from '@/assets/images/Artboard 1.png'
import FeatureSection from '@/components/FeatureSection.vue'

export default {
  name: 'HomeView',
  components: { BannerSection,FeatureSection },
  data() {
    return {
      heroUrl,
    }
  },
  methods: {
    goStart() {
      console.log('已點擊')
    },
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;
.cta-button {
  @include button-style {
    border: 2px solid $primary-color;
    background-color: #fff;
  }
}
</style>
