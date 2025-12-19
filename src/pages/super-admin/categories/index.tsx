import type { GetServerSideProps } from 'next';

import { useTranslation } from 'react-i18next';

import { protectSuperAdminPage } from '@/lib/server/protect-page';
import { SuperAdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import CategoriesPageComponent from '@/src/components/shared/categories/categories';
import type { PageProps } from '@/types/user';

const CategoriesPage = ({ user }: PageProps) => {
  const { t } = useTranslation('translation');
  return (
    <DashboardLayout
      role="SUPER"
      title={t('layout.categories')}
      user={user}
      meta={SuperAdminPageMeta.categoriesPage}
    >
      <CategoriesPageComponent />
    </DashboardLayout>
  );
};

export default CategoriesPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSuperAdminPage(context);
};
