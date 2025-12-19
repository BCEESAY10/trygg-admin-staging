import React from 'react';

import { WifiOff, RefreshCw } from 'lucide-react';

import styles from '@/src/styles/ErrorState.module.css';

interface ErrorStateProps {
  title?: string;
  message?: any;
  onRetry?: () => void;
  retryLabel?: string;
  showRetryButton?: boolean;
}

const ErrorState = ({
  title = 'Unable to Load Data',
  message = "We're having trouble connecting to our servers. Please check your internet connection and try again.",
  onRetry,
  retryLabel = 'Try Again',
  showRetryButton = true,
}: ErrorStateProps) => {
  return (
    <div className={styles.error__container}>
      {/*==================== Error Content ====================*/}
      <div className={styles.error__content}>
        {/*==================== Icon Section ====================*/}
        <div className={styles.icon__wrapper}>
          <WifiOff size={48} className={styles.error__icon} />
        </div>
        {/*==================== End of Icon Section ====================*/}

        {/*==================== Text Section ====================*/}
        <div className={styles.text__section}>
          <h2 className={styles.error__title}>{title}</h2>
          <p className={styles.error__message}>{message}</p>
        </div>
        {/*==================== End of Text Section ====================*/}

        {/*==================== Action Section ====================*/}
        {showRetryButton && onRetry && (
          <div className={styles.action__section}>
            <button
              onClick={onRetry}
              className={styles.retry__button}
              type="button"
            >
              <RefreshCw size={16} />
              {retryLabel}
            </button>
          </div>
        )}
        {/*==================== End of Action Section ====================*/}
      </div>
      {/*==================== End of Error Content ====================*/}
    </div>
  );
};

export default ErrorState;
