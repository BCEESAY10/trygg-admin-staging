import { Trash2 } from 'lucide-react';

import Modal from '@/src/components/ui/Modal';
import styles from '@/src/styles/modals/DeleteConfirmModal.module.css';
import type { DeleteConfirmModalProps } from '@/types/interfaces/modal';

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Yes, Delete',
  cancelText = 'No, Keep',
  icon,
}: DeleteConfirmModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="24rem">
      <div className={styles.content}>
        {/*==================== Icon Section ====================*/}
        <div className={styles.icon__section}>
          {icon ?? <Trash2 size={48} color="#fbbf24" />}
        </div>
        {/*==================== End of Icon Section ====================*/}

        {/*==================== Message Section ====================*/}
        <div className={styles.message__section}>
          <p className={styles.message}>{message}</p>
        </div>
        {/*==================== End of Message Section ====================*/}

        {/*==================== Action Buttons ====================*/}
        <div className={styles.action__buttons}>
          <button onClick={onClose} className={styles.cancel__button}>
            {cancelText}
          </button>
          <button onClick={handleConfirm} className={styles.confirm__button}>
            {confirmText}
          </button>
        </div>
        {/*==================== End of Action Buttons ====================*/}
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
