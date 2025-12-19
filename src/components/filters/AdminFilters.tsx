import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/sub-admin/AdminFilters.module.css';
import type { AdminFiltersProps } from '@/types/interfaces/sub-admin';

const AdminFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
}: AdminFiltersProps) => {
  const { t } = useTranslation('translation');
  return (
    <div className={styles.filters__section}>
      <div className={styles.filters__row}>
        {/*==================== Role Filter Dropdowns ====================*/}
        <div className={styles.filters__group}>
          <select
            value={filters.role}
            onChange={e => onFilterChange('role', e.target.value)}
            className={styles.filter__select}
          >
            <option value="">{t('admins.allAdmins')}</option>
            <option value="SUPER">{t('admins.supers')}</option>
            <option value="SUB">{t('admins.subs')}</option>
          </select>

          <button onClick={onResetFilters} className={styles.reset__button}>
            {t('filters.resetFilters')}
          </button>
        </div>
        {/*==================== End of Filter Dropdowns ====================*/}
      </div>
    </div>
  );
};

export default AdminFilters;
