import axios from 'axios'
import { ClientForm } from '@/constants/types'

const useClientApi = () => {
  const createClient = async (clientData: ClientForm) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_CLIENT_URL}`,
        clientData,
      )

      return response.data
    } catch (error) {
      console.error('error api', error)
      return error
    }
  }

  return { createClient }
}

export default useClientApi
