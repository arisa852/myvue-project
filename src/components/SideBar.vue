<template>
  <div class="header-space"></div>
  <aside class="sidebar">
    <button v-if="showClose" class="sidebar-close-button" @click="handleClose">x</button>
    <div class="select-group">
      <h6>{{ title1 }}</h6>
      <ul class="season-list">
        <li v-for="(label,value) in seasonmap" :key="value" 
        :class="{active:filters.season === value}"
        @click="filters.season = value">{{ label }}</li>
      </ul>
      <p>目前選擇：{{ displaySeason }}</p>
    </div>
    <div class="style-group">
      <h6>{{ title2 }}</h6>
      <select v-model="filters.style">
        <option disabled-value="">請選擇</option>
        <option value="formal">正式</option>
        <option value="fresh">清新</option>
        <option value="casual">休閒</option>
        <option value="street">街頭</option>
        <option value="daily">日常</option>
        <option value="business">商務</option>
        <option value="beach">海灘</option>
        <option value="cute">可愛</option>
        <option value="active">活動</option>
        <option value="sport">運動</option>
      </select>
      <p>目前選擇：{{ displayStyle }}</p>
    </div>
    <div class="search-space">
	<label><input v-model.trim="filters.keyword" type='search' value="正式" placeholder="請輸入關鍵字"></input></label>
	<p>目前搜尋：{{filters.keyword}}</p>
  </div>
  </aside>
</template>
<script>
import {reactive, computed,watch } from 'vue'

export default {
  name: 'SideBar',
  props: {
    title1: {
      type: String,
      default: '季節篩選',
    },
    title2: {
      type: String,
      default: '風格篩選',
    },
    showClose:{
      type:Boolean,
      default:false,
    },
  },
  setup(props,{emit}) {
    console.log(props.title1)

    const filters = reactive({
      season: 'all',
      style: 'all',
      keyword: '',
    })

    const seasonmap = {
      all: '全部',
      summer: '夏季',
      winter: '冬季',
      mild: '中性季節',
    }
    const displaySeason = computed(() => {
      const map = {
        all: '全部',
        summer: '夏季',
        winter: '冬季',
        mild: '中性季節',
      }
      return map[filters.season] || ''
    })
    const displayStyle = computed(() => {
      const map = {
        formal: '正式',
        fresh: '清新',
        casual: '休閒',
        street: '街頭',
        daily: '日常',
        cute: '可愛',
        sport: '運動',
        business: '商務',
        active: '活動',
        sweet: '甜美',
        office: '辦公',
        beach: '海灘',
      }
      return map[filters.style] || ''
    })
    watch(filters,(newVal)=>{
      emit('filters-change',newVal)
    },{deep:true})

    const handleClose = ()=>{
      emit('close')
    }
    return{filters,displaySeason,displayStyle,seasonmap,handleClose}
  },
}
</script>
<style lang="scss" scoped>
@use '../assets/style/variables' as *;
@use '../assets/style/mixin' as *;

.header-space{
  height: 100px;
}
.sidebar{
  display: flex;
  align-items: flex-start;
  width:280px; 
  padding:30px 20px; 
  box-sizing:border-box;
  flex-direction: column;
  background-color: #fff;
  position: relative;
}

.sidebar-close-button{
      background: none;
      border: none;
      font-size: 30px;
      cursor: pointer;
      line-height: 1;
      position: absolute;
      right: 20px;
      top:0;
      transition: transform 2s ease;
      
      &:hover{
        transform: scale(1.5);
      }
    
}

.select-group,.style-group{
  display:flex;
  flex-direction:column;
  gap:10px;
  padding: 20px;

  h6{
    @include subheading-style;
 }

 .season-list{
  list-style: none;
  padding: 0;
  margin:0;
  flex-wrap: wrap;
  gap: 30px;
  font-size: 1.175rem;

    li{
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;


    &.active{
      background-color: #00bfa6;
      color: #fff;
      border-color: #00bfa6;
    }
    }
 }

  select{
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 1rem;
      cursor: pointer;
      transition: border-color 0.2s ease;
      color:$text-color;
   }
    &:focus {
        outline: none;
        border-color: #00bfa6;
    }
    p{
      @include paragraph-style;
    }
}

.search-space{
  input{
    border-radius: 30px;
    padding: 8px;
    margin-bottom: 20px;
    font-size: 1rem;
  }
}
</style>
