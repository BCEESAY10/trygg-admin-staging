import Swal from 'sweetalert2';

import type { SweetAlertProps } from '@/types/index';

export const showAlert = ({
  title,
  text,
  icon,
  confirmButtonText = 'OK',
  cancelButtonText = 'Cancel',
  showCancelButton = false,
  onConfirm,
  onCancel,
  ...rest
}: SweetAlertProps) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      popup: 'swal-compact-popup',
      title: 'swal-compact-title',
      confirmButton: `swal-confirm-button swal-${icon}-button`,
      cancelButton: 'swal-cancel-button',
    },
    ...rest,
  }).then(result => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    } else if (result.isDismissed && onCancel) {
      onCancel();
    }
  });
};

type CustomAlertType = {
  title: string;
  text: string;
  confirmButtonText: string;
  cancelButtonText: string;
  iconType?: 'success' | 'error' | 'warning' | 'info' | 'question';
  onConfirm?: () => void;
  buttonsStyling?: boolean;
};

export const confirmationAlert = ({
  title,
  text,
  confirmButtonText,
  cancelButtonText,
  iconType = 'question',
  onConfirm,
  buttonsStyling = true,
}: CustomAlertType) => {
  Swal.fire({
    title,
    text,
    icon: iconType,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    buttonsStyling,
    customClass: {
      popup: 'swal-warning-popup swal-compact-popup',
      title: 'swal-warning-title swal-compact-title',
      confirmButton: 'swal-warning-confirm-button swal-compact-confirm-button',
      cancelButton: 'swal-error-confirm-button sawl-compact-button',
    },
    preConfirm: onConfirm,
  });
};
