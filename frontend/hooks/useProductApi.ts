import { ProductForm } from '@/constants/types'
import axios from 'axios'

const useProductApi = () => {
  const createProduct = async (formData: FormData) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_PRODUCT_URL}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      return response.data
    } catch (error) {
      console.error('error api', error)
      return error
    }
  }

  const getProducts = async (): Promise<ProductForm[] | null> => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_PRODUCT_URL}`,
      )

      return response.data.products
    } catch (error) {
      console.error('error api', error)
      return null
    }
  }

  return { createProduct, getProducts }
}

export default useProductApi
