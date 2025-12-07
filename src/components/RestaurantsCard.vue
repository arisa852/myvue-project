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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 16px;
  width: 100%;

  .left-col {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
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
    overflow: hidden;

    & img {
      max-width: 300px;
      border-radius: 16px;
      object-fit: cover;
      display: block;
    }
  }
  .btn-group {
    display: flex;
    align-items: flex-start;
    gap: 10px;

    .navigate-btn {
      @include button-style;
      color: #fff;
    }
    .detail-btn {
      @include button-style;
      color: #fff;
    }
  }
}
</style>
