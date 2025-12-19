import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/sub-admin/SubAdminForm.module.css';
import type {
  AdminFormProps,
  AdminFormData,
} from '@/types/interfaces/sub-admin';
import { FormattedImage } from '@/utils/safe-image';

const AdminForm = ({
  onCreateAdmin,
  onEditAdmin,
  editData,
}: AdminFormProps) => {
  const { t } = useTranslation('translation');
  const [formData, setFormData] = useState<AdminFormData>({
    fullName: '',
    email: '',
    phone: '',
    avatar: '/user-placeholder.avif',
    role: '',
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        fullName: editData.fullName || '',
        email: editData.email || '',
        phone: editData.phone || '',
        role: editData.role || '',
      });
    }
  }, [editData]);

  const handleInputChange = (field: keyof AdminFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error(t('admins.alert'));
      return;
    }

    try {
      if (editData) {
        await onEditAdmin?.(formData);
      } else {
        await onCreateAdmin?.(formData);
      }

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        avatar: '/user-placeholder.avif',
        role: '',
      });
    } catch (err: any) {
      const message = err?.response.data.message ?? t('admins.error');
      toast.error(message);
    }
  };

  return (
    <div className={styles.form__container}>
      {/*==================== Header ====================*/}
      <h2 className={styles.form__title}>
        {editData ? t('admins.editAdmin') : t('admins.createAdmin')}
      </h2>
      {/*==================== End of Header ====================*/}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/*==================== Avatar Upload ====================*/}
        <div className={styles.avatar__section}>
          <div className={styles.avatar__wrapper}>
            <FormattedImage
              width={80}
              height={80}
              src={formData.avatar}
              alt="Admin Avatar"
              className={styles.avatar__image}
            />
          </div>
        </div>
        {/*==================== End of Avatar Upload ====================*/}

        {/*==================== Form Fields ====================*/}
        <div className={styles.form__fields}>
          {/*==================== Full Name ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>
              {t('admins.fullName')}
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={e => handleInputChange('fullName', e.target.value)}
              placeholder="John Migurdia"
              className={styles.field__input}
            />
          </div>
          {/*==================== End of Full Name ====================*/}

          {/*==================== Email ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>{t('admins.email')}</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              placeholder="example@gmail.com"
              className={styles.field__input}
            />
          </div>
          {/*==================== End of Email ====================*/}

          {/*==================== Phone Number ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>{t('admins.phone')}</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              placeholder="+46 70 123 45 67"
              className={styles.field__input}
            />
          </div>
          {/*==================== End of Phone Number ====================*/}

          {/*==================== Role ====================*/}
          <div className={styles.field__group}>
            <label className={styles.field__label}>{t('admins.role')}</label>
            <select
              value={formData.role}
              onChange={e => handleInputChange('role', e.target.value)}
              className={styles.field__input}
            >
              <option value="">{t('admins.selectRole')}</option>
              <option value="SUB">{t('admins.sub')}</option>
              <option value="SUPER">{t('admins.super')}</option>
            </select>
          </div>
          {/*==================== End of Role ====================*/}
        </div>
        {/*==================== End of Form Fields ====================*/}

        {/*==================== Submit Button ====================*/}
        <button
          type="submit"
          disabled={!formData.role}
          className={styles.submit__button}
        >
          {editData ? t('admins.editAdmin') : t('admins.createAdmin')}
        </button>
        {/*==================== End of Submit Button ====================*/}
      </form>
    </div>
  );
};

export default AdminForm;
