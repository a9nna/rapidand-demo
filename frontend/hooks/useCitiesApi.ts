import axios from 'axios'

const useCitiesApi = () => {
  const getCities = async (country: string) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_CITIES_URL}`,
        {
          country,
        },
      )
      return response.data.data
    } catch (error) {
      return error
    }
  }

  return { getCities }
}

export default useCitiesApi
