import { Subjects, Publisher, PaymentCreatedEvent } from '@nctickets51/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}