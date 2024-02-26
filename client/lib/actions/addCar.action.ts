import axios from "axios";


type carDataParams = {
  carName: string;
  type?: string | undefined;
    model?: string | undefined;
  capacity: number;
  vehicleNumber: string;
  fuelType: "Petrol" | "Diesel" | "Electric";
};

const baseUrl = "http://localhost:3002/api/user/add-car";
export const addCarDetails = async (addCarDetails: carDataParams) => {
  try {
    
    await axios.post(baseUrl, addCarDetails);
    //   if (response.status === 200) {
    //     const { email } = credentials;
    //     return email; // Return the email upon successful registration
    //   }
  } catch (error) {
    console.error("Error occurred during registration:", error);
  }
};
