export interface Notifier {
  notify(requesterId: string, payload: any): Promise<void>;
}
