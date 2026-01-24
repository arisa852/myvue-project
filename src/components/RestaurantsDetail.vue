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
      default: null,
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

  @include respond-to(pad) {
    transform: translateY(40px);
  }
  @include respond-to(mobile) {
    transform: translateY(40px);
  }
}

.overlay {
  @include overlay-base;
  justify-content: flex-end;
  align-items: flex-start;
  padding: $space-xl;

  @include respond-to(pad) {
    justify-content: center;
    align-items: center;
  }
  @include respond-to(mobile) {
    justify-content: center;
    align-items: center;
  }
}

.drawer {
  width: min(420px, 100%);
  height: auto;
  max-height: calc(100vh - 48px);
  background: $white-color;
  box-shadow: $shadow-md;
  padding: $space-lg;
  border-radius: $radius-md;
  overflow-x: auto;
}

.swiper {
  width: 100%;
  max-width: 400px;
  height: auto;
  padding: $space-md 0;
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: $radius-sm;
}

.restaurant-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: $white-color;
  padding: $space-lg;
  gap: $space-sm;

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
        color: $opentime-color;
      }
    }
    .today-hours {
      color: $paragraph-color;
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
