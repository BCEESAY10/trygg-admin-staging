import type { GetServerSideProps } from 'next';

import { useTranslation } from 'react-i18next';

import { protectSuperAdminPage } from '@/lib/server/protect-page';
import { SuperAdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import RideHistoryPageComponent from '@/src/components/shared/ride-history/ride-history';
import type { PageProps } from '@/types/user';

const RideHistoryPage = ({ user }: PageProps) => {
  const { t } = useTranslation('translation');
  return (
    <DashboardLayout
      role="SUPER"
      title={t('layout.rideHistory')}
      user={user}
      meta={SuperAdminPageMeta.rideHistoryPage}
    >
      <RideHistoryPageComponent />
    </DashboardLayout>
  );
};

export default RideHistoryPage;
export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSuperAdminPage(context);
};
