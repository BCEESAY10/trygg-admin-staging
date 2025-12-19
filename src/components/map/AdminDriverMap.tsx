'use client';

import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import { useAdminSocket } from '@/hooks/useAdminSocket';
import styles from '@/src/styles/Map.module.css';

import ErrorState from '../ui/ErrorState';

import DriverMap from './DriverMap';

const AdminDriverMap = () => {
  const { t } = useTranslation('translation');
  const cookieData = Cookies.get(STORAGE_KEYS.AUTH_COOKIE);
  const parsed = JSON.parse(cookieData ?? '{}');
  const { token } = parsed;
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  const { drivers, isConnected, error } = useAdminSocket(token);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (navigator.onLine) {
      window.location.reload();
      setIsOnline(true);
    } else {
      toast.error(t('dashboard.retryError'));
    }
  };

  let errorContent = null;

  if (error) {
    errorContent = (
      <ErrorState
        title={t('dashboard.noInternet')}
        message={t('dashboard.noInternetMessage')}
        onRetry={handleRetry}
        retryLabel={t('modal.retry')}
      />
    );
  } else if (!isOnline) {
    errorContent = (
      <ErrorState
        title={t('modal.errorTitle')}
        message={error}
        onRetry={() => window.location.reload()}
        retryLabel={t('modal.retry')}
      />
    );
  }

  return (
    <div>
      <h2 className={styles.title}>
        <span>{t('dashboard.liveDriver')}</span>
        {drivers.length === 0 ? (
          <p className={styles.gray}>{t('dashboard.noDrivers')}</p>
        ) : (
          <>
            {' '}
            {t('dashboard.onlineDrivers')}: {drivers.length}{' '}
          </>
        )}
        <span>
          Status:{' '}
          <span className={isConnected ? styles.green : styles.red}>
            {isConnected
              ? t('dashboard.connected')
              : t('dashboard.disconnected')}
          </span>
        </span>
      </h2>
      {errorContent ?? <DriverMap drivers={drivers} />}
    </div>
  );
};

export default AdminDriverMap;
