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
  
    // Additional details (optional)
    driverLicenseNumber?: string; // Optional property
    pickupTime?: string; // Optional property
    dropOffTime?: string; // Optional property
    duration?: string; // Optional property
    rate?: number; // Optional property
    seatAvailable: number;
    profileCompletionStatus: string;
    
    rideId:string;
  }