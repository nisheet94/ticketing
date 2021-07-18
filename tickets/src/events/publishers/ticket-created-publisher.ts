import { Publisher, Subjects, TicketCreatedEvent } from "@nctickets51/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;    
}