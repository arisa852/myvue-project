<template>
  <article class="restaurants-card">
    <div class="left-col">
      <div class="restaurants-text">
        <h6 class="restaurants-title">{{ item.name }}</h6>
        <p>{{ item.rating }}</p>
        <p :class="item.openNow ? 'open' : 'close'">{{ item.openNow ? '營業中' : '休息' }}</p>
        <p>{{ locationMap }}</p>
      </div>
      <div class="btn-group">
        <button type="button" class="navigate-btn">導航</button>
        <button type="button" class="detail-btn" @click="handleOpenDrawer">查看詳情</button>
      </div>
    </div>
    <div class="restaurants-img">
      <img :src="item.coverImage" :alt="item.name" />
    </div>
  </article>
</template>
<script setup>
import { computed } from 'vue'

const emit = defineEmits(['open-drawer'])

function handleOpenDrawer() {
  emit('open-drawer', props.item)
}

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const locationMap = computed(() => {
  const map = {
    'taipei-main': '台北車站',
    yongkang: '永康街',
    'taipei-east': '台北東區',
    'xinyi-shopping': '信義商圈',
  }
  return map[props.item.locationTag] || props.item.locationTag
})
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.restaurants-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: $shadow-md;
  padding: $space-lg;
  border-radius: $radius-md;

  @include respond-to(pad) {
    flex-direction: column;
    width: 85%;
    align-items: stretch;
  }

  @include respond-to(mobile) {
    flex-direction: column;
    width: 85%;
    align-items: stretch;
  }
  .left-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: $space-sm;
  }

  .restaurants-text {
    display: flex;
    flex-direction: column;

    .restaurants-title {
      @include minheading-style;
      color: $primary-color;
      font-weight: 700;
    }
    p {
      @include paragraph-style;
      font-weight: 400;

      @include respond-to(pad) {
        font-size: 1.275rem;
      }
      @include respond-to(mobile) {
        font-size: 1.25rem;
      }
    }
    .open {
      color: $primary-color;
    }
    .close {
      color: #e74c3c;
    }
  }

  .restaurants-img {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
      width: 100%;
      max-width: 400px;
      border-radius: 16px;
      object-fit: cover;

      @include respond-to(pad) {
        max-width: 350px;
      }
      @include respond-to(mobile) {
        max-width: 350px;
      }
    }
  }
  .btn-group {
    display: flex;
    align-items: flex-start;
    gap: $space-sm;

    .navigate-btn {
      @include button-style;
      color: #fff;

      @include respond-to(pad) {
        margin-bottom: $space-lg;
      }
      @include respond-to(mobile) {
        margin-bottom: $space-lg;
      }
    }
    .detail-btn {
      @include button-style;
      color: #fff;
    }
  }
}
</style>
