import { ref, reactive, computed } from 'vue'
import { getRestaurantlist } from '@/services/Service'

function toMinutes(timeStr) {
  if (typeof timeStr !== 'string') {
    console.warn('收到的timeStr:', timeStr)
    return NaN
  }
  const [hStr, mStr] = timeStr.trim().split(':')
  const h = Number(hStr)
  const m = Number(mStr)
  return h * 60 + m
}

function isOpennow(startMin, endMin, nowMin) {
  if (![startMin, endMin, nowMin].every(Number.isFinite)) return false
  if (endMin >= startMin) {
    return nowMin >= startMin && nowMin <= endMin
  } else {
    return nowMin >= startMin || nowMin <= endMin
  }
}

export function getOpentime(item) {
  const weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

  const todaytime = new Date().getDay()
  const todayKey = weekday[todaytime]

  const hours = item?.openingHours?.[todayKey]

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

  return {
    openNow: isOpennow(startMin, endMin, nowMin),
    todayHours: hours,
  }
}

export function useGetRestaurantList() {
  const loading = ref(false)
  const error = ref(null)
  const restaurantlists = ref([])

  const enhancedRestaurants = computed(() => {
    return restaurantlists.value.map((item) => {
      const { openNow, todayHours } = getOpentime(item)
      console.log('getOpentime in composable:', typeof getOpentime)
      return {
        ...item,
        openNow,
        todayHours,
      }
    })
  })

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
    sortState.rateMode = 'none'

    if (sortState.priceMode === 'none') {
      sortState.priceMode = 'asc'
    } else if (sortState.priceMode === 'asc') {
      sortState.priceMode = 'desc'
    } else {
      sortState.priceMode = 'none'
    }
  }

  function toggleRatesort() {
    sortState.priceMode = 'none'

    if (sortState.rateMode === 'none') {
      sortState.rateMode = 'asc'
    } else if (sortState.rateMode === 'asc') {
      sortState.rateMode = 'desc'
    } else {
      sortState.rateMode = 'none'
    }
  }

  const sortRestaurants = computed(() => {
    let list = [...enhancedRestaurants.value]
    if (sortState.priceMode === 'asc') {
      list.sort((a, b) => priceOrder[a.priceRange] - priceOrder[b.priceRange])
    } else if (sortState.priceMode === 'desc') {
      list.sort((a, b) => priceOrder[b.priceRange] - priceOrder[a.priceRange])
    }

    if (sortState.rateMode === 'asc') {
      list.sort((a, b) => a.rating - b.rating)
    } else if (sortState.rateMode === 'desc') {
      list.sort((a, b) => b.rating - a.rating)
    }
    return list
  })

  const selects = reactive({
    category: '',
    priceRange: '',
    locationTag: '',
  })

  const filteredRestaurants = computed(() =>
    sortRestaurants.value
      .filter((i) => !selects.category || i.category === selects.category)
      .filter((i) => !selects.priceRange || i.priceRange === selects.priceRange)
      .filter((i) => !selects.locationTag || i.locationTag === selects.locationTag),
  )

  const currentPage = ref(1)
  const pageSize = ref(3)
  const totalPages = computed(() => {
    if (!filteredRestaurants.value.length) {
      return 1
    }
    return Math.ceil(filteredRestaurants.value.length / pageSize.value)
  })

  const paginationItem = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return filteredRestaurants.value.slice(start, end)
  })

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  function prePage() {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  function changePage(pageNumber) {
    let page = pageNumber

    if (page < 1) {
      page = 1
    } else if (page > totalPages.value) {
      page = totalPages.value
    }
    currentPage.value = page
  }

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
    enhancedRestaurants,
    filteredRestaurants,
    togglePricesort,
    toggleRatesort,
    sortRestaurants,
    currentPage,
    totalPages,
    paginationItem,
    nextPage,
    prePage,
    changePage,
    fetchRestaurantlist,
    sortState,
  }
}
