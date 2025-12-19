import { useRef, useEffect } from 'react';

import styles from '@/src/styles/Dropdown.module.css';
import type { DropdownProps } from '@/types/interfaces/modal';

const Dropdown = ({
  trigger,
  children,
  isOpen,
  onToggle,
  onClose,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {/*==================== Trigger Button ====================*/}
      <div onClick={onToggle} className={styles.trigger}>
        {trigger}
      </div>
      {/*==================== End of Trigger Button ====================*/}

      {/*==================== Dropdown Menu ====================*/}
      {isOpen && <div className={styles.menu}>{children}</div>}
      {/*==================== End of Dropdown Menu ====================*/}
    </div>
  );
};

export default Dropdown;
