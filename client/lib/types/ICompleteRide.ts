export interface ICompleteRide {
    // Basic car information
    _id:string
    capacity: number;
    carName: string;
    fuelType: string;
    model: string;
    type: string;
    vehicleNumber: string;
  
    // User information
    userId: string;
    username: string;
    phoneNumber: string;
    email: string;
    password: string; // Note: Consider storing password securely (hashed)
  
    // Ride details
    source: string;
    destination: string;
    distance: string;
    date: string;
    status: string;
  
    driverLicenseNumber?: string; 
    pickupTime: string; 
    dropOffTime: string; 
    duration: string; 
    rate: number; 
    seatAvailable: number;
    profileCompletionStatus: string;
    rideId:string;
  }