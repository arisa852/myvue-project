import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${Token}`
    }
    console.log('發送請求', config.method?.toUpperCase(), config.url)
    return config
  },
  function (error) {
    console.log('請求錯誤', error)
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  function (response) {
    console.log('回應請求', response.status, response.config.url)
    console.log('回傳資料', response.data)
    return response.data
  },

  function (error) {
    console.log('回應錯誤', error.message)
    return Promise.reject(error)
  },
)

export default api
