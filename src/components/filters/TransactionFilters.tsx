import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/transactions/TransactionFilters.module.css';
import type { TransactionFiltersProps } from '@/types/interfaces/transactions';

const TransactionFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
}: TransactionFiltersProps) => {
  const { t } = useTranslation('translation');
  return (
    <div className={styles.filters__section}>
      <div className={styles.filters__row}>
        {/*==================== Search Input ====================*/}
        <div className={styles.search__wrapper}>
          <Search size={20} className={styles.search__icon} />
          <input
            type="text"
            value={filters.search}
            className={styles.search__input}
            placeholder={t('filters.search')}
            onChange={e => onFilterChange('search', e.target.value)}
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
            <option value="PENDING">{t('filters.pending')}</option>
            <option value="FAILED">{t('filters.failed')}</option>
          </select>

          <select
            value={filters.paymentMethod}
            className={styles.filter__select}
            onChange={e => onFilterChange('paymentMethod', e.target.value)}
          >
            <option value="">{t('filters.payment')}</option>
            <option value="CARD">{t('filters.card')}</option>
            <option value="SWISH">Swish</option>
            <option value="GOOGLE_PAY">Google Pay</option>
            <option value="APPLE_PAY">Apple Pay</option>
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
              placeholder="To Date"
              value={filters.dateTo}
              className={styles.date__input}
              onChange={e => onFilterChange('dateTo', e.target.value)}
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

export default TransactionFilters;
