import axios from "axios";
import { ClientForm } from "@/types";

const useClient = () => {
  const createClient = async (clientData: ClientForm) => {
    try {
      const response = await axios.post(`${API_URL}/clients`, clientData);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { createClient };
};

export default useClient;
