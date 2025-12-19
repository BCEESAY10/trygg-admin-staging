import type { GetServerSideProps } from 'next';

import { useTranslation } from 'react-i18next';

import { protectSubAdminPage } from '@/lib/server/protect-page';
import { AdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import PassengersPageComponent from '@/src/components/shared/passengers/passengers';
import type { PageProps } from '@/types/user';

const PassengersPage = ({ user }: PageProps) => {
  const { t } = useTranslation('translation');
  return (
    <DashboardLayout
      role="SUB"
      title={t('layout.passengers')}
      user={user}
      meta={AdminPageMeta.passengersPage}
    >
      <PassengersPageComponent />
    </DashboardLayout>
  );
};

export default PassengersPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSubAdminPage(context);
};
