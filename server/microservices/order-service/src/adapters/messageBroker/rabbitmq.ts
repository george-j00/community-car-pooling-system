import amqp from "amqplib";

export class RabbitMQService {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private correlationIdMap: Map<string, (response: any) => void> = new Map();

  async initialize() {
    try {
      const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";
      this.connection = await amqp.connect(rabbitmqUrl);
      this.channel = await this.connection.createChannel();
      console.log("The connection is established");
    } catch (error) {
      console.error("Failed to establish connection to RabbitMQ:", error);
      throw error;
    }
  }

  async ensureChannel() {
    if (!this.channel) {
      await this.initialize();
    }
    return this.channel;
  }

  async fetchCompleteOrder(rideId: string, driverId: string) {
    try {
      const rideRequestQueue = "ride_queue";
      const driverRequestQueue = "driver_queue";

      const responseQueue1 = "response_queue1";
      const responseQueue2 = "response_queue2";

      const channel = await this.ensureChannel();

      const rideCorrelationId = this.generateCorrelationId();
      const driverCorrelationId = this.generateCorrelationId();

      const message1 = JSON.stringify({ rideId });
      const message2 = JSON.stringify({ driverId });

      await channel?.assertQueue(responseQueue1, { durable: false });
      await channel?.assertQueue(responseQueue2, { durable: false });
      this.consumeResponseQueue();

      const responsePromise1 = new Promise<any>((resolve) => {
        this.correlationIdMap.set(rideCorrelationId, resolve);
      });

      const responsePromise2 = new Promise<any>((resolve) => {
        this.correlationIdMap.set(driverCorrelationId, resolve);
      });

      await channel?.assertQueue(rideRequestQueue, { durable: false });
      await channel?.assertQueue(driverRequestQueue, { durable: false });

      channel?.sendToQueue(rideRequestQueue, Buffer.from(message1), {
        correlationId: rideCorrelationId,
        replyTo: responseQueue1,
      });
      channel?.sendToQueue(driverRequestQueue, Buffer.from(message2), {
        correlationId: driverCorrelationId,
        replyTo: responseQueue2,
      });

      const [response1, response2] = await Promise.all([
        responsePromise1,
        responsePromise2,
      ]);
      
      return { ...response1, ...response2 }; 
    } catch (error) {
      console.error("Error fetching complete order data:", error);
      throw error;
    }
  }

  async fetchPassengersData(passengersList: any[]) {
    try {
      const passengerRequestQueue = "passenger_queue";
      const passengerResponseQueue = "passenger_response_queue";

      const channel = await this.ensureChannel();

      await channel?.assertQueue(passengerRequestQueue, { durable: false });
      await channel?.assertQueue(passengerResponseQueue, { durable: false });
      this.consumeResponseQueue();
      const passengerCorrelationId = this.generateCorrelationId();
      const passengerMessage = JSON.stringify({ passengersList });

      const passengerResponsePromise = new Promise<any>((resolve) => {
        this.correlationIdMap.set(passengerCorrelationId, resolve);
      });

      channel?.sendToQueue(passengerRequestQueue, Buffer.from(passengerMessage), {
        correlationId: passengerCorrelationId,
        replyTo: passengerResponseQueue,
      });

      const passengerResponse = await passengerResponsePromise;
      return passengerResponse;
    } catch (error) {
      console.error("Error fetching passenger data:", error);
      throw error;
    }
  }

  async reduceSeatAvailability(seatCount: string , rideId:string) {
    try {
        const channel = await this.ensureChannel();
        const queue = 'seatAvailabilityQueue';
        await channel?.assertQueue(queue, { durable: true });
        const payload = {
          seatCount:seatCount,
          rideId:rideId,
        }
        channel?.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
        console.log('The seat count passed successfully');
    } catch (error) {
        console.error('Failed to publish reduce seat count function:', error);
        throw error;
    }
}

  private generateCorrelationId(): string {
    return Math.random().toString() + Date.now().toString();
  }

  private handleResponse(correlationId: string, response: any): void {
    const resolveFunction = this.correlationIdMap.get(correlationId);
    if (resolveFunction) {
      resolveFunction(response);
      this.correlationIdMap.delete(correlationId);
    }
  }

  async consumeResponseQueue(): Promise<void> {
    try {
      const channel = await this.ensureChannel();
      channel?.consume(
        "response_queue1",
        (msg) => {
          if (msg && msg.properties.correlationId) {
            const correlationId = msg.properties.correlationId;
            const response = JSON.parse(msg.content.toString());
            this.handleResponse(correlationId, response);
          }
        },
        { noAck: true }
      );

      channel?.consume(
        "response_queue2",
        (msg) => {
          if (msg && msg.properties.correlationId) {
            const correlationId = msg.properties.correlationId;
            const response = JSON.parse(msg.content.toString());
            this.handleResponse(correlationId, response);
          }
        },
        { noAck: true }
      );
      channel?.consume(
        "passenger_response_queue",
        (msg) => {
          if (msg && msg.properties.correlationId) {
            const correlationId = msg.properties.correlationId;
            const response = JSON.parse(msg.content.toString());
            console.log('passengers data response ',response);
            
            this.handleResponse(correlationId, response); // Existing code for handling response
          }
        },
        { noAck: true }
      );
    } catch (error) {
      console.error("Error consuming response queues:", error);
      throw error;
    }
  }
}
