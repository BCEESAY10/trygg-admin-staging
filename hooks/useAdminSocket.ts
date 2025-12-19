import { useEffect, useState } from 'react';

import type { DriverLocationData } from '@/types/driver';
import AdminSocketService from '@/utils/socketService';

export const useAdminSocket = (token: string) => {
  const [socketService, setSocketService] = useState<AdminSocketService | null>(
    null
  );
  const [drivers, setDrivers] = useState<DriverLocationData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const service = new AdminSocketService(token);

    const connectSocket = async () => {
      try {
        await service.connect();
        setIsConnected(true);

        // Events
        service.onOnlineDrivers(data => {
          setDrivers(data.drivers || []);
        });
        service.onDriverLocationUpdate(driverData => {
          setDrivers(prev => {
            const idx = prev.findIndex(d => d.driverId === driverData.driverId);
            if (idx >= 0) {
              const updated = [...prev];
              updated[idx] = driverData;
              return updated;
            }
            return [...prev, driverData];
          });
        });
        service.onDriverOffline(data => {
          setDrivers(prev => prev.filter(d => d.driverId !== data.driverId));
        });

        // Listen for socket errors/disconnects
        service.onError(err => {
          setError(err?.message ?? 'Socket connection lost');
          setIsConnected(false);
        });

        // Request initial data
        service.requestOnlineDrivers();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to connect to server';

        setIsConnected(false);
        setError(errorMessage);
      }
    };

    connectSocket();
    setSocketService(service);

    return () => {
      service.disconnect();
    };
  }, [token]);

  return { drivers, isConnected, socketService, error };
};
