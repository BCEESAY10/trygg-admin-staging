import { useState } from 'react';

import { Check, X, Shield, Globe, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { useFetchPassenger } from '@/hooks/useFetchPassenger.ts';
import styles from '@/src/styles/passengers/PassengerInfoCard.module.css';
import { FormattedImage } from '@/utils/safe-image';

import DriverInfoSkeleton from '../drivers/DriverInfoSkeleton';

const PassengerInfoCard = ({
  selectedPassengerId,
}: {
  selectedPassengerId: string;
}) => {
  const { t } = useTranslation('translation');
  const [activeTab, setActiveTab] = useState<'account' | 'referral'>('account');
  const { data: passenger, isLoading: isPassengerLoading } =
    useFetchPassenger(selectedPassengerId);

  const formatDate = (dateString: string) => {
    const lang = localStorage.getItem('language') ?? 'en';
    return new Date(dateString).toLocaleDateString(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatLastLogin = (dateString: string) => {
    const now = new Date();
    const loginDate = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return formatDate(dateString);
  };

  if (isPassengerLoading) {
    return <DriverInfoSkeleton />;
  }

  const renderAccountContent = () => (
    <div className={styles.tab__display}>
      <div className={styles.account__info}>
        <div className={styles.info__item}>
          <span className={styles.info__label}>{t('passengers.created')}</span>
          <span className={styles.info__value}>
            {formatDate(passenger?.data?.createdAt ?? '')}
          </span>
        </div>
        <div className={styles.info__item}>
          <span className={styles.info__label}>{t('passengers.updated')}</span>
          <span className={styles.info__value}>
            {formatDate(passenger?.data?.updatedAt ?? '')}
          </span>
        </div>
        <div className={styles.info__item}>
          <span className={styles.info__label}>{t('passengers.active')}</span>
          <span className={styles.info__value}>
            {formatLastLogin(passenger?.data?.lastLogin ?? '')}
          </span>
        </div>
        <div className={styles.info__item}>
          <span className={styles.info__label}>{t('passengers.language')}</span>
          <div className={styles.language__value}>
            <Globe size={14} />
            <span>
              {passenger?.data?.preferredLanguage?.toUpperCase() ?? 'SV'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReferralContent = () => (
    <div className={styles.tab__display}>
      <div className={styles.referral__info}>
        <div className={styles.info__item}>
          <span className={styles.info__label}>{t('passengers.code')}</span>
          <div className={styles.referral__code}>
            <Share2 size={14} className={styles.referral__icon} />
            <span className={styles.code__value}>
              {passenger?.data?.referralCode}
            </span>
          </div>
        </div>
        {passenger?.data?.referralCode ? (
          <div className={styles.info__item}>
            <span className={styles.info__label}>
              {t('passengers.referredBy')}
            </span>
            <span className={styles.info__value}>
              {passenger?.data?.referredBy ?? t('dashboard.notAvailable')}
            </span>
          </div>
        ) : (
          <div className={styles.no__referral}>
            <span>{t('passengers.noReferral')}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.passenger__info__card}>
      {/*==================== Passenger Profile Section ====================*/}
      <div className={styles.passenger__profile}>
        <div className={styles.profile__left}>
          <div className={styles.passenger__avatar}>
            <FormattedImage
              width={48}
              height={48}
              src={
                passenger?.data?.profilePicture ?? '/profiles/profile-1.avif'
              }
              alt={passenger?.data?.fullName ?? 'Passenger Avatar'}
              className={styles.avatar__image}
            />
          </div>
          <div className={styles.passenger__info}>
            <h2 className={styles.passenger__name}>
              {passenger?.data?.fullName}
            </h2>
            <div className={styles.status__container}>
              <span
                className={`${styles.status__badge} ${styles[passenger?.data?.status.toLowerCase() ?? '']}`}
              >
                {passenger?.data?.status}
              </span>
              {passenger?.data?.isEmailVerified && (
                <div className={styles.verified__badge}>
                  <Check size={12} />
                  <span>{t('passengers.verified')}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.profile__right}>
          <div className={styles.language__badge}>
            <Globe size={14} />
            <span>{passenger?.data?.preferredLanguage.toUpperCase()}</span>
          </div>
        </div>
      </div>
      {/*==================== End of Passenger Profile Section ====================*/}

      {/*==================== Passenger Details Grid ====================*/}
      <div className={styles.passenger__details__grid}>
        <div className={styles.detail__item}>
          <span className={styles.detail__label}>{t('drivers.email')}</span>
          <span className={styles.detail__value}>{passenger?.data?.email}</span>
        </div>

        <div className={styles.detail__item}>
          <span className={styles.detail__label}>
            {t('drivers.mobileNumber')}
          </span>
          <span className={styles.detail__value}>{passenger?.data?.phone}</span>
        </div>

        <div className={styles.detail__item}>
          <span className={styles.detail__label}>{t('passengers.date')}</span>
          <span className={styles.detail__value}>
            {formatDate(passenger?.data?.createdAt ?? '')}
          </span>
        </div>

        <div className={styles.detail__item}>
          <span className={styles.detail__label}>
            {t('passengers.lastLogin')}
          </span>
          <span className={styles.detail__value}>
            {formatLastLogin(passenger?.data?.lastLogin ?? '')}
          </span>
        </div>

        <div className={styles.detail__item}>
          <span className={styles.detail__label}>
            {t('passengers.biometric')}
          </span>
          <div className={styles.detail__value}>
            <Shield size={16} className={styles.detail__icon} />
            <span
              className={
                passenger?.data.biometricEnabled ? styles.security__value : ''
              }
            >
              {passenger?.data.biometricEnabled
                ? t('passengers.enabled')
                : t('passengers.disabled')}
            </span>
          </div>
        </div>

        <div className={styles.detail__item}>
          <span className={styles.detail__label}>
            {t('passengers.verification')}
          </span>
          <div className={styles.detail__value}>
            {passenger?.data?.isEmailVerified ? (
              <Check size={16} className={styles.verified__icon} />
            ) : (
              <X size={16} className={styles.unverified__icon} />
            )}
            <span className={styles.verification__value}>
              {passenger?.data.isEmailVerified
                ? t('passengers.verified')
                : t('passengers.unverified')}
            </span>
          </div>
        </div>
      </div>
      {/*==================== End of Passenger Details Grid ====================*/}

      {/*==================== Two Column Section ====================*/}
      <div className={styles.two__column__section}>
        {/*==================== Account Activity Column ====================*/}
        <div className={styles.activity__column}>
          <h3 className={styles.section__title}>{t('passengers.activity')}</h3>

          <div className={styles.tab__content}>
            <div className={styles.tab__nav}>
              <button
                className={`${styles.nav__item} ${activeTab === 'account' ? styles.active : ''}`}
                onClick={() => setActiveTab('account')}
              >
                {t('passengers.info')}
              </button>
            </div>

            {renderAccountContent()}
          </div>
        </div>
        {/*==================== End of Account Activity Column ====================*/}

        {/*==================== Referral Information Column ====================*/}
        <div className={styles.referral__column}>
          <h3 className={styles.section__title}>{t('passengers.referral')}</h3>

          <div className={styles.tab__content}>
            <div className={styles.tab__nav}>
              <button
                className={`${styles.nav__item} ${activeTab === 'referral' ? styles.active : ''}`}
                onClick={() => setActiveTab('referral')}
              >
                {t('passengers.code')}
              </button>
            </div>

            {renderReferralContent()}
          </div>
        </div>
        {/*==================== End of Referral Information Column ====================*/}
      </div>
      {/*==================== End of Two Column Section ====================*/}
    </div>
  );
};

export default PassengerInfoCard;
