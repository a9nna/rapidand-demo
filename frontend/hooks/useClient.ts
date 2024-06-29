import axios from 'axios'
import { ClientForm } from '@/utils/types'

const useClient = () => {
  const createClient = async (clientData: ClientForm) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/clients`,
        clientData,
      )

      return response.data
    } catch (error) {
      console.log('>>>error', error)
      throw error
    }
  }

  return { createClient }
}

export default useClient
