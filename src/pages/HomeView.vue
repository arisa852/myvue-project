<template>
  <div class="home-view">
    <section class="home-banner">
      <div class="home-inner">
        <BannerSection
          title="解決選擇障礙的首頁"
          content="吃與穿的靈感，一鍵開啟。"
          :bannerImg="heroUrl"
        >
          <template #cta>
            <button @click="goStart" class="cta-button">立即開始</button>
          </template>
        </BannerSection>
      </div>
    </section>

    <section class="home-feature">
      <div class="home-inner">
        <FeatureSection></FeatureSection>
      </div>
    </section>

    <section class="home-entrance">
      <div class="home-inner">
        <EntranceSection
          :foodEntrance="foodImg"
          :wearEntrance="wearImg"
          @goto-food="() => $router.push('/food')"
          @goto-wear="() => $router.push('/style')"
        >
        </EntranceSection>
      </div>
    </section>
    <Footer></Footer>
  </div>
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

.home-view {
  background-color: $white-color;
  min-height: 100vh;
}

/* 共用的「版心容器」：專門負責 1200px + 置中 */
.home-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.home-banner {
  width: 100%;
  background: linear-gradient(to bottom, $primary-color, $white-color);
  padding-top: $space-lg;
}

.home-feature {
  background-color: $white-color;
  padding: $space-xl $space-lg;
}

.home-entrance {
  background: linear-gradient(to bottom, $white-color, $primary-color);
  padding: $space-xl $space-lg;
}
.cta-button {
  @include button-style {
    border: 2px solid $primary-color;
    background-color: $white-color;
    color: $primary-color;

    &:hover {
      background-color: $primary-color;
      color: $white-color;
      opacity: 1;
      box-shadow: $shadow-sm;
    }
  }
}
</style>
