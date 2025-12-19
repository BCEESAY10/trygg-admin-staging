import { useState } from 'react';

import { Car, Star, StarHalf } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import ErrorState from '@/components/ui/ErrorState';
import { useDebounce } from '@/hooks/useDebounce';
import { useFetchAllDrivers } from '@/hooks/useFetchDriverQuery';
import DriverFilters from '@/src/components/filters/DriverFilters';
import DriverDetailsModal from '@/src/components/modals/DriverDetailsModal';
import StatusBadge from '@/src/components/shared/status';
import ListTable from '@/src/components/ui/ListTable';
import StatsCard from '@/src/components/ui/StatsCard';
import styles from '@/src/styles/drivers/DriversPage.module.css';
import type { Driver } from '@/types/driver';
import type { TableColumn } from '@/types/interfaces/admin-layout';
import type { DriversFilterState } from '@/types/interfaces/drivers';
import { getFormattedDriverId } from '@/utils/format-driver-id';
import { DriverImage } from '@/utils/safe-image';

import DriversSkeleton from './drivers-page-skeleton';
import DriversTableSkeleton from './drivers-table-skeleton';

const DriversPageComponent = () => {
  const { t } = useTranslation('translation');
  const [filters, setFilters] = useState<DriversFilterState>({
    search: '',
    rating: '',
    status: '',
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const debouncedSearch = useDebounce(filters.search, 500);

  const entriesPerPage = 15;

  // ==== Fetch All Drivers Data ====
  const { data, isLoading, refetch, isError, error } = useFetchAllDrivers(
    currentPage,
    entriesPerPage,
    debouncedSearch,
    filters.rating ? parseInt(filters.rating) : undefined,
    filters.status
  );

  // ==== Fetch Driver Stats Data ======
  const driverStats = data?.driversStats;

  const handleFilterChange = (key: keyof DriversFilterState, value: string) => {
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
    const driverId = row.userId as string;

    setSelectedDriverId(driverId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDriverId(null);
  };

  const formatDriverStatus = (status: string): string => {
    switch (status) {
      case 'APPROVED':
        return t('filters.approved');
      case 'PENDING_APPROVAL':
        return t('filters.pending');
      case 'SUSPENDED':
        return t('filters.suspended');
      case 'REJECTED':
        return t('filters.rejected');
      default:
        return status.replace(/_/g, ' ');
    }
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />);
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" size={16} fill="#fbbf24" color="#fbbf24" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} color="#e5e7eb" />);
    }

    return <div style={{ display: 'flex', gap: '2px' }}>{stars}</div>;
  };

  const driversColumns: TableColumn<Driver>[] = [
    {
      key: 'driverId',
      label: t('dashboard.driverId'),
      render: (_value, _row) => {
        const formattedId = getFormattedDriverId(_row.driverId as string);
        return <div>{formattedId}</div>;
      },
    },
    {
      key: 'name',
      label: t('drivers.driverName'),
      render: (value, row) => {
        return (
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <DriverImage
                width={40}
                height={40}
                alt="Driver"
                src={row.avatar as string}
              />
            </div>
            <span style={{ fontWeight: 500, color: '#111827' }}>
              {value as string}
            </span>
          </div>
        );
      },
    },
    { key: 'mobileNumber', label: t('drivers.mobileNumber') },
    { key: 'email', label: t('drivers.email') },
    {
      key: 'rating',
      label: t('drivers.ratings'),
      render: value => renderStarRating(value as number),
    },
    { key: 'totalTrips', label: 'Total Trips' },
    {
      key: 'status',
      label: t('drivers.status'),
      render: value => {
        const translatedStatus = formatDriverStatus(value as string);
        return <StatusBadge status={translatedStatus} />;
      },
    },
  ];

  const drivers = data?.drivers.data.drivers ?? [];
  const totalEntries = data?.drivers.data.totalDrivers ?? 0;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const startIndex = currentPage * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const currentDrivers = drivers.map((driver: Driver) => ({
    driverId: driver.id,
    userId: driver.userId,
    name: driver.user.fullName,
    avatar: driver.user.profilePicture,
    mobileNumber: driver.user.phone,
    email: driver.user.email,
    rating: driver.averageRating ?? 0,
    totalTrips: driver.totalRatings,
    status: driver.applicationStatus,
  }));

  if (isLoading) return <DriversSkeleton />;
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

  return (
    <>
      <div className={styles.drivers__page}>
        {/*==================== Stats Cards Section ====================*/}
        <div className={styles.stats__section}>
          <StatsCard
            icon="Car"
            title={t('stats.totalDrivers')}
            value={driverStats?.data.totalDrivers ?? 0}
          />
          <StatsCard
            icon="CheckCircle"
            title={t('stats.activeDrivers')}
            value={driverStats?.data.totalActiveDrivers ?? 0}
          />
          <StatsCard
            icon="Star"
            title={t('stats.averageRating')}
            value={driverStats?.data.averageRating ?? 0}
          />
          <StatsCard
            icon="DollarSign"
            title={t('stats.totalPayouts')}
            value={driverStats?.data.totalPayouts ?? 0}
          />
        </div>
        {/*==================== End of Stats Cards Section ====================*/}

        {/*==================== Filters Section ====================*/}
        <DriverFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        {/*==================== End of Filters Section ====================*/}

        {/*==================== Drivers Table ====================*/}
        <div className={styles.table__with__icon}>
          <Car size={20} color="#fbbf24" />
          {isLoading ? (
            <DriversTableSkeleton />
          ) : (
            <ListTable
              title={t('drivers.driversList')}
              data={currentDrivers as unknown as Record<string, unknown>[]}
              columns={driversColumns}
              onRowClick={handleRowClick}
            />
          )}
        </div>
        {/*==================== End of Drivers Table ====================*/}

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

      {/*==================== Driver Details Modal ====================*/}
      {isModalOpen && (
        <DriverDetailsModal
          onClose={handleCloseModal}
          selectedDriverId={selectedDriverId!}
        />
      )}

      {/*==================== End of Driver Details Modal ====================*/}
    </>
  );
};

export default DriversPageComponent;
