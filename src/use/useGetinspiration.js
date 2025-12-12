import { ref } from 'vue'
import { getInspirations } from '@/services/Service'

export function useGetinspiration() {
  const inspirations = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchInspiration = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await getInspirations()
      inspirations.value = res.data || res
    } catch (err) {
      console.log('fail to fetch inspirations', error)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { inspirations, loading, error, fetchInspiration }
}
