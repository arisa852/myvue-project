import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/outfits`

export const getOutfits = () => axios.get(API_URL)

export const createOutfits = (newOutfits) => axios.post(API_URL, newOutfits)

export const updateOutfits = (id, updateOutfits) => axios.put(`${API_URL}/${id}`, updateOutfits)

export const deleteOutfits = (id) => axios.delete(`${API_URL}/${id}`)
