<template>
  <section class="banner">
    <div class="header-space"></div>
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

.header-space {
  height: 50px;
}

.banner {
  width: 100%;
  max-width: 100%;
  position: relative;
  background: linear-gradient(to bottom, $primary-color, #fff);
  overflow: hidden;

  .container {
    margin: 0 auto;
    max-width: 1080px;
    position: relative;
    z-index: 3;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    @include respond-to(pad) {
      flex-direction: column;
      padding: 20px;
      max-width: 100%;
    }
    @include respond-to(mobile) {
      flex-direction: column;
      padding: 20px;
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
      font-weight: bold;
      margin-bottom: 10px;
      line-height: 1.5;
      font-size: 2.175rem;
      color: #333;
    }

    & p {
      font-size: 1.5rem;
      line-height: 1.5;
      margin-bottom: 20px;
      color: #333;
    }
  }

  .bn-img {
    width: 50%;
    max-width: 300px;

    @include respond-to(pad) {
      width: 100%;
    }

    @include respond-to(mobile) {
      width: 100%;
    }

    & img {
      width: 100%;
      overflow: hidden;
      object-fit: contain;
      height: auto;
      display: block;
    }
  }
}
</style>
