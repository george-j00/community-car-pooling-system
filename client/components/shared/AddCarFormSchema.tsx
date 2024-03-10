import { z } from "zod";

export const formSchema = z.object({
    carName: z
      .string()
      .min(2, { message: "Car name must be at least 2 characters." }),
    type: z.string().min(2, { message: "Please mention the type." }),
    model: z.string().min(2, { message: "Please mention the model." }),
    capacity: z
      .number()
      .min(1, { message: "Capacity must be at least 1 passenger" })
      .max(5, { message: "Capacity cannot exceed 5 passengers" }),
    vehicleNumber: z
      .string()
      .min(4, { message: "Vehicle number must be at least 4 characters." }),
    fuelType: z.enum(["Petrol", "Diesel", "Electric"]),
  }); 

