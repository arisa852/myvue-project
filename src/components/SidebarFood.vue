<template>
  <aside class="sidebar-food">
    <button v-if="isClose" class="close-btn" @click.self="handleClickSidebar">x</button>
    <div class="category-group">
      <h6>{{ FoodTitle }}</h6>
      <label class="radio-wrapper">
        <input type="radio" value="chinese" v-model="select.category" />
        <span class="custom-radio"></span>
        <span class="radio-text">中式</span>
      </label>
      <label class="radio-wrapper">
        <input type="radio" value="japanese" v-model="select.category" />
        <span class="custom-radio"></span>
        <span class="radio-text">日式</span>
      </label>
      <label class="radio-wrapper">
        <input type="radio" value="cafe" v-model="select.category" />
        <span class="custom-radio"></span>
        <span class="radio-text">咖啡館</span>
      </label>
      <label class="radio-wrapper">
        <input type="radio" value="lightmeal" v-model="select.category" />
        <span class="custom-radio"></span>
        <span class="radio-text">輕食</span>
      </label>
      <p>目前選擇:{{ DisplayCategory }}</p>
    </div>
    <div class="price-group">
      <h6>{{ priceTitle }}</h6>
      <ul class="price-list">
        <li
          v-for="option in priceRange"
          :key="option.value"
          @click="select.priceRange = option.value"
          :class="{ active: select.priceRange === option.value }"
        >
          {{ option.label }}
        </li>
      </ul>
      <p>目前選擇:{{ select.priceRange }}</p>
    </div>
    <div class="place-group">
      <h6>{{ PlaceTitle }}</h6>
      <label class="radio-wrapper">
        <input type="radio" value="taipei-main" v-model="select.locationTag" />
        <span class="custom-radio"></span>
        <span class="radio-text">台北車站</span>
      </label>
      <label class="radio-wrapper">
        <input type="radio" value="yongkang" v-model="select.locationTag" />
        <span class="custom-radio"></span>
        <span class="radio-text">永康街</span>
      </label>
      <label class="radio-wrapper">
        <input type="radio" value="taipei-east" v-model="select.locationTag" />
        <span class="custom-radio"></span>
        <span class="radio-text">台北東區</span>
      </label>
      <label class="radio-wrapper">
        <input type="radio" value="xinyi-shopping" v-model="select.locationTag" />
        <span class="custom-radio"></span>
        <span class="radio-text">信義商圈</span>
      </label>
      <p>目前選擇:{{ DisplayPlace }}</p>
    </div>
  </aside>
</template>
<script>
import { computed, reactive, watch } from 'vue'

export default {
  name: 'SidebarFood',
  props: {
    FoodTitle: {
      type: String,
      default: '餐廳',
    },
    priceTitle: {
      type: String,
      default: '價位',
    },
    PlaceTitle: {
      type: String,
      default: '地區',
    },
    isClose: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select-change', 'closeSidebar'],
  setup(props, { emit }) {
    const select = reactive({
      category: '',
      priceRange: '',
      locationTag: '',
    })

    const DisplayCategory = computed(() => {
      const map = {
        chinese: '中式',
        japanese: '日式',
        cafe: '咖啡館',
        lightmeal: '輕食',
      }
      return map[select.category] || ''
    })

    const DisplayPlace = computed(() => {
      const map = {
        'taipei-main': '台北車站',
        yongkang: '永康街',
        'taipei-east': '台北東區',
        'xinyi-shopping': '信義商圈',
      }
      return map[select.locationTag] || ''
    })

    const priceRange = [
      { label: '100-150', value: 'low' },
      { label: '200-250', value: 'medium' },
      { label: '250以上', value: 'high' },
    ]

    watch(
      select,
      (newVal) => {
        emit('select-change', { ...newVal })
      },
      { deep: true },
    )

    const handleClickSidebar = () => {
      console.log('子層點到')
      emit('closeSidebar')
    }
    return { DisplayCategory, DisplayPlace, priceRange, select, handleClickSidebar }
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.sidebar-food {
  display: flex;
  align-items: flex-start;
  padding: 0;
  box-sizing: border-box;
  flex-direction: column;
  position: relative;
}

.close-btn {
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  line-height: 1;
  position: absolute;
  right: 10%;
  top: 0px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.5);
  }
}

.category-group,
.place-group {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: $space-sm;
  width: 100%;
  background-color: $white-color;
  border-radius: $radius-md;
  box-shadow: $shadow-md;
  gap: $space-xs;
  padding: $space-lg;

  @include respond-to(pad) {
    box-shadow: none;
  }
  @include respond-to(mobile) {
    box-shadow: none;
  }

  h6 {
    @include subheading-style;
    margin-bottom: $space-md;
  }

  p {
    @include paragraph-style;
  }

  .radio-wrapper {
    cursor: pointer;
    margin-bottom: $space-sm;
    display: flex;
    align-items: center;

    input[type='radio'] {
      display: none;
    }

    .custom-radio {
      width: 16px;
      height: 16px;
      border: 2px solid $primary-color;
      position: relative;
      margin-right: $space-sm;
      border-radius: 50%;
      transition: transform 0.2s ease;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: $primary-color;
        transform: translate(-50%, -50%) scale(0);
      }
    }
    input[type='radio']:checked + .custom-radio {
      border-color: $primary-color;
    }
    input[type='radio']:checked + .custom-radio::after {
      transform: translate(-50%, -50%) scale(1);
    }
    .radio-text {
      @include paragraph-style;
    }
    &:hover .custom-radio {
      border-color: $primary-color;
    }
  }
}

.price-group {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-bottom: $space-md;
  border-radius: $radius-lg;
  width: 100%;
  box-shadow: $shadow-md;
  padding: $space-lg;

  @include respond-to(pad) {
    box-shadow: none;
  }
  @include respond-to(mobile) {
    box-shadow: none;
  }
  h6 {
    @include subheading-style;
  }

  p {
    @include paragraph-style;
    margin-top: $space-sm;
  }
  .price-list {
    list-style: none;
    padding: 0;
    flex-wrap: wrap;
    gap: $space-xs;
    font-size: 1.175rem;

    li {
      padding: $space-sm $space-md;
      border-radius: $radius-sm;
      cursor: pointer;
      transition: all 0.2s ease;
      color: $paragraph-color;

      &.active {
        background-color: $primary-color;
        color: #fff;
      }
    }
  }
}
</style>
