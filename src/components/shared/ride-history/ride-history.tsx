import { useState } from 'react';

import { Route } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import ErrorState from '@/components/ui/ErrorState';
import { useDebounce } from '@/hooks/useDebounce';
import { useFetchAllRides } from '@/hooks/useFetchAllRides';
import { useRidesStats } from '@/hooks/useFetchRidesStats';
import RideFilters from '@/src/components/filters/RideFilters';
import StatusBadge from '@/src/components/shared/status';
import ListTable from '@/src/components/ui/ListTable';
import StatsCard from '@/src/components/ui/StatsCard';
import styles from '@/src/styles/ride-history/RideHistoryPage.module.css';
import type { TableColumn } from '@/types/interfaces/admin-layout';
import type { RidesFilterState, RideRow } from '@/types/interfaces/rides';
import { formatDate } from '@/utils/format-driver-id';
import { DriverImage, FormattedImage } from '@/utils/safe-image';

import DriversTableSkeleton from '../drivers/drivers-table-skeleton';

import RideHistorySkeleton from './ride-history-skeleton';

const RideHistoryPageComponent = () => {
  const { t } = useTranslation('translation');
  const [filters, setFilters] = useState<RidesFilterState>({
    search: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  });
  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedDateFrom = useDebounce(filters.dateFrom, 1000);
  const debouncedDateTo = useDebounce(filters.dateTo, 1000);
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 15;

  // === Fetch all rides ===
  const { data, isLoading, refetch, isError, error } = useFetchAllRides(
    currentPage,
    entriesPerPage,
    debouncedSearch,
    filters.status,
    debouncedDateFrom,
    debouncedDateTo
  );

  const rides = data?.data.rides ?? [];

  // === Fetch Rides Stats ===
  const { data: rideStats, isLoading: isStatsLoading } = useRidesStats();

  const handleFilterChange = (key: keyof RidesFilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(0);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: '',
      dateFrom: '',
      dateTo: '',
    });
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const formatCurrency = (amount: number) => {
    return `SEK ${amount.toLocaleString('sv-SE', { minimumFractionDigits: 2 })}`;
  };

  const formatDuration = (minutes: number) => {
    return `${minutes} min`;
  };

  const formatDistance = (distance: number) => {
    return `${distance} km`;
  };

  const formatStatus = (status: string): string => {
    const map: Record<string, string> = {
      COMPLETED: t('filters.completed'),
      REQUESTED: t('filters.requested'),
      CANCELLED_BY_USER: t('filters.cancelled'),
      CANCELLED_BY_DRIVER: t('filters.cancelled'),
      NO_DRIVERS_FOUND: t('filters.noDriverFound'),
      ARRIVED: t('filters.completed'),
      IN_PROGRESS: t('filters.pending'),
      MATCHING: t('filters.matching'),
    };

    return map[status] ?? status;
  };

  {
    /*==================== Rides Table Columns ====================*/
  }
  const ridesColumns: TableColumn<RideRow>[] = [
    {
      key: 'displayId',
      label: t('dashboard.id'),
      render: (_value, _row, index) => (
        <div>{currentPage * entriesPerPage + (index! + 1)}</div>
      ),
    },
    {
      key: 'passenger',
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
              alt={row.passenger as string}
              src={row.passengerAvatar as string}
            />
          </div>
          <span>{value as string}</span>
        </div>
      ),
    },
    {
      key: 'driver',
      label: t('drivers.driverName'),
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
            <DriverImage
              width={32}
              height={32}
              alt={row.driverName as string}
              src={row?.driverAvatar as string}
            />
          </div>
          <span>{value as string}</span>
        </div>
      ),
    },
    {
      key: 'pickupLocation',
      label: t('rides.pickup'),
      render: value => (
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          {value as string}
        </span>
      ),
    },
    {
      key: 'dropoffLocation',
      label: t('rides.dropoff'),
      render: value => (
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          {value as string}
        </span>
      ),
    },
    {
      key: 'distance',
      label: t('rides.distance'),
      render: value => (
        <span style={{ fontWeight: '500' }}>
          {formatDistance(value as number)}
        </span>
      ),
    },
    {
      key: 'duration',
      label: t('rides.duration'),
      render: value => (
        <span style={{ fontWeight: '500' }}>
          {formatDuration(value as number)}
        </span>
      ),
    },
    {
      key: 'fare',
      label: t('rides.fare'),
      render: value => <span>{formatCurrency(value as number)}</span>,
    },
    {
      key: 'status',
      label: t('drivers.status'),
      render: value => <StatusBadge status={formatStatus(value as string)} />,
    },
    {
      key: 'dateTime',
      label: t('rides.dateTime'),
      render: value => (
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          {formatDate(value as string)}
        </span>
      ),
    },
  ];
  {
    /*==================== End of Rides Table Columns ====================*/
  }

  {
    /*==================== Pagination Logic ====================*/
  }
  const totalEntries = data?.data.totalRides ?? 0;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = currentPage * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);
  const currentRides: RideRow[] = rides.map(ride => ({
    rideId: ride.id,
    passenger: ride.user.fullName,
    passengerAvatar:
      ride.user.profilePicture && ride.user.profilePicture.trim() !== ''
        ? ride.user.profilePicture
        : null,
    driver: ride.driver?.user.fullName ?? 'Unknown',
    driverAvatar:
      ride.driver?.user.profilePicture &&
      ride.driver.user.profilePicture.trim() !== ''
        ? ride.driver.user.profilePicture
        : '/car.webp',
    pickupLocation: ride.pickupLocation?.address ?? 'Unknown',
    dropoffLocation: ride.destination?.address ?? 'Unknown',
    distance: ride.estimatedDistance ?? 0,
    duration: ride.estimatedDuration ?? 0,
    fare: ride.actualFare ?? ride.estimatedFare ?? 0,
    status: ride.status,
    dateTime: ride.requestedAt ?? ride.startedAt ?? ride.completedAt ?? '',
  }));

  if (isLoading && isStatsLoading) return <RideHistorySkeleton />;
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
  {
    /*==================== End of Pagination Logic ====================*/
  }

  return (
    <div className={styles.rides__page}>
      {/*==================== Stats Cards Section ====================*/}
      <div className={styles.stats__section}>
        <StatsCard
          icon="Users"
          title={t('stats.activeRides')}
          value={rideStats?.data.activeRides ?? 0}
        />
        <StatsCard
          icon="Users"
          title={t('stats.distance')}
          value={rideStats?.data.averageDistance ?? '0.00 KM'}
        />
        <StatsCard
          icon="Users"
          title={t('stats.ridesToday')}
          value={rideStats?.data.ridesCompletedToday ?? 0}
        />
        <StatsCard
          icon="Users"
          title={t('stats.totalRides')}
          value={rideStats?.data.totalRides ?? 0}
        />
      </div>
      {/*==================== End of Stats Cards Section ====================*/}

      {/*==================== Filters Section ====================*/}
      <RideFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />
      {/*==================== End of Filters Section ====================*/}

      {/*==================== Rides Table ====================*/}
      <div className={styles.table__with__icon}>
        <Route size={20} color="#fbbf24" />
        {isLoading ? (
          <DriversTableSkeleton />
        ) : (
          <ListTable<RideRow>
            title={t('rides.allRides')}
            data={currentRides}
            columns={ridesColumns}
          />
        )}
      </div>
      {/*==================== End of Rides Table ====================*/}

      {/*==================== Pagination Section ====================*/}
      <div className={styles.pagination__section}>
        <div className={styles.pagination__info}>
          {t('pagination.showing')} {startIndex + 1} {t('pagination.to')}{' '}
          {endIndex} {t('pagination.of')} {totalEntries}{' '}
          {t('pagination.entries')}
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
            disabled={currentPage + 1 === totalPages}
            className={styles.pagination__button}
            onClick={() => handlePageChange(currentPage + 2)}
          >
            {t('pagination.next')}
          </button>
        </div>
      </div>
      {/*==================== End of Pagination Section ====================*/}
    </div>
  );
};

export default RideHistoryPageComponent;
