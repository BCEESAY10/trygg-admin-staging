import { useState } from 'react';

import { MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/Dropdown.module.css';
import type { RideCategory } from '@/types/interfaces/ride-categories';

import Dropdown from '../ui/Dropdown';

interface CategoryUpdateDropdownProps {
  category: RideCategory;
  onUpdate: (
    id: string,
    updates: {
      basePrice: number;
      pricePerKm: number;
      minimumFare: number;
    }
  ) => void;
}

const CategoryUpdateDropdown = ({
  category,
  onUpdate,
}: CategoryUpdateDropdownProps) => {
  const { t } = useTranslation('translation');
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    basePrice: category.basePrice,
    pricePerKm: category.pricePerKm,
    minimumFare: category.minimumFare,
  });

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => {
    setIsOpen(false);
    // Reset form data on close
    setFormData({
      basePrice: category.basePrice,
      pricePerKm: category.pricePerKm,
      minimumFare: category.minimumFare,
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    if (value === '') {
      setFormData(prev => ({ ...prev, [field]: '' as any }));
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setFormData(prev => ({ ...prev, [field]: numValue }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(category.id, formData);
    handleClose();
  };

  return (
    <Dropdown
      trigger={
        <button title="Actions" className={styles.action__button}>
          <MoreHorizontal size={18} color="#6b7280" />
        </button>
      }
      isOpen={isOpen}
      onClose={handleClose}
      onToggle={handleToggle}
    >
      <form onSubmit={handleSubmit} className={styles.update__form}>
        <div className={styles.form__header}>
          <h3 className={styles.form__title}>{category.name}</h3>
        </div>
        <div className={styles.form__group}>
          <label htmlFor="basePrice" className={styles.form__label}>
            {t('categories.basePrice')}
          </label>
          <input
            id="basePrice"
            type="number"
            step="0.01"
            min="0"
            value={formData.basePrice}
            onChange={e => handleInputChange('basePrice', e.target.value)}
            className={styles.form__input}
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="pricePerKm" className={styles.form__label}>
            {t('categories.pricePerKm')}
          </label>
          <input
            id="pricePerKm"
            type="number"
            step="0.01"
            min="0"
            value={formData.pricePerKm}
            onChange={e => handleInputChange('pricePerKm', e.target.value)}
            className={styles.form__input}
            required
          />
        </div>

        <div className={styles.form__group}>
          <label htmlFor="minimumFare" className={styles.form__label}>
            {t('categories.minimumFare')}
          </label>
          <input
            id="minimumFare"
            type="number"
            step="0.01"
            min="0"
            value={formData.minimumFare}
            onChange={e => handleInputChange('minimumFare', e.target.value)}
            className={styles.form__input}
            required
          />
        </div>

        <div className={styles.form__actions}>
          <button
            type="button"
            onClick={handleClose}
            className={`${styles.menu__item} ${styles.cancel__button}`}
          >
            {t('actions.cancel')}
          </button>
          <button
            type="submit"
            className={`${styles.menu__item} ${styles.save__button}`}
          >
            {t('actions.save')}
          </button>
        </div>
      </form>
    </Dropdown>
  );
};

export default CategoryUpdateDropdown;
