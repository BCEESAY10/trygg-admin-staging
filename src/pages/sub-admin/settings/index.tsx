import type { GetServerSideProps } from 'next';

import { useTranslation } from 'react-i18next';

import { protectSubAdminPage } from '@/lib/server/protect-page';
import { AdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import SettingsPageComponent from '@/src/components/shared/settings/settings';
import type { PageProps } from '@/types/user';

const SettingsPage = ({ user }: PageProps) => {
  const { t } = useTranslation('translation');
  return (
    <DashboardLayout
      role="SUB"
      title={t('settings.settings')}
      user={user}
      meta={AdminPageMeta.settingsPage}
    >
      <SettingsPageComponent
        role="SUB"
        user={user}
        defaultName="Sub Admin"
        defaultEmail="subadmin@trygg.com"
      />
    </DashboardLayout>
  );
};

export default SettingsPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSubAdminPage(context);
};
