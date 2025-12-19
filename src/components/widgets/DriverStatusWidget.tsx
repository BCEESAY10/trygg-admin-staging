import { Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/widgets/DriverStatus.module.css';
import type { DriverStatusWidgetProps } from '@/types/interfaces/widgets';

const DriverStatusWidget = ({ data }: DriverStatusWidgetProps) => {
  const { t } = useTranslation('translation');
  return (
    <div className={styles.widget}>
      {/*==================== Header ====================*/}
      <div className={styles.header}>
        <h3 className={styles.title}>{t('dashboard.driverStatus')}</h3>
        <Users size={20} color="#fbbf24" />
      </div>
      {/*==================== End of Header ====================*/}

      {/*==================== Content ====================*/}
      <div className={styles.content}>
        <div className={styles.main__stat}>
          <span className={styles.count}>{data.offline}</span>
          <span className={styles.label}>{t('dashboard.driversOffline')}</span>
        </div>
      </div>
      {/*==================== End of Content ====================*/}
    </div>
  );
};

export default DriverStatusWidget;
