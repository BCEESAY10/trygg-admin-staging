import type { GetServerSideProps } from 'next';

import { useTranslation } from 'react-i18next';

import { protectSubAdminPage } from '@/lib/server/protect-page';
import { AdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import CategoriesPageComponent from '@/src/components/shared/categories/categories';
import type { PageProps } from '@/types/user';

const CategoriesPage = ({ user }: PageProps) => {
  const { t } = useTranslation('translation');
  return (
    <DashboardLayout
      role="SUB"
      user={user}
      title={t('layout.categories')}
      meta={AdminPageMeta.categoriesPage}
    >
      <CategoriesPageComponent />
    </DashboardLayout>
  );
};

export default CategoriesPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSubAdminPage(context);
};
