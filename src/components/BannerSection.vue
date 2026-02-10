<template>
  <section class="banner">
    <div class="container">
      <!------左邊內容------>
      <div class="bn-left">
        <slot name="left">
          <h1>{{ title }}</h1>
          <p>{{ content }}</p>
          <slot name="left-extra"></slot>
          <slot name="cta"></slot>
        </slot>
      </div>
      <!------右邊內容------>
      <div class="bn-right">
        <slot name="right">
          <div class="bn-img" v-if="bannerImg">
            <img :src="bannerImg" alt="Banner" />
          </div>
        </slot>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'BannerSection',
  props: {
    title: {
      type: String,
      default: '幫你決定生活大小事！',
    },
    content: {
      type: String,
      default: '幫你解決選擇障礙，吃與穿不再成為煩惱。',
    },
    bannerImg: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return { ...props }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.banner {
  overflow: hidden;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    gap: $space-lg;
    padding: 0 $space-lg;

    @include respond-to(pad) {
      flex-direction: column;
      max-width: 100%;
    }
    @include respond-to(mobile) {
      flex-direction: column;
      max-width: 100%;
    }
  }

  .bn-left,
  .bn-right {
    min-width: 0;
  }

  .bn-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 0;

    @include respond-to(pad) {
      width: 100%;
      justify-content: stretch;
      padding: $space-sm;
    }

    @include respond-to(mobile) {
      width: 100%;
      justify-content: stretch;
      padding: $space-sm;
    }

    & h1 {
      @include heading-style;
      color: $title-color;
      overflow-wrap: anywhere;
      margin-bottom: $space-md;
    }

    & p {
      @include minheading-style;
      font-weight: 400;
      color: $paragraph-color;
      overflow-wrap: anywhere;
      margin-bottom: $space-md;
    }
  }

  .bn-right {
    flex: 0 1 560px;
    max-width: 600px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    min-width: 0;

    @include respond-to(pad) {
      flex: 1 1 100%;
      max-width: 100%;
      justify-content: center;
    }

    @include respond-to(mobile) {
      flex: 1 1 100%;
      max-width: 100%;
      justify-content: center;
    }

    & img {
      width: 100%;
      object-fit: contain;
      height: auto;
    }
  }
}
</style>
