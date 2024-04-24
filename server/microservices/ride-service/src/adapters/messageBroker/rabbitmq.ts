import amqp from "amqplib";
import { RideUsecase } from "../../usecases/ride.usecase";

export class rabbitmq {
  private Connection: amqp.Connection | null = null;
  private Channel: amqp.Channel | any = null;
  constructor(public rideUsecase: RideUsecase) {}

  async initialize() {
    try {
      const rabbitmqUrl = "amqp://localhost:5672";
      this.Connection = await amqp.connect(rabbitmqUrl);
      this.Channel = await this.Connection.createChannel();
      console.log("the connection is established");
    } catch (err) {
      console.log(err, "the connection is not established");
      process.exit(1);
    }
  }

  async fetchUserConsumer() {
    if (!this.Channel) {
      await this.initialize();
    }

    if (this.Channel) {
      await this.Channel.assertQueue("response_queue2", { durable: false });
      const queue = "ride_queue";
      await this.Channel.assertQueue(queue, { durable: false });

      this.Channel.consume(
        queue,
        async (msg: any) => {
          if (msg !== null && msg.content) {
            try {
              console.log("Raw message with ride id :", msg);
              
              const rideData = JSON.parse(msg.content.toString());
              console.log("Received ride id message:", rideData);
              const { rideId } = rideData;
              const userData = await this.rideUsecase.getRideById(
                rideId
              );
              const correlationId = msg.properties.correlationId;
              const responseQueue = msg.properties.replyTo;

              if (correlationId && responseQueue) {
                const responseMessage = JSON.stringify(userData);
                await this.Channel.sendToQueue(
                  responseQueue,
                  Buffer.from(responseMessage),
                  {
                    correlationId,
                  }
                );
                console.log("ride response sent:", responseMessage);
              }
            } catch (error) {
              console.error("Error parsing driver id  message content:", error);
              console.log("Raw driver message content:", msg.content.toString());
            }
          }
        },
        { noAck: true }
      );
    } else {
      console.error("Failed to create a channel");
    }
  }

  async reduceSeatAvailable() {
    if (!this.Channel) {
      await this.initialize();
    }
    if (this.Channel) {
      const queue = "seatAvailabilityQueue";
      await this.Channel.assertQueue(queue, { durable: true });
      await this.Channel.consume(
        queue,
        (msg: any) => {
          if (msg !== null && msg.content) {
            try {
              console.log("row message ", msg);

              const data = JSON.parse(msg.content.toString());
              console.log("Received message:", data);
              this.rideUsecase.reduceSeatAvailable(data);
            } catch (error) {
              console.error("Error parsing message content:", error);
              console.log("Raw message content:", msg.content.toString());
            }
          }
        },
        { noAck: true }
      );
    } else {
      console.error("Failed to create a channel");
    }
  }
}
