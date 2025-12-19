import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import DriverInfoCard from '@/src/components/shared/drivers/DriverInfoCard';
import styles from '@/src/styles/modals/DriverDetailsModal.module.css';
import type { DriverDetailsModalProps } from '@/types/interfaces/driver-details';

const DriverDetailsModal = ({
  onClose,
  selectedDriverId,
}: DriverDetailsModalProps) => {
  const { t } = useTranslation('translation');
  return (
    <>
      {/*==================== Modal Backdrop ====================*/}
      <div className={styles.backdrop} onClick={onClose}>
        {/*==================== Modal Container ====================*/}
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          {/*==================== Modal Header ====================*/}
          <div className={styles.modal__header}>
            <div className={styles.header__left}>
              <h2 className={styles.modal__title}>
                {t('drivers.driverDetails')}
              </h2>
            </div>
            <button onClick={onClose} className={styles.close__button}>
              <X size={20} color="#6b7280" />
            </button>
          </div>
          {/*==================== End of Modal Header ====================*/}

          {/*==================== Modal Content ====================*/}
          <div className={styles.modal__content}>
            <DriverInfoCard selectedDriverId={selectedDriverId} />
          </div>
          {/*==================== End of Modal Content ====================*/}
        </div>
        {/*==================== End of Modal Container ====================*/}
      </div>
      {/*==================== End of Modal Backdrop ====================*/}
    </>
  );
};

export default DriverDetailsModal;
