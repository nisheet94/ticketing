import { Subjects, Publisher, OrderCancelledEvent } from '@nctickets51/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}