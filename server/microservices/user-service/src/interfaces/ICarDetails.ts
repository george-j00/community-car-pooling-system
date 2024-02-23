export interface ICarDetails {
  carName: string;
  type?: string;
  model?: string;
  capacity?: number;
  vehicleNumber?: string;
  fuelType?: "Petrol" | "Diesel" | "Electric";
}
