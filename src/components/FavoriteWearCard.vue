<template>
  <article class="favorite-wear">
    <div class="fav-wear">
      <button type="button" @click="handleCancel" class="fav-wear_btn">
        <i class="bi bi-heart-fill"></i>
      </button>
      <div class="fav-wear_image">
        <img :src="wearItem?.image" :alt="wearItem?.name || '未命名單品'" />
      </div>
      <div class="fav-wear_title">
        <h4>
          {{ wearItem.name || '未命名單品'
          }}<span class="fav-wear-meta"><!-- 之後放收藏時間 --></span>
        </h4>
        <div class="fav-wear_tags">
          <span v-for="t in wearItem.tags" :key="t" class="fav-wear_tag">{{ t }}</span>
        </div>
      </div>
    </div>
  </article>
</template>
<script setup>
const props = defineProps({
  wearItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['unfavorite'])

const handleCancel = () => {
  emit('unfavorite', props.wearItem.id)
}


</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.favorite-wear {
  padding: 0;
  box-sizing: border-box;
}

.fav-wear {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $white-color;
  box-shadow: $shadow-lg;
  width: calc(220px - 20px);
  padding: $space-xl;
  border-radius: $radius-md;

  &_btn {
    align-self: flex-end;
    @include button-style {
      padding: 0;
      background-color: $white-color;
    }

    .bi {
      font-size: 1.25rem;
      color: $primary-color;
    }
  }

  &_image {
    width: 100%;
    overflow: hidden;
    border-radius: $radius-md;

    & img {
      width: 100%;
      max-width: 400px;
      object-fit: cover;
    }
  }

  &_title {
    @include paragraph-style;
    display: flex;
    flex-direction: column;

    & h4 {
      @include subheading-style;
      margin-bottom: $space-sm;
    }

    & .fav-wear_tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    & .fav-wear_tag {
      display: inline-block;
      padding: $space-xs $space-sm;
      border-radius: $radius-sm;
      background: $tag-color;
      color: $white-color;
      font-size: 0.9rem;
    }
  }
}
</style>
