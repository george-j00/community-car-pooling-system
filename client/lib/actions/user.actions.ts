import { UserCredentials } from "@/types/IFormFields";
import axios, { AxiosError } from "axios";

const baseUrl = "http://localhost:3002/api/users";


export const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl+"/getAllUsers");
    if (response.status === 200) {
      return response?.data?.users;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const errorMessage = axiosError.response.data;
      return errorMessage;
    }
  }
};

export const banUser = async (userId : string) => {
    try {
        const response = await axios.post(baseUrl+"/banUser" , {userId : userId});
        if (response.status === 200) {
        return response?.data?.updated
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const errorMessage = axiosError.response.data;
          return errorMessage;
        }
      }
}
