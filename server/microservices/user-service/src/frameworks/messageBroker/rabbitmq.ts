import amqp from "amqplib";
import { UserUsecase } from "../../usecases/user.usecase";

export class AuthConsumers {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;

  constructor(public userUsecase: UserUsecase) {}

  async initialize() {
    try {
      // const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";
      const rabbitmqUrl = process.env.RABBITMQ_URL || "amqp://localhost:5672";
      this.connection = await amqp.connect(rabbitmqUrl);
      this.channel = await this.connection.createChannel();
      console.log("rabbitmq connection established");
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
      process.exit(1); // Or handle the error appropriately
    }
  }
  //register consumer with registerQueue
  async consumeMessages() {
    if (!this.channel) {
      await this.initialize();
    }
    if (this.channel) {
      const queue = "registerQueue";
      await this.channel.assertQueue(queue, { durable: true });

      await this.channel.consume(
        queue,
        (msg) => {
          if (msg !== null && msg.content) {
            try {
              const data = JSON.parse(msg.content.toString());
              this.userUsecase.register(data);
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

// async loginCommunications() {
//     try {
//       const queue1 = "queue1";
//       const queue2 = "queue2";

//       if (!this.channel) {
//         await this.initialize();
//       }

//       if (this.channel) {
//         await this.channel.assertQueue(queue1, { durable: true });
//         await this.channel.assertQueue(queue2, { durable: true });
//       }

//       if (this.channel) {
//         await this.channel.consume(
//           queue1,
//           async (msg) => {
//             try {
//               if (this.channel && msg) {
//                 const data = JSON.parse(msg.content.toString());
//                 const correlationId = msg.properties.correlationId;
//                 console.log("Correlation ID:", correlationId);
//                 console.log("Received login credential:", data);
//                 this.channel.ack(msg);
//                 const { email, password } = data;
//                 const loginResponse = await this.userUsecase.login(email, password);
                
//                 this.channel.sendToQueue(
//                   queue2,
//                   Buffer.from(JSON.stringify(loginResponse)),
//                   { correlationId }
//                 );
//                 console.log("Response send back to auth service");
//               }
//             } catch (error) {
//               console.error("Error processing message:", error);
//             }
//           },
//           { noAck: false }
//         );
//       }
//     } catch (error) {
//       console.error("Error in login consumer:", error);
//     }
//   }


}
     