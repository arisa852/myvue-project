<template>
  <BannerSection title="解決選擇障礙的首頁" content="吃與穿的靈感，一鍵開啟。" :bannerImg="heroUrl">
    <template #cta>
      <button @click="goStart" class="cta-button">立即開始</button>
    </template>
  </BannerSection>
  <FeatureSection></FeatureSection>
  <EntranceSection
    :foodEntrance="foodImg"
    :wearEntrance="wearImg"
    @goto-food="() => $router.push('/food')"
    @goto-wear="() => $router.push('/style')"
  >
  </EntranceSection>
  <Footer></Footer>
</template>
<script>
import BannerSection from '@/components/BannerSection.vue'
import heroUrl from '@/assets/images/Artboard 1.png'
import FeatureSection from '@/components/FeatureSection.vue'
import EntranceSection from '@/components/EntranceSection.vue'
import foodImg from '@/assets/images/food.png'
import wearImg from '@/assets/images/wearweather.png'
import Footer from '@/components/Footer.vue'

export default {
  name: 'HomeView',
  components: { BannerSection, FeatureSection, EntranceSection, Footer },
  setup() {
    const goStart = () => {
      console.log('已點擊')
    }
    return {
      foodImg,
      wearImg,
      heroUrl,
      goStart,
    }
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

    &:hover {
      background-color: $primary-color;
      color: #fff;
      opacity: 1;
      box-shadow: 0 4px 8px #a5a5a5;
    }
  }
}
</style>
