<template>
  <transition name="drawer">
    <div class="overlay" v-if="show && restaurantlist" @click.self="close">
      <article class="drawer">
        <Swiper :scrollbar="{ hide: true }" :modules="modules">
          <SwiperSlide v-for="img in allImages" :key="img">
            <img :src="img" :alt="restaurantlist.name" />
          </SwiperSlide>
        </Swiper>
        <div class="restaurant-info">
          <h2 class="info_title">{{ restaurantlist.name }}</h2>
          <p class="info_category">{{ restaurantlist.category }}</p>
          <p class="info_status">
            <span class="status-text" :class="restaurantlist.openNow ? 'is-open' : 'is-closed'">{{
              restaurantlist.openNow ? '營業中' : '休息'
            }}</span>
            <span class="today-hours" v-if="restaurantlist.todayHours"
              >今天:{{ restaurantlist.todayHours }}</span
            >
          </p>
          <p class="info_location">{{ restaurantlist.locationTag }}</p>
          <p class="info_address">{{ restaurantlist.address }}</p>
          <p class="info_description">{{ restaurantlist.description }}</p>
        </div>
      </article>
    </div>
  </transition>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css/scrollbar'
import { computed } from 'vue'

export default {
  name: 'RestaurantsDetail',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    restaurantlist: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const close = () => emit('close')

    const allImages = computed(() => {
      if (!props.restaurantlist) {
        return []
      }

      const cover = props.restaurantlist.coverImage
      const images = props.restaurantlist.images || []

      let result = [...images]

      if (cover) {
        result.unshift(cover)
      }
      return result
    })

    return {
      modules: [Scrollbar],
      allImages,
      close,
    }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-active .drawer,
.drawer-leave-active .drawer {
  transition: transform 0.25s ease;
}

.drawer-enter-from .drawer,
.drawer-leave-to .drawer {
  transform: translateX(40px);
}

.overlay {
  @include overlay-base;
}

.drawer {
  width: min(420px, 100%);
  height: 80vh;
  background: #fff;
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.12);
  padding: 20px;
  border-radius: 16px;
}

.swiper {
  width: 100%;
  max-width: 400px;
  height: auto;
  padding: 16px 0;
}

.swiper-slide {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.swiper-slide img {
  display: block;
  width: 220px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.restaurant-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;

  .info_title {
    @include minheading-style;
  }
  .info_category {
    @include paragraph-style;
  }
  .info_status {
    display: flex;
    align-items: center;
    gap: 8px;
    @include paragraph-style;

    .status-text {
      font-weight: 600;

      &.is-open {
        color: $primary-color;
      }
      &.is-closed {
        color: #cc3838;
      }
    }
    .today-hours {
      color: #666;
      font-size: 0.9rem;
    }
  }
  .info_location,
  .info_address,
  .info_description {
    @include paragraph-style;
  }
}
</style>
