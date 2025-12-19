import { useState } from 'react';

import { Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import ErrorState from '@/components/ui/ErrorState';
import { useDebounce } from '@/hooks/useDebounce';
import { useFetchAllPassengers } from '@/hooks/useFetchPassengerQuery';
import { usePassengerStats } from '@/hooks/usePassengerStats';
import PassengerFilters from '@/src/components/filters/PassengerFilters';
import PassengerDetailsModal from '@/src/components/modals/PassengerDetailsModal';
import StatusBadge from '@/src/components/shared/status';
import ListTable from '@/src/components/ui/ListTable';
import StatsCard from '@/src/components/ui/StatsCard';
import styles from '@/src/styles/passengers/PassengersPage.module.css';
import type { TableColumn } from '@/types/interfaces/admin-layout';
import type {
  Passenger,
  PassengersFilterState,
} from '@/types/interfaces/passengers';
import type { User } from '@/types/user';
import { formatDate, getFormattedPassengerId } from '@/utils/format-driver-id';
import { FormattedImage } from '@/utils/safe-image';

import DriversTableSkeleton from '../drivers/drivers-table-skeleton';

import PassengersSkeleton from './passengers-page-skeleton';

const PassengersPageComponent = () => {
  const { t } = useTranslation('translation');
  const [filters, setFilters] = useState<PassengersFilterState>({
    search: '',
    rating: '',
    status: '',
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPassengerId, setSelectedPassengerId] = useState<string | null>(
    null
  );
  const debouncedSearch = useDebounce(filters.search, 500);
  const entriesPerPage = 15;

  // ==== Fetch All Passengers Data ======
  const { data, isLoading, refetch, isError, error } = useFetchAllPassengers(
    currentPage,
    entriesPerPage,
    debouncedSearch,
    filters.status
  );

  // ==== Fetch Passenger Stats ====
  const { data: stats, isLoading: isStatsLoading } = usePassengerStats();

  const handleFilterChange = (
    key: keyof PassengersFilterState,
    value: string
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(0);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      rating: '',
      status: '',
    });
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const handleRowClick = (row: Record<string, unknown>) => {
    const passengerId = row.id as string;

    setSelectedPassengerId(passengerId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPassengerId(null);
  };

  const formatPassengerStatus = (status: string): string => {
    switch (status) {
      case 'ACTIVE':
        return t('filters.active');
      case 'INACTIVE':
        return t('filters.inactive');
      case 'SUSPENDED':
        return t('filters.suspended');
      default:
        return status.replace(/_/g, ' ');
    }
  };

  const passengersColumns: TableColumn<Passenger>[] = [
    {
      key: 'id',
      label: t('passengers.passengerId'),
      render: (_value, _row) => {
        const formattedId = getFormattedPassengerId(_row.id as string);
        return <div>{formattedId}</div>;
      },
    },
    {
      key: 'fullName',
      label: t('passengers.passenger'),
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <FormattedImage
              width={32}
              height={32}
              alt={row.fullName as string}
              src={row.profilePicture as string}
            />
          </div>
          <span>{value as string}</span>
        </div>
      ),
    },
    { key: 'phone', label: t('drivers.mobileNumber') },
    { key: 'email', label: t('drivers.email') },
    {
      key: 'lastLogin',
      label: t('passengers.lastLogin'),
      render: value => <span>{value ? formatDate(value as string) : '—'}</span>,
    },
    {
      key: 'status',
      label: t('drivers.status'),
      render: value => {
        const translatedStatus = formatPassengerStatus(value as string);
        return <StatusBadge status={translatedStatus} />;
      },
    },
  ];

  const passengers = data?.data.users ?? [];
  const totalEntries = data?.data.totalUsers ?? 0;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const startIndex = currentPage * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const mapUserToPassenger = (user: User): Passenger => ({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    profilePicture: user.profilePicture,
    phone: user.phone,
    lastLogin: user?.lastLogin,
    status:
      user.status === 'ACTIVE' || user.status === 'SUSPENDED'
        ? user.status
        : 'INACTIVE',
  });

  const currentPassengers: Passenger[] = passengers.map(mapUserToPassenger);

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    const maxButtons = 5;

    const currentPageUI = currentPage + 1;

    let startPage = Math.max(1, currentPageUI - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    return buttons;
  };

  if (isLoading && isStatsLoading) return <PassengersSkeleton />;
  if (isError)
    return (
      <ErrorState
        title={t('modal.errorTitle')}
        message={error.message}
        onRetry={refetch}
        retryLabel={t('modal.retry')}
        showRetryButton
      />
    );

  return (
    <>
      <div className={styles.passengers__page}>
        {/*==================== Stats Cards Section ====================*/}
        <div className={styles.stats__section}>
          <StatsCard
            icon="Users"
            title={t('stats.totalPassengers')}
            value={stats?.data.totalPassengers ?? 0}
          />
          <StatsCard
            icon="UserCheck"
            title={t('stats.activeThisMonth')}
            value={stats?.data.activeThisMonth ?? 0}
          />
          <StatsCard
            icon="UserPlus"
            title={t('stats.newRegistrations')}
            value={stats?.data.newRegistrations ?? 0}
          />
          <StatsCard
            icon="DollarSign"
            title={t('stats.averageSpending')}
            value={stats?.data.averageSpending ?? 'SEK 0.00'}
          />
        </div>
        {/*==================== End of Stats Cards Section ====================*/}

        {/*==================== Filters Section ====================*/}
        <PassengerFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        {/*==================== End of Filters Section ====================*/}

        {/*==================== Passengers Table ====================*/}
        <div className={styles.table__with__icon}>
          <Users size={20} color="#fbbf24" />
          {isLoading && !isStatsLoading ? (
            <DriversTableSkeleton />
          ) : (
            <ListTable
              title={t('passengers.passengersList')}
              data={currentPassengers as unknown as Record<string, unknown>[]}
              columns={passengersColumns}
              onRowClick={handleRowClick}
            />
          )}
        </div>
        {/*==================== End of Passengers Table ====================*/}

        {/*==================== Pagination Section ====================*/}
        <div className={styles.pagination__section}>
          <div className={styles.pagination__info}>
            {t('pagination.showing')} {startIndex + 1} {t('pagination.to')}{' '}
            {Math.min(endIndex, totalEntries)} {t('pagination.of')}{' '}
            {totalEntries} {t('pagination.entries')}
          </div>

          <div className={styles.pagination__controls}>
            <button
              onClick={() => handlePageChange(currentPage)}
              disabled={currentPage === 0}
              className={styles.pagination__button}
            >
              {t('pagination.previous')}
            </button>

            {getPaginationButtons().map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${styles.pagination__button} ${
                  currentPage + 1 === page ? styles.active : ''
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 2)}
              disabled={currentPage + 1 === totalPages}
              className={styles.pagination__button}
            >
              {t('pagination.next')}
            </button>
          </div>
        </div>
        {/*==================== End of Pagination Section ====================*/}
      </div>

      {/*==================== Passenger Details Modal ====================*/}
      {isModalOpen && (
        <PassengerDetailsModal
          isOpen={isModalOpen}
          selectedPassengerId={selectedPassengerId!}
          onClose={handleCloseModal}
        />
      )}
      {/*==================== End of Passenger Details Modal ====================*/}
    </>
  );
};

export default PassengersPageComponent;
