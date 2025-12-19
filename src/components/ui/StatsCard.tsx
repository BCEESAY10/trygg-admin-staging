import * as Icons from 'lucide-react';

import { TAppColors } from '@/constants/colors';
import styles from '@/src/styles/StatsCard.module.css';
import type { StatsCardProps } from '@/types/interfaces/admin-layout';

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  const IconComponent = Icons[
    icon as keyof typeof Icons
  ] as React.ComponentType<{ size: number; color: string }>;

  return (
    <div className={styles.card}>
      {/*==================== Icon Section ====================*/}
      <div className={styles.icon__wrapper}>
        <IconComponent size={24} color={TAppColors.primaryColor} />
      </div>
      {/*==================== End of Icon Section ====================*/}

      {/*==================== Content Section ====================*/}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value}>{value}</p>
      </div>
      {/*==================== End of Content Section ====================*/}
    </div>
  );
};

export default StatsCard;
