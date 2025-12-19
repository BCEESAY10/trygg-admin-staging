import { PauseCircle, PlayCircle } from 'lucide-react';

import Modal from '@/src/components/ui/Modal';
import styles from '@/src/styles/modals/DynamicConfirmModal.module.css';
import type { DynamicAdminConfirmModalProps } from '@/types/interfaces/sub-admin';

const DynamicAdminConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  actionState,
}: DynamicAdminConfirmModalProps) => {
  if (!actionState) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const isSuspend = actionState.actionType === 'SUSPEND';
  const title = isSuspend ? 'Suspend Sub Admin' : 'Activate Sub Admin';
  const icon = isSuspend ? (
    <PauseCircle size={48} color="#fbbf24" />
  ) : (
    <PlayCircle size={48} color="#059669" />
  );
  const confirmText = isSuspend ? 'Yes, Suspend' : 'Yes, Activate';
  const cancelText = isSuspend ? 'No, Keep Active' : 'No, Keep Suspended';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="28rem">
      <div className={styles.content}>
        {/*==================== Icon Section ====================*/}
        <div className={styles.icon__section}>{icon}</div>
        {/*==================== End of Icon Section ====================*/}

        {/*==================== Message Section ====================*/}
        <div className={styles.message__section}>
          <p className={styles.message}>
            Are you sure you want to {isSuspend ? 'suspend' : 'activate'}{' '}
            <strong>{actionState.fullName}</strong> ({actionState.email})?
          </p>
        </div>
        {/*==================== End of Message Section ====================*/}

        {/*==================== Action Buttons ====================*/}
        <div className={styles.action__buttons}>
          <button onClick={onClose} className={styles.cancel__button}>
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={
              isSuspend ? styles.confirm__button : styles.activate__button
            }
          >
            {confirmText}
          </button>
        </div>
        {/*==================== End of Action Buttons ====================*/}
      </div>
    </Modal>
  );
};

export default DynamicAdminConfirmModal;
