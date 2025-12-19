import { getStatusStyles } from '@/utils/status';

const StatusBadge = ({ status }: { status: string }) => {
  const styles = getStatusStyles(status);

  return (
    <span
      style={{
        ...styles,
        fontSize: '0.75rem',
        fontWeight: '500',
        padding: '0.25rem 0.75rem',
        borderRadius: '0.25rem',
        textTransform: 'uppercase',
        letterSpacing: '0.025em',
        display: 'inline-block',
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
