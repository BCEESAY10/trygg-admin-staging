import type { GetServerSideProps } from 'next';

import { useTranslation } from 'react-i18next';

import { protectSubAdminPage } from '@/lib/server/protect-page';
import { AdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import ReviewsPageComponent from '@/src/components/shared/reviews/reviews-page';
import type { PageProps } from '@/types/user';

const ReviewsPage = ({ user }: PageProps) => {
  const { t } = useTranslation('translation');
  return (
    <DashboardLayout
      role="SUB"
      title={t('layout.reviews')}
      user={user}
      meta={AdminPageMeta.reviewsPage}
    >
      <ReviewsPageComponent />
    </DashboardLayout>
  );
};

export default ReviewsPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSubAdminPage(context);
};
