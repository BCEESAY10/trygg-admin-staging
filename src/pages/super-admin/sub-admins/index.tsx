import React, { useState } from 'react';

import type { GetServerSideProps } from 'next';

import { UserIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

import ActionDropdown from '@/components/dropdowns/ActionDropdown';
import AdminFilters from '@/components/filters/AdminFilters';
import AdminForm from '@/components/forms/AdminForm';
import ErrorState from '@/components/ui/ErrorState';
import { useCreateSubAdmin } from '@/hooks/useCreateSubAdmin';
import { useFetchAdmins } from '@/hooks/useFetchAdmin';
import { useUpdateAdminStatus } from '@/hooks/useUpdateAdminStatus.ts';
import { useUpdateUserProfile } from '@/hooks/useUpdateUser';
import { protectSuperAdminPage } from '@/lib/server/protect-page';
import { SuperAdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import StatusBadge from '@/src/components/shared/status';
import ListTable from '@/src/components/ui/ListTable';
import styles from '@/src/styles/sub-admin/SubAdminPage.module.css';
import type { TableColumn } from '@/types/interfaces/admin-layout';
import type {
  AdminFormData,
  SubAdmin,
  AdminFilterState,
} from '@/types/interfaces/sub-admin';
import type { PageProps } from '@/types/user';
import { FormattedImage } from '@/utils/safe-image';

const SubAdminsPage = ({ user }: PageProps) => {
  const { t } = useTranslation('translation');
  const [filters, setFilters] = useState<AdminFilterState>({
    role: '',
  });

  const [editingAdmin, setEditingAdmin] = useState<SubAdmin | null>(null);
  const [showActionError, setShowActionError] = useState(false);

  const { data, isLoading, isError, error, refetch } = useFetchAdmins(
    filters.role
  );

  // ==== Get Data from the hooks =====
  const {
    mutate,
    isError: adminCreationError,
    error: createError,
  } = useCreateSubAdmin();
  const {
    mutate: editAdmin,
    isError: adminEditingError,
    error: editError,
  } = useUpdateUserProfile();
  const { mutate: updateAdmin } = useUpdateAdminStatus();

  // ==== Create a sub admin =====
  const handleCreateAdmin = (formData: AdminFormData) => {
    mutate(formData, {
      onSuccess: data => {
        setShowActionError(false);
        Swal.fire({
          title: t('admins.success'),
          text: t('admins.created'),
          icon: 'success',
          iconColor: '#30a702',
        });
      },
      onError: error => {
        setShowActionError(true);
        Swal.fire(t('admins.error'), t('admins.failed'), 'error');
      },
    });
  };

  // ==== Edit a sub admin =====
  const handleEditAdmin = (formData: AdminFormData) => {
    editAdmin(formData, {
      onSuccess: data => {
        setShowActionError(false);
        Swal.fire({
          title: t('admins.success'),
          text: t('admins.updated'),
          icon: 'success',
          iconColor: '#30a702',
        });
      },
      onError: error => {
        setShowActionError(true);
        Swal.fire(t('admins.error'), t('admins.editFailed'), 'error');
      },
    });
  };

  //==== Update Sub Admin Status =====
  const handleUpdateStatus = (id: string) => {
    if (adminCreationError) return;

    updateAdmin({ id });
  };

  const formatStatus = (status: string): string => {
    const map: Record<string, string> = {
      ACTIVE: 'admins.active',
      SUSPENDED: 'admins.suspended',
    };
    return map[status] ?? status;
  };

  const formatRole = (role: string): string => {
    const map: Record<string, string> = {
      SUPER: 'admins.super',
      SUB: 'admins.sub',
    };
    return map[role] ?? role;
  };

  let actionErrorContent = null;
  if (showActionError && adminCreationError) {
    actionErrorContent = (
      <ErrorState
        title={t('modal.errorTitle')}
        message={(createError as any)?.response.data.message}
        onRetry={() => {
          setShowActionError(false);
        }}
        retryLabel={t('modal.retry') || 'Retry'}
        showRetryButton
      />
    );
  } else if (showActionError && adminEditingError) {
    actionErrorContent = (
      <ErrorState
        title={t('modal.errorTitle')}
        message={(editError as any)?.response.data.message}
        onRetry={async () => {
          setShowActionError(false);
          await refetch();
        }}
        retryLabel={t('modal.retry') || 'Retry'}
        showRetryButton
      />
    );
  }

  // ====== Filters ==========
  const handleFilterChange = (key: keyof AdminFilterState, value: string) => {
    if (
      key === 'role' &&
      (value === 'SUPER' || value === 'SUB' || value === '')
    ) {
      setFilters(prev => ({ ...prev, role: value }));
    }
  };

  const handleResetFilters = () => {
    setFilters({ role: '' });
  };

  const subAdminColumns: TableColumn<SubAdmin>[] = [
    {
      key: 'displayId',
      label: t('dashboard.id'),
      render: (_value, _row, index) => <div>{index! + 1}</div>,
    },
    {
      key: 'fullName',
      label: t('admins.name'),
      render: (value, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '2.5rem',
              height: '2.5rem',
              flexShrink: 0,
              overflow: 'hidden',
              borderRadius: '50%',
            }}
          >
            <FormattedImage
              width={40}
              height={40}
              alt={row?.fullName as string}
              src={row.avatar as string}
            />
          </div>
          <span style={{ fontWeight: 500, color: '#111827' }}>
            {value as string}
          </span>
        </div>
      ),
    },
    { key: 'email', label: t('admins.email') },
    { key: 'phone', label: t('admins.phone') },
    {
      key: 'status',
      label: 'Status',
      render: value => (
        <StatusBadge status={t(formatStatus(value as string))} />
      ),
    },
    {
      key: 'role',
      label: t('admins.role'),
      render: value => t(formatRole(value as string)),
    },
    {
      key: 'action',
      label: t('admins.action'),
      render: (_, row) => {
        const admin = row as unknown as SubAdmin;
        return (
          <ActionDropdown
            status={admin.status}
            onStatusChange={() => handleUpdateStatus(admin.id)}
            onEdit={() => setEditingAdmin(admin)}
          />
        );
      },
    },
  ];

  // ==== Table Data ====
  let content;

  if (isLoading) {
    content = <p>{t('admins.loading')}</p>;
  } else if (isError) {
    content = (
      <ErrorState
        title={t('modal.errorTitle')}
        message={error}
        onRetry={refetch}
        retryLabel="Retry"
        showRetryButton
      />
    );
  } else {
    content = (
      <ListTable
        data={data?.data.admins ?? []}
        title={t('admins.admins')}
        columns={subAdminColumns}
      />
    );
  }

  return (
    <DashboardLayout
      role="SUPER"
      title={t('admins.admins')}
      user={user}
      meta={SuperAdminPageMeta.subAdminsPage}
    >
      <div className={styles.sub__admin__page}>
        {/*==================== Two Column Layout ====================*/}
        <div className={styles.two__column__layout}>
          {/*==================== Left Column - Create Form ====================*/}
          <div className={styles.left__column}>
            {actionErrorContent}
            <AdminForm
              onCreateAdmin={handleCreateAdmin}
              onEditAdmin={handleEditAdmin}
              editData={editingAdmin}
            />
          </div>
          {/*==================== End of Left Column ====================*/}

          {/*==================== Right Column - Sub Admins List ====================*/}
          <div className={styles.right__column}>
            <AdminFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
            <div className={styles.table__container}>
              <div className={styles.table__with__icon}>
                <UserIcon size={20} color="#fbbf24" />
                {content}
              </div>
            </div>
          </div>
          {/*==================== End of Right Column ====================*/}
        </div>
        {/*==================== End of Two Column Layout ====================*/}

        {/*==================== Dynamic Status Change Modal ====================*/}
        {/* <DynamicAdminConfirmModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          actionState={actionState}
          onConfirm={handleStatusChangeConfirm}
        /> */}
        {/*==================== End of Dynamic Status Change Modal ====================*/}
      </div>
    </DashboardLayout>
  );
};

export default SubAdminsPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSuperAdminPage(context);
};
