<template>
  <section class="feature">
    <h1>幫你選、少猶豫</h1>
    <div class="wrapper">
      <div class="picko-feat">
        <img :src="pickofeatImg1" alt="resolve" />
        <h6>不再猶豫</h6>
        <p>快速給出建議，幫你選出最適合的選項。</p>
      </div>
      <div class="picko-feat">
        <img :src="pickofeatImg2" alt="pick" />
        <h6>操作簡單</h6>
        <p>滑一下、點一下，立刻得到答案。</p>
      </div>
      <div class="picko-feat">
        <img :src="pickofeatImg3" alt="answer" />
        <h6>快速有解</h6>
        <p>即選即出結果，不再浪費時間想破頭。</p>
      </div>
    </div>
  </section>
</template>
<script>
import pickofeatImg1 from '@/assets/images/no1.png'
import pickofeatImg2 from '@/assets/images/no2.png'
import pickofeatImg3 from '@/assets/images/9611342.png'

export default {
  name: 'FeatureSection',
  setup() {
    return {
      pickofeatImg1,
      pickofeatImg2,
      pickofeatImg3,
    }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.feature {
  padding: $space-lg;
  overflow: hidden;

  & h1 {
    @include minheading-style;
    font-size: 1.75rem;
    margin-bottom: $space-lg;
    color: $primary-color;
    text-align: center;
  }

  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-md;

    @include respond-to(pad) {
      grid-template-columns: repeat(1, 1fr);
      gap: $space-sm;
      max-width: 680px;
    }

    @include respond-to(pad) {
      grid-template-columns: repeat(1, 1fr);
      max-width: 300px;
    }

    .picko-feat {
      background-color: $white-color;
      box-shadow: $shadow-md;
      padding: $space-lg;
      border-radius: $radius-md;

      @include respond-to(pad) {
        padding: $space-lg $space-xl;
      }
      @include respond-to(mobile) {
        padding: $space-sm $space-md;
      }

      & h6 {
        @include subheading-style;
        text-align: center;
        margin-bottom: $space-sm;
        color: $title-color;
      }

      & p {
        @include paragraph-style;
        color: $paragraph-color;
        text-align: center;
      }
      & img {
        width: 100%;
        max-width: 120px;
        overflow: hidden;
        object-fit: cover;
        display: block;
        margin: 0 auto;
        margin-bottom: $space-xl;

        @include respond-to(pad) {
          width: 200px;
        }
        @include respond-to(mobile) {
          width: 150px;
        }
      }
    }
  }
}
</style>
