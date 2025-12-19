import { Star, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/widgets/TopDriver.module.css';
import type { TopDriverWidgetProps } from '@/types/interfaces/widgets';
import SafeImage from '@/utils/safe-image';

const TopDriverWidget = ({ data }: TopDriverWidgetProps) => {
  const { t } = useTranslation('translation');
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />);
    }

    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} color="#e5e7eb" />);
    }

    return stars;
  };

  return (
    <div className={styles.widget}>
      {/*==================== Header ====================*/}
      <div className={styles.header}>
        <h3 className={styles.title}>{t('dashboard.topDriver')}</h3>
        <Crown size={20} color="#fbbf24" />
      </div>
      {/*==================== End of Header ====================*/}

      {/*==================== Content ====================*/}
      <div className={styles.content}>
        <div className={styles.driver}>
          <div className={styles.avatar__section}>
            <div className={styles.avatar__wrapper}>
              <SafeImage
                width={60}
                height={60}
                alt={data.name}
                src={data.profilePicture}
                className={styles.avatar__image}
              />
              <div className={styles.crown__badge}>
                <Crown size={16} color="#fbbf24" fill="#fbbf24" />
              </div>
            </div>
          </div>

          <div className={styles.name}>{data.name}</div>

          <div className={styles.rating__section}>
            <div className={styles.stars}>
              {renderStars(data.averageRating)}
            </div>
            <span className={styles.rating__value}>{data.averageRating}</span>
          </div>

          <div className={styles.rides__info}>
            <span className={styles.rides__count}>{data.ridesCompleted}</span>
            <span className={styles.rides__label}>
              {t('dashboard.ridesCompleted')}
            </span>
          </div>
        </div>

        {/* <div className={styles.view__all}>
          <span>View all rankings →</span>
        </div> */}
      </div>
      {/*==================== End of Content ====================*/}
    </div>
  );
};

export default TopDriverWidget;
