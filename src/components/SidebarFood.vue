<template>
  <aside class="sidebar-food">
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
          @click="select.price = option.value"
          :class="{ active: select.price === option.value }"
        >
          {{ option.label }}
        </li>
      </ul>
      <p>目前選擇:{{ select.price }}</p>
    </div>
    <div class="place-group">
      <h6>{{ PlaceTitle }}</h6>
      <label class="radio-wrapper">
        <input type="radio" value="taipei-main" v-model="select.place" />
        <span class="custom-radio"></span>
        <span class="radio-text">台北車站</span>
      </label>
      <label class="radio-wrapper">
        <input type="radio" value="yongkang" v-model="select.place" />
        <span class="custom-radio"></span>
        <span class="radio-text">永康街</span>
      </label>
      <label class="radio-wrapper">
        <input type="radio" value="taipei-east" v-model="select.place" />
        <span class="custom-radio"></span>
        <span class="radio-text">台北東區</span>
      </label>
      <label class="radio-wrapper">
        <input type="radio" value="xinyi-Shopping" v-model="select.place" />
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
  },
  setup(props, { emit }) {
    const select = reactive({
      category: '',
      price: '',
      place: '',
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
        'xinyi-Shopping': '信義商圈',
      }
      return map[select.place] || ''
    })

    const priceRange = [
      { label: '100-150', value: 'low' },
      { label: '150-200', value: 'medium' },
      { label: '250以上', value: 'high' },
    ]

    watch(
      select,
      (newVal) => {
        emit('select-change', newVal)
      },
      { deep: true },
    )

    return { DisplayCategory, DisplayPlace, priceRange, select }
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

.category-group,
.place-group {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 10px;
  width: 220px;
  background-color: #fff;
  border-radius: 15px;

  h6 {
    @include subheading-style;
    margin-bottom: 20px;
  }

  p {
    @include paragraph-style;
    margin-top: 16px;
  }

  .radio-wrapper {
    cursor: pointer;
    margin-bottom: 10px;
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
      margin-right: 8px;
      border-radius: 50%;
      transition: transform 2s ease;

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
  gap: 16px;
  background-color: #fff;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  margin-bottom: 10px;
  width: 220px;

  h6 {
    @include subheading-style;
  }

  p {
    @include paragraph-style;
    margin-top: 16px;
  }
  .price-list {
    list-style: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
    gap: 30px;
    font-size: 1.175rem;

    li {
      padding: 8px 12px;
      border-radius: 8px;
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
