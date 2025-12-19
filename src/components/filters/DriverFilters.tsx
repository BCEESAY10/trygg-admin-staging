import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/drivers/DriverFilters.module.css';
import type { DriverFiltersProps } from '@/types/interfaces/drivers';

const DriverFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
}: DriverFiltersProps) => {
  const { t } = useTranslation('translation');
  return (
    <div className={styles.filters__section}>
      <div className={styles.filters__row}>
        {/*==================== Search Input ====================*/}
        <div className={styles.search__wrapper}>
          <Search size={20} className={styles.search__icon} />
          <input
            type="text"
            placeholder={t('filters.search')}
            value={filters.search}
            className={styles.search__input}
            onChange={e => onFilterChange('search', e.target.value)}
          />
        </div>
        {/*==================== End of Search Input ====================*/}

        {/*==================== Filter Dropdowns ====================*/}
        <div className={styles.filters__group}>
          <select
            value={filters.rating}
            onChange={e => onFilterChange('rating', e.target.value)}
            className={styles.filter__select}
          >
            <option value="">{t('drivers.ratings')}</option>
            <option value="5">5 {t('filters.stars')}</option>
            <option value="4">4+ {t('filters.stars')}</option>
            <option value="3">3+ {t('filters.stars')}</option>
            <option value="2">2+ {t('filters.stars')}</option>
            <option value="1">1+ {t('filters.stars')}</option>
          </select>

          <select
            value={filters.status}
            onChange={e => onFilterChange('status', e.target.value)}
            className={styles.filter__select}
          >
            <option value="">{t('drivers.status')}</option>
            <option value="APPROVED">{t('filters.approved')}</option>
            <option value="PENDING_APPROVAL">{t('filters.pending')}</option>
            <option value="SUSPENDED">{t('filters.suspended')}</option>
            <option value="REJECTED">{t('filters.rejected')}</option>
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

export default DriverFilters;
