import { defineStore } from 'pinia'

const RE_KEY = 'favorite_restaurant_ids'

function safeParseArray(raw) {
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map((x) => String(x))
  } catch (e) {
    console.error(e)
    return []
  }
}

export const useFavoriteStore = defineStore('favoriteStore', {
  state: () => {
    return {
      favoriteIds: [],
      loaded: false,
    }
  },
  getters: {
    isFavorite: (state) => (id) => {
      const key = String(id)
      return state.favoriteIds.includes(key)
    },
    restaurantCount: (state) => state.favoriteIds.length,
    totalCount() {
      return this.restaurantCount
    },
  },
  actions: {
    load() {
      if (this.loaded) return
      const raw = localStorage.getItem(RE_KEY)
      this.favoriteIds = safeParseArray(raw)
      this.loaded = true
    },
    persist() {
      localStorage.setItem(RE_KEY, JSON.stringify(this.favoriteIds))
    },
    toggle(id) {
      this.load()
      const key = String(id)
      if (this.favoriteIds.includes(key)) {
        this.favoriteIds = this.favoriteIds.filter((i) => i !== id)
      } else {
        this.favoriteIds.push(key)
      }
      this.persist()
    },
    clear() {
      this.favoriteIds = []
      this.loaded = true
      this.persist()
    },
  },
})
