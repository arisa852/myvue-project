<template>
  <div class="inspiration-carousel">
    <div v-if="loading" class="inspiration-carousel_loading">載入中...</div>
    <div v-else-if="error" class="inspiration-carousel_error">無法載入穿搭靈感</div>
    <swiper
      v-else
      :slides-per-view="3"
      :space-between="30"
      :free-mode="true"
      :pagination="{ clickable: true }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :modules="modules"
      :loop="true"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :breakpoints="{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }"
    >
      <swiper-slide v-for="item in inspirations" :key="item">
        <img :src="item.image" :alt="item.name" />
        <p>{{ item.name }}</p>
      </swiper-slide>

      <!----Navigation buttons-->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, FreeMode, Pagination, Navigation } from 'swiper/modules'

export default {
  name: 'InspirationCarousel',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    inspirations: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: [Object, Array],
      default: null,
    },
  },
  setup(props) {
    const modules = [Autoplay, Pagination, FreeMode, Navigation]
    return {
      modules,
      props,
    }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.inspiratiion-carousel {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

::v-deep(.swiper) {
  position: relative;
}
.swiper {
  width: 100%;
  max-width: 960px;
  height: auto;
  padding: 16px 0;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.swiper-slide img {
  display: block;
  width: 220px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.swiper-slide p {
  @include paragraph-style;
  margin-top: 10px;
}

::v-deep(.swiper-pagination) {
  margin-top: 16px;
  position: relative;
}

::v-deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background-color: #ccc;
  opacity: 1;
  transition: all 0.3s ease;
}

::v-deep(.swiper-pagination-bullet-active) {
  background-color: $primary-color;
  transform: scale(1.2);
}

::v-deep(.swiper-button-next),
::v-deep(.swiper-button-prev) {
  color: #333;
  transition: all 0.3s ease;
  width: 30px;
  height: 30px;
  top: 40%;
  transform: translateY(-50%);
  background-color: #fff;
  border-radius: 50%;
  padding: 8px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);

  @include respond-to(mobile) {
    top: 50%;
  }
}
::v-deep(.swiper-button-next:hover),
::v-deep(.swiper-button-prev:hover) {
  color: $primary-color;
}
</style>
