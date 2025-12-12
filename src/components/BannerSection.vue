<template>
  <section class="banner">
    <div class="container">
      <slot>
        <div class="bn-text">
          <h1>{{ title }}</h1>
          <p>
            {{ content }}
          </p>
          <slot name="cta"></slot>
        </div>
        <div class="bn-img" v-if="bannerImg">
          <img :src="bannerImg" alt="Banner" />
        </div>
      </slot>
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
    console.log(props.title)
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
    padding: $space-lg;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1200px;
    width: 100%;
   

    @include respond-to(pad) {
      flex-direction: column;
      padding: $space-lg;
      max-width: 100%;
    }
    @include respond-to(mobile) {
      flex-direction: column;
      padding: $space-lg;
      max-width: 100%;
    }
  }

  .bn-text {
    width: 50%;
    display: inline-block;

    @include respond-to(pad) {
      width: 100%;
    }

    @include respond-to(mobile) {
      width: 100%;
    }

    & h1 {
      @include heading-style;
      color: $title-color;
    }

    & p {
      @include minheading-style;
      font-weight: 400;
      color: $paragraph-color;
    }
  }

  .bn-img {
    width: 50%;

    @include respond-to(pad) {
      width: 100%;
    }

    @include respond-to(mobile) {
      width: 100%;
    }

    & img {
      width: 100%;
      max-width: 500px;
      object-fit: contain;
      height: auto;
      display: block;
    }
  }
}
</style>
