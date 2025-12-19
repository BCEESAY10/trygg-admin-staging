import { useState } from 'react';

import Image from 'next/image';

import { X, Eye, EyeOff } from 'lucide-react';

import styles from '@/src/styles/modals/SubAdminModal.module.css';

const SubAdminDetailsModal = ({ isOpen, onClose, admin }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen || !admin) return null;

  const formatDateTime = (dateTime: string) => {
    return `${new Date(dateTime).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })} at ${new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })}`;
  };

  return (
    <>
      {/*==================== Modal Backdrop ====================*/}
      <div className={styles.backdrop} onClick={onClose}>
        {/*==================== Modal Container ====================*/}
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          {/*==================== Modal Header ====================*/}
          <div className={styles.header}>
            <h2 className={styles.title}>Admin Details</h2>
            <button onClick={onClose} className={styles.close__button}>
              <X size={20} color="#6b7280" />
            </button>
          </div>
          {/*==================== End of Modal Header ====================*/}

          {/*==================== Modal Content ====================*/}
          <div className={styles.content}>
            {/*==================== Admin Profile Section ====================*/}
            <div className={styles.profile__section}>
              <div className={styles.avatar__wrapper}>
                <Image
                  width={80}
                  height={80}
                  src={admin.avatar}
                  alt={admin.fullName}
                  className={styles.avatar__image}
                />
              </div>
              <h3 className={styles.admin__name}>{admin.fullName}</h3>
            </div>
            {/*==================== End of Admin Profile Section ====================*/}

            {/*==================== Admin Info Fields ====================*/}
            <div className={styles.info__fields}>
              {/*==================== Email and Password Row ====================*/}
              <div className={styles.email__password__row}>
                {/*==================== Email Field ====================*/}
                <div className={styles.field__group}>
                  <label className={styles.field__label}>Email</label>
                  <div className={styles.field__value}>{admin.email}</div>
                </div>
                {/*==================== End of Email Field ====================*/}

                {/*==================== Password Field ====================*/}
                <div className={styles.field__group}>
                  <label className={styles.field__label}>Password</label>
                  <div className={styles.password__container}>
                    <span className={styles.field__value}>
                      {showPassword ? 'rgt$sas' : '••••••••'}
                    </span>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className={styles.password__toggle}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                {/*==================== End of Password Field ====================*/}
              </div>
              {/*==================== End of Email and Password Row ====================*/}

              {/*==================== Created Date Section ====================*/}
              <div className={styles.created__date__section}>
                <label className={styles.created__date__label}>
                  Created Date
                </label>
                <div className={styles.created__date__value}>
                  {formatDateTime(admin.createdAt)}
                </div>
              </div>
              {/*==================== End of Created Date Section ====================*/}
            </div>
            {/*==================== End of Admin Info Fields ====================*/}
          </div>
          {/*==================== End of Modal Content ====================*/}
        </div>
        {/*==================== End of Modal Container ====================*/}
      </div>
      {/*==================== End of Modal Backdrop ====================*/}
    </>
  );
};

export default SubAdminDetailsModal;
