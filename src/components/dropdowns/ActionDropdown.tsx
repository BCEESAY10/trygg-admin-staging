import { useState } from 'react';

import { MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/Dropdown.module.css';
import type { ActionDropdownProps } from '@/types/interfaces/sub-admin';

import Dropdown from '../ui/Dropdown';

const ActionDropdown = ({
  status,
  onStatusChange,
  onEdit,
}: ActionDropdownProps) => {
  const { t } = useTranslation('translation');
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  const handleAction = (action: () => void) => {
    action();
    handleClose();
  };

  const actionText =
    status === 'ACTIVE' ? t('admins.suspend') : t('admins.activate');
  const actionStyle =
    status === 'ACTIVE'
      ? `${styles.menu__item} ${styles.delete__item}`
      : `${styles.menu__item} ${styles.activate__item}`;

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
      {/*==================== Status Change Option ====================*/}
      <button
        onClick={() => handleAction(onEdit)}
        className={styles.menu__item}
      >
        {t('admins.edit')}
      </button>
      <button
        onClick={() => handleAction(onStatusChange)}
        className={actionStyle}
      >
        {actionText}
      </button>
      {/*==================== End of Status Change Option ====================*/}
    </Dropdown>
  );
};

export default ActionDropdown;
