import axios from 'axios'
import { auth } from '@/services/firebase'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser

   if (user) {
      const token = await user.getIdToken()

    if(!config.headers){
      config.headers = {}
    }

      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('發送請求', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) =>{
     console.log('請求錯誤', error)
     return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) =>{
    console.log('回應請求', response.status, response.config.url)
    console.log('回傳資料', response.data)
    return response.data
  },
  (error) => {
    console.log('回應錯誤', error.message)
    return Promise.reject(error)
  },
)

export default api
