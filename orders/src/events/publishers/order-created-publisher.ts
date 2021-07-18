import { Publisher, OrderCreatedEvent, Subjects } from '@nctickets51/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
