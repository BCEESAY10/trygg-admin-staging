import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/ride-history/RideFilters.module.css';
import type { RideFiltersProps } from '@/types/interfaces/rides';

const RideFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
}: RideFiltersProps) => {
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
            <option value="COMPLETED">{t('filters.completed')}</option>
            <option value="REQUESTED">{t('filters.requested')}</option>
            <option value="CANCELLED_BY_USER">
              {t('filters.cancelledByUser')}
            </option>
            <option value="CANCELLED_BY_DRIVER">
              {t('filters.cancelledByDriver')}
            </option>
            <option value="ARRIVED">{t('filters.arrived')}</option>
            <option value="IN_PROGRESS">{t('filters.inProgress')}</option>
            <option value="MATCHING">{t('filters.matching')}</option>
          </select>

          <div className={styles.date__wrapper}>
            <input
              type="date"
              placeholder="From Date"
              value={filters.dateFrom}
              className={styles.date__input}
              onChange={e => onFilterChange('dateFrom', e.target.value)}
            />
          </div>

          <div className={styles.date__wrapper}>
            <input
              type="date"
              value={filters.dateTo}
              onChange={e => onFilterChange('dateTo', e.target.value)}
              className={styles.date__input}
              placeholder="To Date"
            />
          </div>

          <button onClick={onResetFilters} className={styles.reset__button}>
            {t('filters.resetFilters')}
          </button>
        </div>
        {/*==================== End of Filter Dropdowns ====================*/}
      </div>
    </div>
  );
};

export default RideFilters;
