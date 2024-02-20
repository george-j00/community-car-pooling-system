import { UserCredentials } from "@/types/IFormFields"
import axios from "axios"

const baseUrl = 'http://localhost:3001/api/auth/register'
export const userRegistration = (credentials : UserCredentials) => {

     axios.post(baseUrl , credentials);
    // return response 
}