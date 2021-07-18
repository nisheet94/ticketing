import { Publisher, Subjects, TicketUpdatedEvent } from "@nctickets51/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;    
}