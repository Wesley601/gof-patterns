import { Ticket } from "./Ticket";

enum TicketStatusEnum {
  REQUESTED = "requested",
  ASSIGNED = "assigned",
  IN_PROGRESS = "in_progress",
  CLOSED = "closed",
}

export interface TicketStatus {
  status: TicketStatusEnum;
  assign(): void;
  start(): void;
  close(): void;
}

export class RequestedStatus implements TicketStatus {
  status = TicketStatusEnum.REQUESTED;

  constructor(readonly ticket: Ticket) {}

  assign(): void {
    this.ticket.status = new AssignedStatus(this.ticket);
  }

  start(): void {
    throw new Error("Could not assign ticket.");
  }

  close(): void {
    throw new Error("Could not close ticket.");
  }
}

export class AssignedStatus implements TicketStatus {
  status = TicketStatusEnum.ASSIGNED;

  constructor(readonly ticket: Ticket) {}

  assign(): void {
    throw new Error("Could not assign ticket.");
  }

  start(): void {
    this.ticket.status = new InProgressStatus(this.ticket);
  }

  close(): void {
    throw new Error("Could not close ticket.");
  }
}

export class InProgressStatus implements TicketStatus {
  status = TicketStatusEnum.IN_PROGRESS;

  constructor(readonly ticket: Ticket) {}

  assign(): void {
    throw new Error("Could not assign ticket.");
  }

  start(): void {
    throw new Error("Could not start ticket.");
  }

  close(): void {
    this.ticket.status = new ClosedStatus(this.ticket);
  }
}

export class ClosedStatus implements TicketStatus {
  status = TicketStatusEnum.CLOSED;

  constructor(readonly ticket: Ticket) {}

  assign(): void {
    throw new Error("Could not assign ticket.");
  }

  start(): void {
    throw new Error("Could not start ticket.");
  }

  close(): void {
    throw new Error("Could not close ticket.");
  }
}
