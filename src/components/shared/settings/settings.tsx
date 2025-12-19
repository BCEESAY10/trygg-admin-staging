import { useEffect, useState } from 'react';

import { User, Globe } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import ErrorState from '@/components/ui/ErrorState';
import { useUpdateUserProfile } from '@/hooks/useUpdateUser';
import i18n from '@/lib/i18n';
import styles from '@/src/styles/SettingsPage.module.css';
import type {
  SettingsPageComponentProps,
  TabType,
} from '@/types/interfaces/settings';

const SettingsPageComponent = ({
  defaultName,
  defaultEmail,
  user,
}: SettingsPageComponentProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const { t } = useTranslation('translation');

  const {
    mutate,
    isPending: isUpdating,
    isError,
    error,
  } = useUpdateUserProfile();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguageData(prev => ({ ...prev, language: savedLanguage }));
    } else {
      const browserLang =
        navigator.language || navigator.languages?.[0] || 'sv';
      const normalizedLang = browserLang.startsWith('sv') ? 'sv' : 'en';

      setLanguageData(prev => ({ ...prev, language: normalizedLang }));
      i18n.changeLanguage(normalizedLang);
      localStorage.setItem('language', normalizedLang);
    }
  }, []);

  {
    /*==================== Profile Form Data ====================*/
  }
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName ?? defaultName,
    email: user?.email ?? defaultEmail,
    phone: user?.phone ?? '+46 123 456 789',
  });
  {
    /*==================== End of Profile Form Data ====================*/
  }

  {
    /*==================== Language Form Data ====================*/
  }
  const [languageData, setLanguageData] = useState({
    language: 'sv',
    timezone: 'Europe/Stockholm',
    dateFormat: 'DD/MM/YYYY',
  });
  {
    /*==================== End of Language Form Data ====================*/
  }

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleLanguageChange = (field: string, value: string) => {
    setLanguageData(prev => ({ ...prev, [field]: value }));

    if (field === 'language') {
      i18n.changeLanguage(value);
      localStorage.setItem('language', value);
      toast.success(t('settings.languageUpdated'));
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(profileData, {
      onSuccess: () => {
        toast.success(t('settings.profileUpdated'));
      },
      onError: err => {
        toast.error(t('settings.errorUpdating'));
      },
    });
  };

  const handleLanguageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('settings.languageUpdated'));
  };

  if (isError)
    return (
      <ErrorState
        title={t('modal.errorTitle')}
        message={error.message}
        onRetry={() => handleProfileSubmit({} as React.FormEvent)}
        retryLabel={t('modal.retry')}
        showRetryButton
      />
    );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <form onSubmit={handleProfileSubmit} className={styles.form}>
            {/*==================== Avatar Section ====================*/}
            {/* <div className={styles.avatar__section}>
              <div className={styles.avatar__wrapper}>
                <Image
                  width={80}
                  height={80}
                  alt="Profile Avatar"
                  src={profileData.avatar}
                  className={styles.avatar__image}
                />
              </div>
              <button type="button" className={styles.upload__button}>
                <Upload size={16} />
                Change Avatar
              </button>
            </div> */}
            {/*==================== End of Avatar Section ====================*/}

            {/*==================== Profile Fields ====================*/}
            <div className={styles.form__fields}>
              <div className={styles.field__group}>
                <label className={styles.field__label}>
                  {t('settings.fullName')}
                </label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={e =>
                    handleProfileChange('fullName', e.target.value)
                  }
                  className={styles.field__input}
                />
              </div>

              <div className={styles.field__group}>
                <label className={styles.field__label}>
                  {t('settings.email')}
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={e => handleProfileChange('email', e.target.value)}
                  className={styles.field__input}
                />
              </div>

              <div className={styles.field__group}>
                <label className={styles.field__label}>
                  {t('settings.phone')}
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={e => handleProfileChange('phone', e.target.value)}
                  className={styles.field__input}
                />
              </div>
            </div>
            {/*==================== End of Profile Fields ====================*/}

            <button
              type="submit"
              disabled={isUpdating}
              className={styles.submit__button}
            >
              {t('settings.updateProfile')}
            </button>
          </form>
        );

      case 'language':
        return (
          <form onSubmit={handleLanguageSubmit} className={styles.form}>
            {/*==================== Language Fields ====================*/}
            <div className={styles.form__fields}>
              <div className={styles.field__group}>
                <label className={styles.field__label}>
                  {t('settings.language')}
                </label>
                <select
                  value={languageData.language}
                  onChange={e =>
                    handleLanguageChange('language', e.target.value)
                  }
                  className={styles.field__select}
                >
                  <option value="en">English</option>
                  <option value="sv">Svenska (Swedish)</option>
                </select>
              </div>

              <div className={styles.field__group}>
                <label className={styles.field__label}>
                  {t('settings.timezone')}
                </label>
                <select
                  value={languageData.timezone}
                  onChange={e =>
                    handleLanguageChange('timezone', e.target.value)
                  }
                  className={styles.field__select}
                >
                  <option value="Europe/Stockholm">Stockholm (GMT+1)</option>
                  <option value="UTC">UTC (GMT+0)</option>
                  <option value="Europe/London">London (GMT+0)</option>
                </select>
              </div>

              <div className={styles.field__group}>
                <label className={styles.field__label}>
                  {t('settings.dateFormat')}
                </label>
                <select
                  value={languageData.dateFormat}
                  onChange={e =>
                    handleLanguageChange('dateFormat', e.target.value)
                  }
                  className={styles.field__select}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
            {/*==================== End of Language Fields ====================*/}

            <button type="submit" className={styles.submit__button}>
              {t('settings.updatePreferences')}
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.settings}>
      {/*==================== Settings Container ====================*/}
      <div className={styles.settings__container}>
        {/*==================== Tab Navigation ====================*/}
        <div className={styles.tab__navigation}>
          <button
            onClick={() => setActiveTab('profile')}
            className={`${styles.tab__button} ${activeTab === 'profile' ? styles.active : ''}`}
          >
            <User size={18} />
            {t('settings.profile')}
          </button>
          {/* <button
            onClick={() => setActiveTab('security')}
            className={`${styles.tab__button} ${activeTab === 'security' ? styles.active : ''}`}
          >
            <Lock size={18} />
            Security
          </button> */}
          <button
            onClick={() => setActiveTab('language')}
            className={`${styles.tab__button} ${activeTab === 'language' ? styles.active : ''}`}
          >
            <Globe size={18} />
            {t('settings.language')}
          </button>
        </div>
        {/*==================== End of Tab Navigation ====================*/}

        {/*==================== Tab Content ====================*/}
        <div className={styles.tab__content}>{renderTabContent()}</div>
        {/*==================== End of Tab Content ====================*/}
      </div>
      {/*==================== End of Settings Container ====================*/}
    </div>
  );
};

export default SettingsPageComponent;
