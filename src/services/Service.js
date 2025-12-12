import axios from 'axios'

import outfitsMock from '@/data/outfits.json'
import restaurantlistMock from '@/data/restaurantlist.json'
import inspirationsMock from '@/data/inspirations.json'

const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE || 'mock'
const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

//api base
const OUTFITS_API_URL = `${API_BASE}/outfits`
const INSPIRATIONS_API_UL = `${API_BASE}/inspirations`
const RESTAURANTLIST_API_UL = `${API_BASE}/restaurantlist`

const asAxiosResponse = (data) => Promise.resolve({ data })

//read apis

export const getOutfits = () => {
  if (DATA_SOURCE !== 'api') {
    return asAxiosResponse(outfitsMock)
  } else {
    return axios.get(OUTFITS_API_URL)
  }
}

export const getInspirations = () => {
  if (DATA_SOURCE !== 'api') {
    return asAxiosResponse(inspirationsMock)
  } else {
    return axios.get(INSPIRATIONS_API_UL)
  }
}

export const getRestaurantlist = () => {
  if (DATA_SOURCE !== 'api') {
    return asAxiosResponse(restaurantlistMock)
  } else {
    return axios.get(RESTAURANTLIST_API_UL)
  }
}

// write api

export const createOutfits = (newOutfits) => {
  if (DATA_SOURCE !== 'api') {
    return asAxiosResponse({ ok: true, mock: true })
  } else {
    return axios.post(OUTFITS_API_URL, newOutfits)
  }
}

export const updateOutfits = (id, updateOutfits) => {
  if (DATA_SOURCE !== 'api') {
    return asAxiosResponse({ ok: true, mock: true })
  } else {
    return axios.put(`${OUTFITS_API_URL}/${id}`, updateOutfits)
  }
}

export const deleteOutfits = (id) => {
  if (DATA_SOURCE !== 'api') {
    return asAxiosResponse({ ok: true, mock: true })
  } else {
    return axios.delete(`${OUTFITS_API_URL}/${id}`)
  }
}
