import { defineStore } from 'pinia'

const RE_KEY = 'favorite_restaurant_ids'
const OU_KEY = 'favorite_outfit_ids'

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
      restaurantIds: [],
      outfitIds: [],
      loaded: false,
    }
  },
  getters: {
    isRestaurantFavorite: (state) => (id) => state.restaurantIds.includes(String(id)),
    isOutfitFavorite: (state) => (id) => state.outfitIds.includes(String(id)),
    restaurantCount: (state) => state.restaurantIds.length,
    outfitCount: (state) => state.outfitIds.length,
    totalCount() {
      return this.restaurantCount + this.outfitCount
    },
  },
  actions: {
    load() {
      if (this.loaded) return
      this.restaurantIds = safeParseArray(localStorage.getItem(RE_KEY))
      this.outfitIds = safeParseArray(localStorage.getItem(OU_KEY))
      this.loaded = true
    },
    persist() {
      localStorage.setItem(RE_KEY, JSON.stringify(this.restaurantIds))
      localStorage.setItem(OU_KEY, JSON.stringify(this.outfitIds))
    },
    toggleRestaurant(id) {
      this.load()
      const key = String(id)
      if (this.restaurantIds.includes(key)) {
        this.restaurantIds = this.restaurantIds.filter((i) => i !== id)
      } else {
        this.restaurantIds.push(key)
      }
      this.persist()
    },
    toggleOutfit(id) {
      this.load()
      const key = String(id)
      if (this.outfitIds.includes(key)) {
        this.outfitIds = this.outfitIds.filter((i) => i !== id)
      } else {
        this.outfitIds.push(key)
      }
      this.persist()
    },
    clear() {
      this.restaurantIds = []
      this.outfitIds = []
      this.loaded = true
      this.persist()
    },
  },
})
