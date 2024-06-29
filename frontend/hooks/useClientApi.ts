import axios from "axios";
import { ClientForm } from "@/types";

const useClientApi = () => {
  const createClient = async (clientData: ClientForm) => {
    try {
      const response = await axios.post(`${process.env.API_URL}`, clientData);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { createClient };
};

export default useClientApi;
