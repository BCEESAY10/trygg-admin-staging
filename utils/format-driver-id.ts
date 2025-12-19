export const getFormattedDriverId = (uuid: string): string => {
  const digits = uuid.replace(/\D/g, '').slice(0, 3);
  return `DRI${digits.padStart(3, '0')}`;
};

export const getFormattedPassengerId = (uuid: string): string => {
  const digits = uuid.replace(/\D/g, '').slice(0, 3);
  return `PAS${digits.padStart(3, '0')}`;
};

export function formatDate(isoString: string): string {
  if (!isoString) return '';

  const date = new Date(isoString);
  const lang = localStorage.getItem('language') ?? 'en';

  return date.toLocaleDateString(lang, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
