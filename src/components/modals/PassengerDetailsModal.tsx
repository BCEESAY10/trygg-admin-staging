import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import PassengerInfoCard from '@/src/components/shared/passengers/passenger-info-card';
import styles from '@/src/styles/modals/PassengerDetailsModal.module.css';
import type { PassengerDetailsModalProps } from '@/types/interfaces/passenger-details';

const PassengerDetailsModal = ({
  onClose,
  selectedPassengerId,
}: PassengerDetailsModalProps) => {
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
                {t('passengers.passengerDetails')}
              </h2>
            </div>
            <button onClick={onClose} className={styles.close__button}>
              <X size={20} color="#6b7280" />
            </button>
          </div>
          {/*==================== End of Modal Header ====================*/}

          {/*==================== Modal Content ====================*/}
          <div className={styles.modal__content}>
            <PassengerInfoCard selectedPassengerId={selectedPassengerId} />
          </div>
          {/*==================== End of Modal Content ====================*/}
        </div>
        {/*==================== End of Modal Container ====================*/}
      </div>
      {/*==================== End of Modal Backdrop ====================*/}
    </>
  );
};

export default PassengerDetailsModal;
