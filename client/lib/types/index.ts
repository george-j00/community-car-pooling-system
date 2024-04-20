export type CheckoutOrderParams = {
    source: string
    destination: string
    userId: string
    rideId: string
    driverId: string
    rate: number
    distance: string
    duration: string
  }
  
  export type CreateOrderParams = {
    stripeId: string
    rideId: string
    userId: string
    totalAmount: string
    distance: string
    duration: string
    createdAt: Date
  }
  