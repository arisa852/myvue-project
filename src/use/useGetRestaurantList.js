import { ref, reactive, computed } from 'vue'
import { getRestaurantlist } from '@/services/outfitService'

function toMinutes(timeStr) {
  const arr = timeStr.split(':')
  console.log('timeStr:', timeStr, typeof timeStr)
  if (typeof timeStr !== 'string') {
    console.warn('收到的timeStr:', timeStr)
    return NaN
  }
  const h = Number(arr[0])
  const m = Number(arr[1])
  return h * 60 + m
}

function isOpennow(startMin, endMin, nowMin) {
  const isAfterstart = nowMin >= startMin
  const isBeforeend = nowMin <= endMin

  if (isAfterstart && isBeforeend) {
    return true
  } else {
    return false
  }
}

export function getOpentime(item) {
  const weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

  const todaytime = new Date().getDay()
  const todayKey = weekday[todaytime]

  const hours = item.openingHours[todayKey]
  console.log('店家:', item.name, 'todayKey:', todayKey, 'hours:', hours)

  if (!hours || typeof hours !== 'string') {
    console.warn('hours不存在或非字串', item.name, hours)
    return false
  }

  if (hours === '休息') {
    return false
  }

  const [start, end] = hours.split('-')

  console.log([start, end])

  const startMin = toMinutes(start)
  const endMin = toMinutes(end)
  const now = new Date()
  const nowMin = now.getHours() * 60 + now.getMinutes()
  console.log('nowMin', typeof nowMin, nowMin)

  return isOpennow(startMin, endMin, nowMin)
}

export function useGetRestaurantList() {
  const loading = ref(false)
  const error = ref(null)
  const restaurantlists = ref([])

  const selects = reactive({
    category: '',
    priceRange: '',
    locationTag: '',
  })

  const todayItems = computed(() =>
    restaurantlists.value
      .filter((i) => !selects.category || i.category === selects.category)
      .filter((i) => !selects.priceRange || i.priceRange === selects.priceRange)
      .filter((i) => !selects.locationTag || i.locationTag === selects.locationTag),
  )

  const priceOrder = {
    low: 1,
    medium: 2,
    high: 3,
  }

  const sortState = reactive({
    priceMode: 'none',
    rateMode: 'none',
  })

  function togglePricesort() {
    if (sortState.priceMode === 'none') {
      sortState.priceMode = 'asc'
    } else if (sortState.priceMode === 'asc') {
      sortState.priceMode = 'desc'
    } else {
      sortState.priceMode = 'none'
    }
  }

  function toggleRatesort(){
     if (sortState.rateMode === 'none') {
      sortState.rateMode = 'asc'
    } else if (sortState.rateMode === 'asc') {
      sortState.rateMode = 'desc'
    } else {
      sortState.rateMode = 'none'
    }
  }

  function sortPrice(mode){
    if(mode === 'asc'){
      restaurantlists.value.sort((a,b)=> priceOrder[a.priceRange] - priceOrder[b.priceRange])
    }else if(mode === 'desc'){
      restaurantlists.value.sort((a,b) =>priceOrder[b.priceRange] - priceOrder[a.priceRange])
    }
  }

  function sortRate(mode){
    if(mode === 'asc'){
      restaurantlists.value.sort((a,b) =>a.rating - b.rating)
    }else if(mode ==='desc'){
      restaurantlists.value.sort((a,b)=> b.rating - a.rating)
    }
  }


  

  // const sortPrice = () => {
  //   restaurantlists.value.sort((a, b) => {
  //     return priceOrder[a.priceRange] - priceOrder[b.priceRange]
  //   })
  // }

  // const sortRate = () => {
  //   restaurantlists.value.sort((a, b) => b.rating - a.rating)
  // }

  const fetchRestaurantlist = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await getRestaurantlist()
      restaurantlists.value = res.data || res
      console.log('res.data:', res.data)
    } catch (err) {
      console.error('fail to fetch restaurantlist:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }
  return {
    loading,
    error,
    selects,
    todayItems,
    sortState,
    togglePricesort,
    toggleRatesort,
    sortPrice,
    sortRate,
    fetchRestaurantlist,
    getOpentime
  }
}
