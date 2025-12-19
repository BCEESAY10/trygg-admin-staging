import { UserCheck, Clock, UserX, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/widgets/DriverApplicationStats.module.css';
import type { DriverApplicationStatsWidgetProps } from '@/types/interfaces/widgets';

const DriverApplicationStatsWidget = ({
  data,
}: DriverApplicationStatsWidgetProps) => {
  const { t } = useTranslation('translation');
  return (
    <div className={styles.widget}>
      {/*==================== Header ====================*/}
      <div className={styles.header}>
        <h3 className={styles.title}>{t('dashboard.driverApplications')}</h3>
        <Users size={20} color="#fbbf24" />
      </div>
      {/*==================== End of Header ====================*/}

      {/*==================== Content ====================*/}
      <div className={styles.content}>
        <div className={styles.main__stat}>
          <span className={styles.count}>{data.totalApplications}</span>
          <span className={styles.label}>
            {t('dashboard.totalApplications')}
          </span>
        </div>

        <div className={styles.breakdown}>
          <div className={styles.breakdown__item}>
            <div className={styles.stat__section}>
              <UserCheck size={16} color="#059669" />
              <span className={styles.stat__count}>{data.approved}</span>
            </div>
            <span className={styles.breakdown__text}>
              {t('dashboard.approved')}
            </span>
          </div>

          <div className={styles.breakdown__item}>
            <div className={styles.stat__section}>
              <Clock size={16} color="#f59e0b" />
              <span className={styles.stat__count}>{data.pending}</span>
            </div>
            <span className={styles.breakdown__text}>
              {t('dashboard.pending')}
            </span>
          </div>

          <div className={styles.breakdown__item}>
            <div className={styles.stat__section}>
              <UserX size={16} color="#dc2626" />
              <span className={styles.stat__count}>{data.rejected}</span>
            </div>
            <span className={styles.breakdown__text}>
              {t('dashboard.rejected')}
            </span>
          </div>
        </div>
      </div>
      {/*==================== End of Content ====================*/}
    </div>
  );
};

export default DriverApplicationStatsWidget;
