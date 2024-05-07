import amqp from "amqplib";
import { IUserSchema } from "../../interfaces/IUserSchema";
import { UserUsecase } from "../../domain/usecases/user.usecase";

export class rabbitmq {
  private Connection: amqp.Connection | null = null;
  private Channel: amqp.Channel | any = null;
  constructor(public userUsecases: UserUsecase) {}

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

  async userRegConsumer() {
    if (!this.Channel) {
      await this.initialize();
    }
    if (this.Channel) {
      const queue = "userReg";
      await this.Channel.assertQueue(queue, { durable: true });
      await this.Channel.consume(
        queue,
        (msg: any) => {
          if (msg !== null && msg.content) {
            try {
              console.log("row message ", msg);

              const data = JSON.parse(msg.content.toString());
              console.log("Received message:", data);
              this.userUsecases.register(data);
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

  async checkUserExistence() {
    if (!this.Channel) {
      await this.initialize();
    }
    if (this.Channel) {
      const responseQueue = "response_queue";
      const requestQueue = "user_email_check_queue";

      await this.Channel.assertQueue(responseQueue, { durable: false });
      await this.Channel.assertQueue(requestQueue, { durable: false });

      this.Channel.consume(
        requestQueue,
        async (msg: any) => {
          if (msg !== null && msg.content) {
            try {
              console.log("Raw user existence email:", msg);
              const email = JSON.parse(msg.content.toString());
              console.log("Received email :", email);
              const existingUser = await this.userUsecases.checkUserExistence(
                email
              );
              const correlationId = msg.properties.correlationId;
              const responseQueue = msg.properties.replyTo;

              if (correlationId && responseQueue) {
                const responseMessage = JSON.stringify(existingUser);
                await this.Channel.sendToQueue(
                  responseQueue,
                  Buffer.from(responseMessage),
                  {
                    correlationId,
                  }
                );
                console.log("User existence response sent:", responseMessage);
              }
            } catch (error) {
              console.error(
                "Error parsing user existence message content:",
                error
              );
              console.log(
                "Raw user existence message content:",
                msg.content.toString()
              );
            }
          }
        },
        { noAck: true }
      );
    } else {
      console.error("Failed to create a channel");
    }
  }

  async userLoginConsumer() {
    if (!this.Channel) {
      await this.initialize();
    }

    if (this.Channel) {
      await this.Channel.assertQueue("response_queue", { durable: false });
      const queue = "login_queue";
      await this.Channel.assertQueue(queue, { durable: false });

      this.Channel.consume(
        queue,
        async (msg: any) => {
          if (msg !== null && msg.content) {
            try {
              console.log("Raw login message:", msg);
              const loginData = JSON.parse(msg.content.toString());
              console.log("Received login message:", loginData);
              const { email, password } = loginData;
              const loginResult = await this.userUsecases.login(
                email,
                password
              );
              const correlationId = msg.properties.correlationId;
              const responseQueue = msg.properties.replyTo;

              if (correlationId && responseQueue) {
                const responseMessage = JSON.stringify(loginResult);
                await this.Channel.sendToQueue(
                  responseQueue,
                  Buffer.from(responseMessage),
                  {
                    correlationId,
                  }
                );
                console.log("Login response sent:", responseMessage);
              }
            } catch (error) {
              console.error("Error parsing login message content:", error);
              console.log("Raw login message content:", msg.content.toString());
            }
          }
        },
        { noAck: true }
      );
    } else {
      console.error("Failed to create a channel");
    }
  }


  async fetchUserConsumer() {
    if (!this.Channel) {
      await this.initialize();
    }

    if (this.Channel) {
      await this.Channel.assertQueue("response_queue2", { durable: false });
      const queue = "driver_queue";
      await this.Channel.assertQueue(queue, { durable: false });

      this.Channel.consume(
        queue,
        async (msg: any) => {
          if (msg !== null && msg.content) {
            try {
              console.log("Raw message with driver id :", msg);
              const driverUserData = JSON.parse(msg.content.toString());
              console.log("Received driver id message:", driverUserData);
              const { driverId } = driverUserData;
              const userData = await this.userUsecases.getUser(
                driverId
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
                console.log("Driver response sent:", responseMessage);
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
  async fetchPassengersData() {
    if (!this.Channel) {
      await this.initialize();
    }

    if (this.Channel) {
      await this.Channel.assertQueue("passenger_response_queue", { durable: false });
      const queue = "passenger_queue";
      await this.Channel.assertQueue(queue, { durable: false });

      this.Channel.consume(
        queue,
        async (msg: any) => {
          if (msg !== null && msg.content) {
            try {
              const passengersUserIds = JSON.parse(msg.content.toString());
              const passengersData = await this.userUsecases.getPassengersData(passengersUserIds);
              const correlationId = msg.properties.correlationId;
              const responseQueue = msg.properties.replyTo;

              if (correlationId && responseQueue) {
                const responseMessage = JSON.stringify(passengersData);
                await this.Channel.sendToQueue(
                  responseQueue,
                  Buffer.from(responseMessage),
                  {
                    correlationId,
                  }
                );
                console.log("passengers response sent:", responseMessage);
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
}
