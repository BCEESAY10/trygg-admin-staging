import { X } from 'lucide-react';

import styles from '@/src/styles/modals/Modal.module.css';
import type { ModalProps } from '@/types/interfaces/modal';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '28rem',
  showCloseButton = true,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/*==================== Modal Backdrop ====================*/}
      <div className={styles.backdrop} onClick={onClose}>
        {/*==================== Modal Container ====================*/}
        <div
          className={styles.modal}
          style={{ maxWidth }}
          onClick={e => e.stopPropagation()}
        >
          {/*==================== Modal Header ====================*/}
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {showCloseButton && (
              <button onClick={onClose} className={styles.close__button}>
                <X size={20} color="#6b7280" />
              </button>
            )}
          </div>
          {/*==================== End of Modal Header ====================*/}

          {/*==================== Modal Content ====================*/}
          <div className={styles.content}>{children}</div>
          {/*==================== End of Modal Content ====================*/}
        </div>
        {/*==================== End of Modal Container ====================*/}
      </div>
      {/*==================== End of Modal Backdrop ====================*/}
    </>
  );
};

export default Modal;
