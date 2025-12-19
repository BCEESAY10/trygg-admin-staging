import React from 'react';

import dynamic from 'next/dynamic';

import { ArrowLeftRight, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

import ErrorState from '@/components/ui/ErrorState';
import { useDashboardStats } from '@/hooks/useDashboardData';
import { useUpdateDriverStatus } from '@/hooks/useUpdateDriverStatus';
import RevenueChart from '@/src/components/charts/RevenueChart';
import ListTable from '@/src/components/ui/ListTable';
import StatsCard from '@/src/components/ui/StatsCard';
import AlertsSummaryWidget from '@/src/components/widgets/AlertsSummaryWidget';
import DriverApplicationStatsWidget from '@/src/components/widgets/DriverApplicationStatsWidget';
import DriverStatusWidget from '@/src/components/widgets/DriverStatusWidget';
import TopDriverWidget from '@/src/components/widgets/TopDriverWidget';
import styles from '@/src/styles/dashboard/DashboardPage.module.css';
import type {
  MonthlyRevenue,
  PendingDriverApplication,
  TableColumn,
  Transaction,
} from '@/types/interfaces/admin-layout';
import { formatDate, getFormattedDriverId } from '@/utils/format-driver-id';
import { Loader } from '@/utils/loader';
import { DriverImage, FormattedImage } from '@/utils/safe-image';

import DashboardSkeleton from './dashboard-skeleton';

const AdminDriverMap = dynamic(
  () => import('@/components/map/AdminDriverMap'),
  {
    ssr: false, // disable SSR for this component
  }
);

const DashboardPageComponent = () => {
  const {
    data: dashboardStatsData,
    isError,
    error,
    refetch,
    isLoading,
  } = useDashboardStats();
  const { mutate: updateDriverStatus, isPending } = useUpdateDriverStatus();
  const stats = dashboardStatsData?.data;
  const revenueData: MonthlyRevenue = {
    period: stats?.monthlyRevenue?.period ?? '',
    data:
      stats?.monthlyRevenue?.data?.map(entry => ({
        month: entry.month,
        year: entry.year,
        revenue: entry.revenue,
      })) ?? [],
  };

  // ==== Fetching Stats Data ========
  const transactions = stats?.tenRecentTransactions ?? [];
  const pendingDriversData = [...(stats?.pendingDriverApplications ?? [])].sort(
    (a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
  );
  const licenseAlerts = stats?.licenseAlerts ?? {
    documentsExpiringSoon: 0,
    sevenDaysToExpiry: 0,
    remainingThirtyDaysToExpiry: 0,
  };
  const driverApplications = stats?.driverApplications ?? {
    totalApplications: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  };

  // ===== Use the i18next Translation hook ========
  const { t } = useTranslation('translation');

  // ===== Function to toggle driver status ========
  const handleUpdateDriverStatus = async (
    driverId: string,
    status: 'APPROVED' | 'REJECTED'
  ) => {
    const actionLabel =
      status === 'APPROVED' ? t('actions.approve') : t('actions.reject');

    // First confirmation modal
    const confirmResult = await Swal.fire({
      title: t('modal.confirmTitle', { action: actionLabel }),
      text: t('modal.confirmText', { action: actionLabel.toLowerCase() }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('modal.confirmButton', { action: actionLabel }),
      cancelButtonText: t('modal.cancelButton'),
      customClass: {
        popup: 'swal-warning-popup swal-compact-popup',
        title: 'swal-warning-title swal-compact-title',
        confirmButton:
          'swal-warning-confirm-button swal-compact-confirm-button',
        cancelButton: 'swal-error-confirm-button swal-compact-button',
      },
    });

    if (!confirmResult.isConfirmed) return;

    const payload: {
      id: string;
      applicationStatus: 'APPROVED' | 'REJECTED';
      reason?: string;
    } = {
      id: driverId,
      applicationStatus: status,
    };

    // If REJECTED, ask for reason
    if (status === 'REJECTED') {
      const reasonResult = await Swal.fire({
        title: t('modal.rejectionReason'),
        input: 'textarea',
        inputLabel: t('modal.enterReason'),
        inputPlaceholder: t('modal.inputPlaceholder'),
        inputAttributes: {
          'aria-label': 'Rejection reason',
        },
        showCancelButton: true,
        confirmButtonText: t('actions.submit'),
        cancelButtonText: t('actions.cancel'),
        customClass: {
          popup: 'swal-warning-popup swal-compact-popup',
          confirmButton:
            'swal-warning-confirm-button swal-compact-confirm-button',
          cancelButton: 'swal-error-confirm-button swal-compact-button',
        },
      });

      if (!reasonResult.isConfirmed || !reasonResult.value?.trim()) {
        Swal.fire(t('modal.cancelled'), t('modal.reasonRequired'), 'info');
        return;
      }

      payload.reason = reasonResult.value.trim();
    }

    // === Update driver states ===
    updateDriverStatus(payload, {
      onSuccess: () => {
        Swal.fire({
          title: t('modal.success'),
          text: t('modal.driverUpdated', { action: actionLabel.toLowerCase() }),
          icon: 'success',
          iconColor: '#30a702',
        });
      },
      onError: () => {
        Swal.fire(
          t('modal.error'),
          t('modal.failed', { action: actionLabel.toLowerCase() }),
          'error'
        );
      },
    });
  };

  if (isLoading) return <DashboardSkeleton />;
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

  const transactionColumns: TableColumn<Transaction>[] = [
    {
      key: 'displayId',
      label: t('dashboard.id'),
      render: (_value, _row, index = 0) => <div>{index + 1}</div>,
    },
    {
      key: 'passengerName',
      label: t('dashboard.passenger'),
      render: (value, row) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FormattedImage
              width={32}
              height={32}
              alt={row.passengerName as string}
              src={
                (row.passengerProfilePicture as string) ||
                '/profiles/profile-2.avif'
              }
            />
            <span>{value as string}</span>
          </div>
        );
      },
    },
    {
      key: 'driverName',
      label: t('dashboard.driver'),
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <DriverImage
            width={32}
            height={32}
            alt="Driver"
            src={row.driverProfilePicture as string}
          />
          <span>{value as string}</span>
        </div>
      ),
    },
    { key: 'amount', label: t('dashboard.amount') },
    {
      key: 'createdAt',
      label: t('dashboard.date'),
      render: value => new Date(value as string).toLocaleString(),
    },
  ];

  const pendingDriverColumns: TableColumn<PendingDriverApplication>[] = [
    {
      key: 'driverId',
      label: t('dashboard.driverId'),
      render: (_value, _row) => {
        const formattedId = getFormattedDriverId(_row.driverId as string);
        return <div>{formattedId}</div>;
      },
    },

    {
      key: 'driverName',
      label: t('dashboard.driver'),
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              flexShrink: 0,
              width: '2.5rem',
              height: '2.5rem',
              overflow: 'hidden',
              borderRadius: '50%',
            }}
          >
            <DriverImage
              width={40}
              height={40}
              alt="Driver"
              src={
                typeof row.driverProfileImg === 'string' &&
                row.driverProfileImg.startsWith('http')
                  ? row.driverProfileImg
                  : '/profiles/profile-1.avif'
              }
            />
          </div>
          <span style={{ fontWeight: 500, color: '#111827' }}>
            {value as string}
          </span>
        </div>
      ),
    },
    { key: 'vehicleName', label: t('dashboard.vehicle') },
    {
      key: 'appliedAt',
      label: t('dashboard.appliedOn'),
      render: value => {
        return <div>{formatDate(value as string)}</div>;
      },
    },
    {
      key: 'action',
      label: t('dashboard.action'),
      render: (_value, row) => (
        <div className={styles.action__buttons}>
          <button
            className={styles.approve__btn}
            onClick={() =>
              handleUpdateDriverStatus(row.driverId as string, 'APPROVED')
            }
            disabled={isPending}
          >
            {t('actions.approve')}
          </button>
          <button
            className={styles.reject__btn}
            onClick={() =>
              handleUpdateDriverStatus(row.driverId as string, 'REJECTED')
            }
            disabled={isPending}
          >
            {t('actions.reject')}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/*==================== Row 1: Stats Cards ====================*/}
      <div className={styles.stats__grid}>
        <StatsCard
          icon="DollarSign"
          title={t('stats.transactionValue')}
          value={`${stats?.transactionValue ?? 0}`}
        />
        <StatsCard
          icon="Car"
          title={t('stats.totalDrivers')}
          value={stats?.totalDrivers ?? 0}
        />
        <StatsCard
          icon="Users"
          title={t('stats.totalPassengers')}
          value={stats?.totalPassengers ?? 0}
        />
        <StatsCard
          icon="Share2"
          title={t('stats.totalReferrals')}
          value={`${stats?.totalReferrals ?? 0}`}
        />
      </div>
      {/*==================== End of Row 1: Stats Cards ====================*/}

      {/*==================== Map Section ====================*/}
      <div className={styles.mapContainer}>
        <div className={styles.map}>
          <AdminDriverMap />
        </div>
      </div>
      {/*==================== End of Map Section ====================*/}

      {/*==================== Row 2: Chart Left, Driver Widgets Right ====================*/}
      <div className={styles.chart__row}>
        {/*==================== Revenue Chart ====================*/}
        <div className={styles.chart__section}>
          <RevenueChart
            data={revenueData || []}
            title={t('dashboard.monthlyRevenue')}
          />
        </div>
        {/*==================== End of Revenue Chart ====================*/}

        {/*==================== Driver Widgets Column ====================*/}
        <div className={styles.driver__widgets}>
          {/*==================== Top Driver Widget ====================*/}
          <div className={styles.widget}>
            <TopDriverWidget
              data={
                stats?.topDriverThisMonth ?? {
                  name: t('dashboard.notAvailable'),
                  averageRating: 0,
                  ridesCompleted: 0,
                  profilePicture: '',
                }
              }
            />
          </div>
          {/*==================== End of Top Driver Widget ====================*/}

          {/*==================== Driver Status Widget ====================*/}
          <div className={styles.widget}>
            <DriverStatusWidget
              data={stats?.driverStatus ?? { online: 0, offline: 0 }}
            />
          </div>
          {/*==================== End of Driver Status Widget ====================*/}
        </div>
        {/*==================== End of Driver Widgets Column ====================*/}
      </div>
      {/*==================== End of Row 2 ====================*/}

      {/*==================== Row 3: Driver Stats Widgets Wrapper ====================*/}
      <div className={styles.stats__widgets}>
        {/*==================== Document Alerts Widget ====================*/}
        <div className={styles.widget}>
          <AlertsSummaryWidget data={licenseAlerts} />
        </div>
        {/*==================== End of Document Alerts Widget ====================*/}

        {/*==================== Driver Application Stats Widget ====================*/}
        <div className={styles.widget}>
          <DriverApplicationStatsWidget data={driverApplications} />
        </div>
        {/*==================== End of Driver Application Stats Widget ====================*/}
      </div>
      {/*==================== End of Row 3: Driver Stats Widgets Wrapper ====================*/}

      {/*==================== Row 4: Stats Widgets Left, Pending Applications Right ====================*/}
      <div className={styles.final__row}>
        {/*==================== Pending Applications Section ====================*/}
        <div className={styles.pending__section}>
          <div className={styles.table__with__pending__icon}>
            <Clock size={20} color="#fbbf24" />
            {isPending ? (
              <div className={styles.loader__wrapper}>
                <Loader size="md" />
              </div>
            ) : (
              <ListTable
                data={pendingDriversData}
                columns={pendingDriverColumns}
                title="Pending Driver Applications"
              />
            )}
          </div>
        </div>
        {/*==================== End of Pending Applications Section ====================*/}
      </div>
      {/*==================== End of Row 4 ====================*/}

      {/*==================== Row 5: Recent Transactions  ====================*/}
      <div className={styles.full__width__section}>
        <div className={styles.table__with__icon}>
          <ArrowLeftRight size={20} color="#fbbf24" />
          <ListTable
            data={transactions}
            title="Recent Transactions"
            columns={transactionColumns}
          />
        </div>
      </div>
      {/*==================== End of Row 5: Recent Transactions ====================*/}
    </div>
  );
};

export default DashboardPageComponent;
