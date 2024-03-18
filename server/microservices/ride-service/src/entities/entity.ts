export class RideEntity {
  public readonly id?: string;
  public readonly userId: string;
  public readonly source: string;
  public readonly destination: string;
  public readonly date: string;
  public readonly pickupTime: string;
  public readonly dropOffTime: string;
  public readonly distance: string;
  public readonly duration: string;
  public readonly rate: string;

  constructor(
    id: string,
    userId: string,
    source: string,
    destination: string,
    date: string,
    pickupTime: string,
    dropOffTime: string,
    distance: string,
    duration: string,
    rate: string
  ) {
    this.id = id;
    this.userId = userId;
    this.source = source;
    this.destination = destination;
    this.date = date;
    this.pickupTime = pickupTime;
    this.dropOffTime = dropOffTime;
    this.distance = distance;
    this.duration = duration;
    this.rate = rate;
  }
}
