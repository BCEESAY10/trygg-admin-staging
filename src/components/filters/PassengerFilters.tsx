import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/passengers/PassengerFilters.module.css';
import type { PassengerFiltersProps } from '@/types/interfaces/passengers';

const PassengerFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
}: PassengerFiltersProps) => {
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
            onChange={e => onFilterChange('search', e.target.value)}
            className={styles.search__input}
          />
        </div>
        {/*==================== End of Search Input ====================*/}

        {/*==================== Filter Dropdowns ====================*/}
        <div className={styles.filters__group}>
          <select
            value={filters.status}
            onChange={e => onFilterChange('status', e.target.value)}
            className={styles.filter__select}
          >
            <option value="">{t('drivers.status')}</option>
            <option value="ACTIVE">{t('filters.active')}</option>
            <option value="INACTIVE">{t('filters.inactive')}</option>
            <option value="SUSPENDED">{t('filters.suspended')}</option>
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

export default PassengerFilters;
