import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/categories/CategoryFilters.module.css';
import type { RideCategoriesFilterProps } from '@/types/interfaces/ride-categories';

const CategoriesFilters = ({
  filters,
  onFilterChange,
}: RideCategoriesFilterProps) => {
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
      </div>
    </div>
  );
};

export default CategoriesFilters;
