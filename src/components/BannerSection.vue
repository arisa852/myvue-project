<template>
  <section class="banner">
    <div class="container">
      <!------左邊內容------>
      <div class="bn-left">
        <slot name="left">
          <h1>{{ title }}</h1>
          <p>{{ content }}</p>
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
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include respond-to(pad) {
      width: 100%;
    }

    @include respond-to(mobile) {
      width: 100%;
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
    width: 40%;
    display: flex;
    align-items: stretch;
    flex-direction: column;

    & > * {
      flex: 1;
      min-height: 0;
    }

    @include respond-to(pad) {
      width: 100%;
    }

    @include respond-to(mobile) {
      width: 100%;
    }

    & img {
      width: 100%;
      object-fit: cover;
      height: 100%;
      display: block;
    }
  }
}
</style>
