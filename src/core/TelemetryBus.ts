export interface TelemetryEvent {
  id: string;
  senderRole: string;
  senderName: string;
  action: string;
  timestamp: number;
}

class TelemetryBusClass {
  private listeners: ((event: TelemetryEvent) => void)[] = [];

  public emit(event: TelemetryEvent) {
    this.listeners.forEach((listener) => listener(event));
  }

  public subscribe(listener: (event: TelemetryEvent) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const TelemetryBus = new TelemetryBusClass();