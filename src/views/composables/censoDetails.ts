// mouse.js
import axios from 'axios'
import { useAuth } from '../../stores/auth'
import type { IResponse } from '@/utils'
import type { CensoDetails } from '@/model/Type'
import { ref } from 'vue'
// by convention, composable function names start with "use"
export function useCensoDetails() {
  const { headers } = useAuth()
  const censo = ref<CensoDetails>()
  const fetchCurrentCenso = async () => {
    return await axios
      .get<IResponse<CensoDetails>>(`${import.meta.env.VITE_API_URL}/censo/record/1/detail`, {
        ...headers()
      })
      .then((response) => {
        censo.value = response.data.data
      })
  }
  return {
    fetchCurrentCenso,
    censo
  }
}
