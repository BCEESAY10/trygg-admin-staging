import { io } from 'socket.io-client';

import type { DriverLocationData } from '@/types/driver';

// eslint-disable-next-line no-duplicate-imports
import type { Socket } from 'socket.io-client';

class AdminSocketService {
  private socket: Socket | null = null;
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io('https://trygg.staging.nga.gm/', {
        auth: { token: this.token },
        transports: ['websocket', 'polling'],
        timeout: 10000,
      });

      this.socket.on('connect', () => {
        console.log('Connected to admin socket');
        resolve();
      });

      this.socket.on('connect_error', error => {
        console.error('Socket connection failed');
        reject(error);
      });
    });
  }

  requestOnlineDrivers() {
    this.socket?.emit('admin:get_online_drivers');
  }

  onOnlineDrivers(
    callback: (data: { drivers: DriverLocationData[]; count: number }) => void
  ) {
    this.socket?.on('admin:online_drivers', callback);
  }

  onDriverLocationUpdate(callback: (data: DriverLocationData) => void) {
    this.socket?.on('driver:location_update', callback);
  }

  onDriverOffline(callback: (data: { driverId: string }) => void) {
    this.socket?.on('driver:offline', callback);
  }

  onError(callback: (error: any) => void) {
    this.socket?.on('connect_error', callback);
    this.socket?.on('disconnect', reason => {
      callback({ message: `Socket disconnected: ${reason}` });
    });
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

export default AdminSocketService;
