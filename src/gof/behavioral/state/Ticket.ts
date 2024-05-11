import { RequestedStatus, TicketStatus } from "./TicketStatus";

export class Ticket {
  status: TicketStatus;
  private _employeeId: number = 0;
  private _assignDate: Date | null = null;
  private _startDate: Date | null = null;
  private _closeDate: Date | null = null;

  constructor(private customerId: number, private _requestDate: Date) {
    this.status = new RequestedStatus(this);
  }

  assign(employeeId: number, assignDate: Date) {
    this.status.assign();
    this._employeeId = employeeId;
    this._assignDate = assignDate;
  }

  start(startDate: Date) {
    this.status.start();
    this._startDate = startDate;
  }

  close(closeDate: Date) {
    this.status.close();
    this._closeDate = closeDate;
  }

  getStatistics(currentDate = new Date()) {
    const durations = {
      requestDuration: 0,
      assignDuration: 0,
      startDuration: 0,
    };
    durations.requestDuration =
      ((this._assignDate || currentDate).getTime() -
        this._requestDate.getTime()) /
      (1000 * 60 * 60);
    if (this._assignDate !== null) {
      durations.assignDuration =
        ((this._startDate || currentDate).getTime() -
          this._assignDate.getTime()) /
        (1000 * 60 * 60);
    }
    if (this._startDate !== null) {
      durations.startDuration =
        ((this._closeDate || currentDate).getTime() -
          this._startDate.getTime()) /
        (1000 * 60 * 60);
    }
    return durations;
  }

  getStatus() {
    return this.status.status.toString();
  }

  get employeeId() {
    return this._employeeId;
  }

  get assignDate() {
    return this._assignDate;
  }

  get startDate() {
    return this._startDate;
  }

  get closeDate() {
    return this._closeDate;
  }
}
