import * as z from "zod";

export const registerFormSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  email: z.string().trim().email("Invalid email format"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});
export const loginFormSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});
export const adminLoginFormSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});
export const updateProfileFormSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters"),
  email: z.string().trim().email("Invalid email format"),
  phoneNumber: z
  .string()
  .refine((value) => /^\d{10}$/.test(value), { message: "Invalid phone number format. Must be 10 digits" }),
  // imageUrl: z.string(),  // Add if needed
  carName: z.string().min(2, { message: "Car name must be at least 2 characters." }),
  carType: z.string().min(2, { message: "Please mention the type." }),
  carModel: z.string().min(2, { message: "Please mention the model." }),
  carCapacity: z.number().min(1, { message: "Capacity must be at least 1 passenger" }).max(5, { message: "Capacity cannot exceed 5 passengers" }),
  vehicleNumber: z.string().min(4, { message: "Vehicle number must be at least 4 characters." }),
  fuelType: z.enum(["Petrol", "Diesel", "Electric"]),
  driverLicenseNumber: z.string().trim().min(6, "Enter correct license number"),
 
});

