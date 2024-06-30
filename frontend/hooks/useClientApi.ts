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

  const getClient = async (): Promise<ClientForm[] | null> => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_CLIENT_URL}`,
      )
      return response.data.clients
    } catch (error) {
      console.error('error api', error)
      return null
    }
  }

  return { createClient, getClient }
}

export default useClientApi
