import { Server as IOServer } from 'socket.io';
import { Notifier } from '../types/notifier';

export class SocketIONotifier implements Notifier {
  private io: IOServer;

  constructor(io: IOServer) {
    this.io = io;
  }

  async notify(requesterId: string, payload: any): Promise<void> {
    this.io.to(requesterId).emit('data:processed', payload);
  }
}
