export const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'aktiv':
    case 'approved':
    case 'godkänd':
    case 'accepted':
    case 'completed':
    case 'slutförd':
      return {
        color: '#166534',
        background: '#dcfce7',
      };

    case 'inactive':
    case 'inaktiv':
    case 'pending':
    case 'väntande':
    case 'pending approval':
      return {
        color: '#ea580c',
        background: '#ffedd5',
      };

    case 'suspended':
    case 'avstängd':
    case 'rejected':
    case 'Avvisad':
    case 'cancelled':
    case 'avbruten':
      return {
        color: '#991b1b',
        background: '#fee2e2',
      };

    default:
      return {
        color: '#6b7280',
        background: '#f3f4f6',
      };
  }
};
