import axios from 'axios'

const OUTFITS_API_URL = `${import.meta.env.VITE_API_BASE_URL}/outfits`
const INSPIRATIONS_API_UL = `${import.meta.env.VITE_API_BASE_URL}/inspirations`

export const getOutfits = () => axios.get(OUTFITS_API_URL)
export const getInspirations = () => axios.get(INSPIRATIONS_API_UL)

export const createOutfits = (newOutfits) => axios.post(OUTFITS_API_URL, newOutfits)

export const updateOutfits = (id, updateOutfits) =>
  axios.put(`${OUTFITS_API_URL}/${id}`, updateOutfits)

export const deleteOutfits = (id) => axios.delete(`${OUTFITS_API_URL}/${id}`)
