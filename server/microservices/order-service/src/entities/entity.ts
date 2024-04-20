export class OrderEntity {
  constructor(
    public stripeId: string,
    public rideId: string,
    public userId: string,
    public driverId: string,
    public source: string,
    public destination: string,
    public distance: string,
    public totalAmount: string,
    public createdAt: Date
  ) {}
}
