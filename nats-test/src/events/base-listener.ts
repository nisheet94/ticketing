import { Message, Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';;

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Listener<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    abstract onMessage(data: T['data'], msg: Message): void;
    private client: Stan;
    protected ackWait = 5 * 1000;

    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOptions() {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()  // To GET all events that have been emitted in the past
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);  // To keep TRACK of all the events that have gone to this subscription
                                                   // Even if it goes offline for a little bit
    }

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName, // So we DONT dump the Durable Name if our services restart for a very brief period of time
            this.subscriptionOptions()  // -> AND to make sure event goes to only ONE instance of our service even if we're running multiple instances
        );

        subscription.on('message', (msg: Message) => {
            console.log(
                `Message received: ${this.subject} / ${this.queueGroupName}`
            );

            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });        
    }

    parseMessage(msg: Message) {
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8'));
    }
}