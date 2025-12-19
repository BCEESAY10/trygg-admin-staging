import React from 'react';

import type { GetServerSideProps } from 'next';

import { useTranslation } from 'react-i18next';

import SettingsPageComponent from '@/components/shared/settings/settings';
import { protectSuperAdminPage } from '@/lib/server/protect-page';
import { SuperAdminPageMeta } from '@/pageMeta/meta';
import DashboardLayout from '@/src/components/layout/DashboardLayout';
import type { PageProps } from '@/types/user';

const SettingsPage = ({ user }: PageProps) => {
  const { t } = useTranslation('translation');
  return (
    <DashboardLayout
      role="SUPER"
      title={t('settings.settings')}
      user={user}
      meta={SuperAdminPageMeta.settingsPage}
    >
      <SettingsPageComponent
        role="SUPER"
        user={user}
        defaultName="Super Admin"
        defaultEmail="superadmin@trygg.com"
      />
    </DashboardLayout>
  );
};

export default SettingsPage;

export const getServerSideProps: GetServerSideProps = async context => {
  return await protectSuperAdminPage(context);
};
