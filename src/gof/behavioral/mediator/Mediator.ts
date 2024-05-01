export class Mediator {
  private readonly listeners: Record<string, Function[]> = {};

  listen(event: string, listener: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  async notify(event: string, data: any): Promise<void> {
    const listeners = this.listeners[event];
    if (!listeners) throw new Error(`Event ${event} not found`);

    for (const listener of listeners) {
      await listener(data);
    }
  }
}
