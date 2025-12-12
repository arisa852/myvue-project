import { computed, ref, watch } from 'vue'
import { getOutfits } from '@/services/Service'

function getRandomIndex(len) {
  if (!len || len <= 0) {
    return null
  }
  return Math.floor(Math.random() * len)
}

function pick(arr) {
  if (!arr || arr.length === 0) {
    return null
  }
  const idx = getRandomIndex(arr.length)
  const item = arr[idx]
  return item
}

function pickExclude(arr, excludes = []) {
  if (!arr || arr.length === 0) {
    return null
  }
  const pool = arr.filter((i) => !excludes.includes(i.id))
  if (pool.length === 0) {
    return null
  }
  const poolArr = pick(pool)
  console.log(poolArr)
  return poolArr
}

function getRandomOutfit(arr, filters = {}) {
  if (!Array.isArray(arr) || arr.length === 0) {
    console.warn('[getRandomOutfit] 尚未載入資料陣列為空')
    return null
  }
  let list = arr
  let excludes = []

  console.log('[getRandomOutfit]arr原始長度:', arr.length)
  console.log('[getRandomOutfit]初始filters:', filters)

  if (filters.season !== 'all') {
    // list = list.filter((i) => i.season === filters.season)
    // console.log(list.length)
    if (filters.season === 'mild') {
      list = list.filter((i) => ['spring', 'autumn'].includes(i.season))
    } else {
      list = list.filter((i) => i.season === filters.season)
    }
  }

  if (filters.style && filters.style !== 'all') {
    list = list.filter((i) => i.style.includes(filters.style))
    console.log(list.length)
  }

  if (filters.keyword && filters.keyword !== '') {
    const kw = filters.keyword.trim().toLowerCase()
    list = list.filter((i) => {
      const heading = i.name?.toLowerCase() || ''
      const category = i.category?.toLowerCase() || ''
      const tags = Array.isArray(i.tags) ? i.tags.map((t) => t.toLowerCase()) : []

      return heading.includes(kw) || category.includes(kw) || tags.some((t) => t.includes(kw))
    })
  }

  console.log('篩完filters後list的長度:', list.length)

  const tops = list.filter((i) => i.slot === 'top')
  console.log('tops長度', tops.length)
  const bottoms = list.filter((i) => i.slot === 'bottom')
  console.log('bottoms長度', bottoms.length)
  // const extras = list.filter((i) => ['dress', 'swimsuit'].includes(i.category))
  // console.log('extras長度', extras.length)

  const first = pickExclude(tops, excludes)
  if (!first) {
    return null
  }
  console.log('第一次抽到', first)
  excludes.push(first.id)

  const second = pickExclude(bottoms, excludes)
  // if (!second) {
  //   return null
  // }
  console.log('第二次抽到', second)
  if (second) {
    excludes.push(second.id)
  }

  // let extra = null

  // if (extras.length > 0) {
  //   extra = pickExclude(extras, excludes)
  // } else {
  //   extra = null
  // }

  // if (extra) {
  //   excludes.push(extra.id)
  // }
  // console.log('第三次抽到', extra)

  const setoutfit = { top: first, bottom: second || null }
  console.log('[getRandomOutfit] 最終 setoutfit:', setoutfit)
  return setoutfit
}

function pickheroItem(filteroutfit) {
  console.log('pickheroItem收到', filteroutfit)
  if (!filteroutfit) {
    return null
  }

  if (filteroutfit.onepiece) {
    return filteroutfit.onepiece
  }
  if (filteroutfit.top) {
    return filteroutfit.top
  }
  if (filteroutfit.bottom) {
    return filteroutfit.bottom
  }
  return null
}

export function useOutfitRandomizer(initialFilters) {
  const all = ref([])
  const outfit = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const filters = ref(
    initialFilters || {
      season: 'all',
      style: 'all',
      keyword: '',
    },
  )

  const hero = computed(() => pickheroItem(outfit.value))

  const fetchAll = async () => {
    loading.value = true
    try {
      const res = await getOutfits()
      console.log('[fetchAll] 後端回傳:', res)
      all.value = res.data || res
      console.log('[fetchAll] all.value 長度:', all.value.length)
      console.log('res.data:', res.data)
    } catch (error) {
      console.log('取得失敗', error)
    } finally {
      loading.value = false
    }
  }

  function reroll() {
    console.log('[reroll]被呼叫了all的長度', all.value.length)
    if (!Array.isArray(all.value) || all.value.length === 0) {
      console.warn('[reroll] all還沒有資料先不抽')
      return
    }
    outfit.value = getRandomOutfit(all.value, filters.value)
    console.log('[reroll]新的outfit', outfit.value)
  }

  function setFilters(newFilters) {
    Object.assign(filters.value, newFilters)
  }
  // console.log('[before] filters:', filters.value)
  // console.log('[after] filters:', filters.value)

  watch(hero, (newVal) => {
    console.log('[useOutfitRandomizer] hero 變化:', newVal)
  })

  return { outfit, loading, error, fetchAll, filters, reroll, setFilters, all, hero }
}
