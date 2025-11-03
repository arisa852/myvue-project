import { ref } from 'vue'
import { getOutfits } from '@/services/outfitService'

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

function getRandomOutfit(arr) {
  let excludes = []

  const tops = arr.filter((i) => ['shirt', 'jacket', 'tank'].includes(i.category))
  const bottoms = arr.filter((i) => ['pants', 'shorts'].includes(i.category))
  const extras = arr.filter((i) => ['dress', 'swimsuit'].includes(i.category))

  const first = pickExclude(tops, excludes)
  if (!first) {
    return null
  }
  console.log('第一次抽到', first)
  excludes.push(first.id)

  const second = pickExclude(bottoms, excludes)
  if (!second) {
    return null
  }
  console.log('第二次抽到', second)
  excludes.push(second.id)

  let extra = null

  if (extras.length > 0) {
    extra = pickExclude(extras, excludes)
  } else {
    extra = null
  }

  if (extra) {
    excludes.push(extra.id)
  }
  console.log('第三次抽到', extra)

  const setoutfit = { top: first, bottom: second, extra: extra || null }
  return setoutfit
}

export function useOutfitRandomizer(initialFilters) {
  const all = ref([])
  const outfit = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const filters = ref(initialFilters)

  const fetchAll = async () => {
    loading.value = true
    try {
      const res = await getOutfits()
      all.value = res.data || res
      
    } catch (error) {
      console.log('取得失敗', error)
    } finally {
      loading.value = false
    }
  }

  function reroll() {
    outfit.value = getRandomOutfit(all.value, filters.value)
  }

  return { outfit, loading, error, fetchAll, filters, reroll }
}
