import { useState } from 'react';

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/sub-admin/SubAdminForm.module.css';
import type {
  CategoryFormProps,
  CategoryFormData,
} from '@/types/interfaces/ride-categories';

const CreateCategoryForm = ({ onSubmit }: CategoryFormProps) => {
  const { t } = useTranslation('translation');
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    icon: '',
    description: '',
    basePrice: 0,
    pricePerKm: 0,
    minimumFare: 0,
    sortOrder: 0,
    active: true,
  });

  const handleInputChange = (field: keyof CategoryFormData, value: string) => {
    setFormData(prev => {
      const newState = { ...prev, [field]: value };

      if (field === 'name') {
        const formattedIconName = `${value.toLowerCase().replace(/ /g, '_')}_car`;
        newState.icon = formattedIconName;
      }

      return newState;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.basePrice) {
      toast.error(t('categories.failed'));
      return;
    }

    const dataToSend = {
      ...formData,
      basePrice: parseFloat(formData.basePrice as any),
      pricePerKm: parseFloat(formData.pricePerKm as any),
      minimumFare: parseFloat(formData.minimumFare as any),
      sortOrder: parseFloat(formData.sortOrder as any),
    };

    onSubmit(dataToSend);

    setFormData({
      name: '',
      icon: '',
      description: '',
      basePrice: 0,
      pricePerKm: 0,
      minimumFare: 0,
      sortOrder: 0,
      active: true,
    });
  };

  return (
    <div className={styles.form__container}>
      {/*==================== Header ====================*/}
      <h2 className={styles.form__title}>{t('categories.createCategory')}</h2>
      {/*==================== End of Header ====================*/}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/*==================== Form Fields ====================*/}
        <div className={styles.form__fields}>
          {/*==================== Name ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>
              {t('categories.name')}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              placeholder={t('categories.namePlaceholder')}
              className={styles.field__input}
            />
          </div>
          {/*==================== End of Name ====================*/}

          {/*==================== Description ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>
              {t('categories.description')}
            </label>
            <input
              type="description"
              value={formData.description}
              onChange={e => handleInputChange('description', e.target.value)}
              placeholder={t('categories.descPlaceholder')}
              className={styles.field__input}
            />
          </div>
          {/*==================== End of Description ====================*/}

          {/*==================== Base Price ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>
              {t('categories.basePrice')}
            </label>
            <input
              type="number"
              value={formData.basePrice}
              onChange={e => handleInputChange('basePrice', e.target.value)}
              placeholder="5"
              className={styles.field__input}
            />
          </div>
          {/*==================== End of Base Price ====================*/}

          {/*==================== Price Per Km ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>
              {t('categories.pricePerKm')}
            </label>
            <input
              type="number"
              value={formData.pricePerKm}
              onChange={e => handleInputChange('pricePerKm', e.target.value)}
              placeholder="10"
              className={styles.field__input}
            />
          </div>
          {/*==================== End of Price Per Km ====================*/}

          {/*==================== Minimum Fare ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>
              {t('categories.minimumFare')}
            </label>
            <input
              type="number"
              value={formData.minimumFare}
              onChange={e => handleInputChange('minimumFare', e.target.value)}
              placeholder="10"
              className={styles.field__input}
            />
          </div>
          {/*==================== End of Minimum Fare ====================*/}

          {/*==================== Sort Order ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>
              {t('categories.sortOrder')}
            </label>
            <input
              type="number"
              value={formData.sortOrder}
              onChange={e => handleInputChange('sortOrder', e.target.value)}
              placeholder="1"
              className={styles.field__input}
            />
          </div>
          {/*==================== End of Sort Order ====================*/}
        </div>
        {/*==================== End of Form Fields ====================*/}

        {/*==================== Submit Button ====================*/}
        <button type="submit" className={styles.submit__button}>
          {t('categories.createCategory')}
        </button>
        {/*==================== End of Submit Button ====================*/}
      </form>
    </div>
  );
};

export default CreateCategoryForm;
