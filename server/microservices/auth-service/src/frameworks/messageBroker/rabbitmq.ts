import amqp from 'amqplib';
import { AuthEntity } from '../../domain/entity/auth.entity';

export class RabbitMQService {
    private connection: amqp.Connection | null = null;
    private channel: amqp.Channel | null = null;
    private correlationIdMap: Map<string, (response: any) => void> = new Map();

    async initialize() {
        try {
            const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
            this.connection = await amqp.connect(rabbitmqUrl);
            this.channel = await this.connection.createChannel();
            console.log('The connection is established');
        } catch (error) {
            console.error('Failed to establish connection to RabbitMQ:', error);
            throw error;
        }
    }

    async ensureChannel() {
        if (!this.channel) {
            await this.initialize();
        }
        return this.channel;
    }

    async userRegPublisher(userData: AuthEntity) {
        try {
            const channel = await this.ensureChannel();
            const queue = 'userReg';
            await channel?.assertQueue(queue, { durable: true });
            channel?.sendToQueue(queue, Buffer.from(JSON.stringify(userData)));
            console.log('The user data passed successfully');
        } catch (error) {
            console.error('Failed to publish user registration data:', error);
            throw error;
        }
    }

    async publishLoginData(loginData: AuthEntity): Promise<any | null> {
        try {
            const channel = await this.ensureChannel();
            const correlationId = this.generateCorrelationId();
            const message = JSON.stringify(loginData);
            await channel?.assertQueue('response_queue', { durable: false });
            this.consumeResponseQueue();

            const responsePromise = new Promise<any>((resolve) => {
                this.correlationIdMap.set(correlationId, resolve);
            });

            await channel?.assertQueue('login_queue', { durable: false });
            channel?.sendToQueue('login_queue', Buffer.from(message), {
                correlationId,
                replyTo: 'response_queue',
            });

            const response = await responsePromise;
            console.log('Received response:', response);
            if (response === 'false') {
                return null;
            }
            return response;
        } catch (error) {
            console.error('Error publishing login data:', error);
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
                'response_queue',
                (msg) => {
                    if (msg && msg.properties.correlationId) {
                        const correlationId = msg.properties.correlationId;
                        const response = msg.content.toString();
                        this.handleResponse(correlationId, response);
                    }
                },
                { noAck: true }
            );
        } catch (error) {
            console.error('Error consuming response queue:', error);
            throw error;
        }
    }
}
