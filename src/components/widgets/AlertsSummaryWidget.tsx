import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/widgets/AlertsSummary.module.css';
import type { AlertsSummaryWidgetProps } from '@/types/interfaces/widgets';

const AlertsSummaryWidget = ({ data }: AlertsSummaryWidgetProps) => {
  const { t } = useTranslation('translation');
  return (
    <div className={styles.widget}>
      {/*==================== Header ====================*/}
      <div className={styles.header}>
        <h3 className={styles.title}>{t('dashboard.documentAlert')}</h3>
        <AlertTriangle size={20} color="#fbbf24" />
      </div>
      {/*==================== End of Header ====================*/}

      {/*==================== Content ====================*/}
      <div className={styles.content}>
        <div className={styles.main__stat}>
          <span className={styles.count}>{data.documentsExpiringSoon}</span>
          <span className={styles.label}>{t('dashboard.expiringSoon')}</span>
        </div>

        <div className={styles.breakdown}>
          <div className={styles.breakdown__item}>
            <div className={styles.indicator__critical} />
            <span className={styles.breakdown__text}>
              {data.sevenDaysToExpiry} {t('dashboard.critical')} (≤7{' '}
              {t('dashboard.days')})
            </span>
          </div>

          <div className={styles.breakdown__item}>
            <div className={styles.indicator__warning} />
            <span className={styles.breakdown__text}>
              {data.remainingThirtyDaysToExpiry} {t('dashboard.warning')} (≤30{' '}
              {t('dashboard.days')})
            </span>
          </div>
        </div>
      </div>
      {/*==================== End of Content ====================*/}
    </div>
  );
};

export default AlertsSummaryWidget;
