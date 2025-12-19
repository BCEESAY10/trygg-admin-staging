import { useState } from 'react';

import type { GetServerSideProps } from 'next';

import { CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import ErrorState from '@/components/ui/ErrorState';
import { useDebounce } from '@/hooks/useDebounce';
import { useFetchTransactions } from '@/hooks/useFetchTransactions';
import { useTransactionStats } from '@/hooks/useFetchTransactionStats';
import { protectSuperAdminPage } from '@/lib/server/protect-page';
import { SuperAdminPageMeta } from '@/pageMeta/meta';
import RevenueChart from '@/src/components/charts/RevenueChart';
import TransactionLineChart from '@/src/components/charts/TransactionLineChart';
import TransactionFilters from '@/src/components/filters/TransactionFilters';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import StatusBadge from '@/src/components/shared/status';
import ListTable from '@/src/components/ui/ListTable';
import StatsCard from '@/src/components/ui/StatsCard';
import styles from '@/src/styles/transactions/TransactionsPage.module.css';
import type { TableColumn } from '@/types/interfaces/admin-layout';
import type {
  SimplifiedTransaction,
  Transaction,
  TransactionsFilterState,
} from '@/types/interfaces/transactions';
import type { PageProps } from '@/types/user';
import { formatDate } from '@/utils/format-driver-id';
import { DriverImage, FormattedImage } from '@/utils/safe-image';

const TransactionsPage = ({ user }: PageProps) => {
  const { t } = useTranslation('translation');
  const [filters, setFilters] = useState<TransactionsFilterState>({
    search: '',
    status: '',
    paymentMethod: '',
    dateFrom: '',
    dateTo: '',
  });

  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 15;

  // === Fetch All Transactions ====
  const debouncedSearch = useDebounce(filters.search, 500);
  const debouncedDateFrom = useDebounce(filters.dateFrom, 1000);
  const debouncedDateTo = useDebounce(filters.dateTo, 1000);
  const { data, isLoading, isError, error, refetch } = useFetchTransactions(
    currentPage,
    entriesPerPage,
    debouncedSearch,
    filters.status,
    debouncedDateFrom,
    debouncedDateTo,
    filters.paymentMethod
  );

  // === Fetch tansaction stats ===
  const {
    data: transactionStats,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useTransactionStats();

  const transactionTrendData = transactionStats?.data.weeklyTrends.data ?? [];
  const transactionVolumeData =
    transactionStats?.data.monthlyRevenue.data ?? [];

  const handleFilterChange = (
    key: keyof TransactionsFilterState,
    value: string
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(0);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: '',
      paymentMethod: '',
      dateFrom: '',
      dateTo: '',
    });
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  const formatCurrency = (amount: number) => {
    const lang = localStorage.getItem('language') ?? 'en';
    return `SEK ${amount.toLocaleString(lang, { minimumFractionDigits: 2 })}`;
  };

  {
    /*==================== Transactions Table Columns ====================*/
  }
  const transactionsColumns: TableColumn<SimplifiedTransaction>[] = [
    {
      key: 'id',
      label: t('transactions.id'),
      render: (_value, _row, index) => (
        <div>{currentPage * entriesPerPage + (index! + 1)}</div>
      ),
    },
    {
      key: 'sourceUser',
      label: t('passengers.passenger'),
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '2rem',
              flexShrink: 0,
              height: '2rem',
              overflow: 'hidden',
              borderRadius: '50%',
            }}
          >
            <FormattedImage
              width={32}
              height={32}
              alt={row.sourceUser as string}
              src={row.sourceAvatar as string}
            />
          </div>
          <span>{value as string}</span>
        </div>
      ),
    },
    {
      key: 'recipientUser',
      label: t('drivers.driverName'),
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '2rem',
              flexShrink: 0,
              height: '2rem',
              overflow: 'hidden',
              borderRadius: '50%',
            }}
          >
            <DriverImage
              width={32}
              height={32}
              alt="Driver"
              src={row.recipientAvatar as string}
            />
          </div>
          <span>{value as string}</span>
        </div>
      ),
    },
    {
      key: 'type',
      label: t('transactions.type'),
      render: value => <span>{(value as string).replace(/_/g, ' ')}</span>,
    },
    {
      key: 'amount',
      label: t('transactions.amount'),
      render: value => <span>{formatCurrency(value as number)}</span>,
    },
    { key: 'paymentMethod', label: t('transactions.paymentMethod') },
    {
      key: 'status',
      label: t('drivers.status'),
      render: value => (
        <StatusBadge status={(value as string).replace(/_/g, ' ')} />
      ),
    },
    {
      key: 'createdAt',
      label: t('transactions.dateTime'),
      render: value => (
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          {formatDate(value as string)}
        </span>
      ),
    },
  ];
  {
    /*==================== End of Transactions Table Columns ====================*/
  }

  {
    /*==================== Pagination Logic ====================*/
  }
  const transactionData: Transaction[] = data?.data.transactions ?? [];
  const totalEntries = data?.data.totalTransactions ?? 0;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const startIndex = currentPage * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentTransactions: SimplifiedTransaction[] = transactionData.map(
    transaction => ({
      id: transaction.id,
      recipientUser: transaction.recipientUser?.user?.fullName ?? 'Unknown',
      recipientAvatar: transaction.recipientUser.user.profilePicture,
      sourceUser: transaction?.sourceUser
        ? transaction.sourceUser.fullName
        : 'N.A',
      sourceAvatar: transaction.sourceUser
        ? transaction.sourceUser.profilePicture
        : '',
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      paymentMethod: transaction.ride.paymentMethodUsed,
      status: transaction.status,
      createdAt: transaction.createdAt,
    })
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

  // ==== Table Data ====
  let content;

  if (isLoading && isStatsLoading) {
    content = <p>Transactions data loading...</p>;
  } else if (isError || isStatsError) {
    content = (
      <ErrorState
        title={t('modal.errorTitle')}
        message={error?.message}
        onRetry={refetch}
        retryLabel="Retry"
        showRetryButton
      />
    );
  } else if (isLoading) {
    content = <p>Loading transactions...</p>;
  } else {
    content = (
      <ListTable
        data={currentTransactions ?? []}
        title="Transactions"
        columns={transactionsColumns}
      />
    );
  }

  return (
    <DashboardLayout
      role="SUPER"
      title={t('transactions.transactions')}
      user={user}
      meta={SuperAdminPageMeta.transactionPage}
    >
      <div className={styles.transactions__page}>
        {/*==================== Stats Cards Section ====================*/}
        <div className={styles.stats__section}>
          <StatsCard
            icon="DollarSign"
            title={t('stats.totalRevenue')}
            value={transactionStats?.data.totalRevenue ?? 'SEK 0.00'}
          />
          <StatsCard
            icon="CreditCard"
            title={t('stats.transactionCount')}
            value={transactionStats?.data.transactionCount ?? 0}
          />
          <StatsCard
            icon="TrendingUp"
            title={t('stats.avTransaction')}
            value={transactionStats?.data.averageTransaction ?? 0}
          />
          <StatsCard
            icon="CheckCircle"
            title={t('stats.successRate')}
            value={transactionStats?.data.successRate ?? '0%'}
          />
        </div>
        {/*==================== End of Stats Cards Section ====================*/}

        {/*==================== Charts Section ====================*/}
        <div className={styles.charts__section}>
          <TransactionLineChart
            data={transactionTrendData}
            title={t('transactions.trends')}
          />
        </div>
        <div className={styles.charts__section}>
          <RevenueChart
            data={{
              period: 'Last 1 year',
              data:
                transactionVolumeData?.map(item => ({
                  month: item.month,
                  year: item.year,
                  revenue: item?.revenue,
                })) ?? [],
            }}
            title={t('transactions.volume')}
          />
        </div>
        {/*==================== End of Charts Section ====================*/}

        {/*==================== Filters Section ====================*/}
        <TransactionFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        {/*==================== End of Filters Section ====================*/}

        {/*==================== Transactions Table ====================*/}
        <div className={styles.table__with__icon}>
          <CreditCard size={20} color="#fbbf24" />
          {content}
        </div>
        {/*==================== End of Transactions Table ====================*/}

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
    </DashboardLayout>
  );
};

export default TransactionsPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSuperAdminPage(context);
};
