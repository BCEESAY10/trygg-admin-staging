import toast from 'react-hot-toast';

export const showToast = (
  type: 'success' | 'error' | 'warning' | 'info',
  title: string,
  message?: string
) => {
  const content = message ? `${title}: ${message}` : title;

  switch (type) {
    case 'success':
      return toast.success(content);
    case 'error':
      return toast.error(content);
    default:
      return toast(content);
  }
};
