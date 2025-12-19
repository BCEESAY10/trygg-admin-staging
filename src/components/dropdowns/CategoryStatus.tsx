import { useState } from 'react';

import { MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/Dropdown.module.css';
import type { CategoryToggleProps } from '@/types/interfaces/ride-categories';

import Dropdown from '../ui/Dropdown';

const CategoryToggleDropdown = ({ active, onToggle }: CategoryToggleProps) => {
  const { t } = useTranslation('translation');
  const [isOpen, setIsOpen] = useState(false);

  // === Diasble opening the pop up until when Admin is allowed to update category status ===
  // const handleToggle = () => setIsOpen(!isOpen);
  const handleToggle = () => setIsOpen(false);
  const handleClose = () => setIsOpen(false);

  const handleAction = () => {
    onToggle(!active);
    handleClose();
  };

  const actionText = active
    ? t('categories.deactivate')
    : t('categories.activate');
  const actionStyle = active
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
      <button onClick={handleAction} className={actionStyle}>
        {actionText}
      </button>
    </Dropdown>
  );
};

export default CategoryToggleDropdown;
