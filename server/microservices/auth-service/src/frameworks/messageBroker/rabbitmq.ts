
import amqp from "amqplib";

export class RabbitMQService {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  async initialize() {
    // const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://rabbitmq";
    const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";
    this.connection = await amqp.connect(rabbitmqUrl);
    this.channel = await this.connection.createChannel();
  }

  async publishUserRegisteredEvent(userData: any) {
    if (!this.channel) {
      await this.initialize();
    }
    if (this.channel) {
      const queue = "registerQueue";
      await this.channel.assertQueue(queue, { durable: true });

      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(userData)));

      console.log(`The user data is sent successfully`);
    } else {
      console.error("Failed to create a channel");
    }
  }
  
  public async publicLoginCredentials(credentials: {
    email: string;
    password: string;
  }): Promise<any> {
    const queue1 = "queue1";
    const queue2 = "queue2";
    const correlationId = "12345";
    
    if (!this.channel) {
      await this.initialize(); 
    }

    if (this.channel) {
      await this.channel.assertQueue(queue1, { durable: true });
      await this.channel.assertQueue(queue2, { durable: true });
    }

    return new Promise((resolve, reject) => {
      if (this.channel) {
        this.channel.sendToQueue(
          queue1,
          Buffer.from(JSON.stringify(credentials)),
          { correlationId }
        );

        console.log("Login data sent to user service");

        this.channel.consume(
          queue2,
          (msg) => {
            if (msg && msg.properties.correlationId === correlationId) {
              const loginResponse = JSON.parse(msg.content.toString());
              resolve(loginResponse);
              console.log("Response from the user service", loginResponse);
              this.channel?.ack(msg);
            }
          },
          { noAck: false }
        );
      }
    });
  }

}
    