import { useEffect } from 'react';

import Image from 'next/image';

import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

import { useFetchDriver } from '@/hooks/useFetchDriver';
import { useUpdateDriverStatus } from '@/hooks/useUpdateDriverStatus';
import styles from '@/src/styles/drivers/DriverInfoCard.module.css';
import { getFormattedDriverId, formatDate } from '@/utils/format-driver-id';
import { DriverImage } from '@/utils/safe-image';

import DriverInfoSkeleton from './DriverInfoSkeleton';

const DriverInfoCard = ({ selectedDriverId }: { selectedDriverId: string }) => {
  const { t } = useTranslation('translation');

  const {
    data: driverData,
    isLoading: isDriverLoading,
    refetch,
  } = useFetchDriver(selectedDriverId);

  useEffect(() => {
    refetch();
  }, [selectedDriverId]);

  const { mutate: updateDriverStatus, isPending } = useUpdateDriverStatus();

  const handleUpdateDriverStatus = async (
    driverId: string,
    status: 'APPROVED' | 'REJECTED'
  ) => {
    const actionLabel =
      status === 'APPROVED' ? t('actions.approve') : t('actions.reject');

    // First confirmation modal
    const confirmResult = await Swal.fire({
      title: t('modal.confirmTitle', { action: actionLabel }),
      text: t('modal.confirmText', { action: actionLabel.toLowerCase() }),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: t('modal.confirmButton', { action: actionLabel }),
      cancelButtonText: t('modal.cancelButton'),
      customClass: {
        popup: 'swal-warning-popup swal-compact-popup',
        title: 'swal-warning-title swal-compact-title',
        confirmButton:
          'swal-warning-confirm-button swal-compact-confirm-button',
        cancelButton: 'swal-error-confirm-button swal-compact-button',
      },
    });

    if (!confirmResult.isConfirmed) return;

    const payload: {
      id: string;
      applicationStatus: 'APPROVED' | 'REJECTED';
      reason?: string;
    } = {
      id: driverId,
      applicationStatus: status,
    };

    // If REJECTED, ask for reason
    if (status === 'REJECTED') {
      const reasonResult = await Swal.fire({
        title: t('modal.rejectionReason'),
        input: 'textarea',
        inputLabel: t('modal.enterReason'),
        inputPlaceholder: t('modal.inputPlaceholder'),
        inputAttributes: {
          'aria-label': 'Rejection reason',
        },
        showCancelButton: true,
        confirmButtonText: t('actions.submit'),
        cancelButtonText: t('actions.cancel'),
        customClass: {
          popup: 'swal-warning-popup swal-compact-popup',
          confirmButton:
            'swal-warning-confirm-button swal-compact-confirm-button',
          cancelButton: 'swal-error-confirm-button swal-compact-button',
        },
      });

      if (!reasonResult.isConfirmed || !reasonResult.value?.trim()) {
        Swal.fire(t('modal.cancelled'), t('modal.reasonRequired'), 'info');
        return;
      }

      payload.reason = reasonResult.value.trim();
    }

    // === Update driver states ===
    updateDriverStatus(payload, {
      onSuccess: () => {
        Swal.fire({
          title: t('modal.success'),
          text: t('modal.driverUpdated', { action: actionLabel.toLowerCase() }),
          icon: 'success',
          iconColor: '#30a702',
        });
      },
      onError: () => {
        Swal.fire(
          t('modal.error'),
          t('modal.failed', { action: actionLabel.toLowerCase() }),
          'error'
        );
      },
    });
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} fill="#fbbf24" color="#fbbf24" />);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} color="#e5e7eb" />);
    }

    return <div className={styles.rating__stars}>{stars}</div>;
  };

  if (isDriverLoading) {
    return <DriverInfoSkeleton />;
  }

  return (
    <div className={styles.driver__info__card}>
      {/*==================== Driver Profile Section ====================*/}
      <div className={styles.driver__profile}>
        <div className={styles.profile__left}>
          <div className={styles.driver__avatar}>
            <DriverImage
              width={48}
              height={48}
              src={driverData?.profilePicture ?? '/profiles/profile-3.avif'}
              alt={driverData?.fullName ?? 'Driver Avatar'}
              className={styles.avatar__image}
            />
          </div>
          <div className={styles.driver__info}>
            <h2 className={styles.driver__name}>{driverData?.fullName}</h2>
            <div className={styles.rating__container}>
              {renderStarRating(driverData?.driverData?.averageRating ?? 0)}
              <span className={styles.rating__text}>
                ({driverData?.driverData?.totalRatings ?? 0}{' '}
                {t('drivers.reviews')})
              </span>
            </div>
          </div>
        </div>

        <div className={styles.profile__right}>
          {driverData?.driverData?.status == 'ACTIVE' ? (
            <div className={styles.online__status}>
              <div className={styles.online__dot} />
              <span className={styles.online__text}>Online</span>
            </div>
          ) : (
            <div className={styles.online__status}>
              <div className={styles.offline__dot} />
              <span className={styles.offline__text}>Offline</span>
            </div>
          )}
        </div>
      </div>
      {/*==================== End of Driver Profile Section ====================*/}

      {/*==================== Driver Details Grid ====================*/}
      <div className={styles.driver__details__grid}>
        <div className={styles.detail__item}>
          <span className={styles.detail__label}>
            {t('dashboard.driverId')}
          </span>
          <span className={styles.detail__value}>
            {getFormattedDriverId(driverData?.id!)}
          </span>
        </div>

        <div className={styles.detail__item}>
          <span className={styles.detail__label}>
            {t('drivers.mobileNumber')}
          </span>
          <span className={styles.detail__value}>{driverData?.phone}</span>
        </div>

        <div className={styles.detail__item}>
          <span className={styles.detail__label}>{t('drivers.email')}</span>
          <span className={styles.detail__value}>{driverData?.email}</span>
        </div>

        <div className={styles.detail__item}>
          <span className={styles.detail__label}>
            {t('drivers.registerDate')}
          </span>
          <span className={styles.detail__value}>
            {formatDate(driverData?.driverData?.createdAt ?? '')}
          </span>
        </div>

        <div className={styles.detail__item}>
          <span className={styles.detail__label}>
            {t('drivers.approvalStatus')}
          </span>
          {driverData?.driverData?.applicationStatus !== 'APPROVED' ? (
            <span className={styles.detail__value}>
              <button
                className={`${styles.actionButton} ${styles.approveButton}`}
                onClick={() =>
                  handleUpdateDriverStatus(
                    driverData?.driverData?.id as string,
                    'APPROVED'
                  )
                }
                disabled={isPending}
              >
                {t('actions.approve')}
              </button>
              <button
                className={`${styles.actionButton} ${styles.rejectButton}`}
                onClick={() =>
                  handleUpdateDriverStatus(
                    driverData?.driverData?.id as string,
                    'REJECTED'
                  )
                }
                disabled={isPending}
              >
                {t('actions.reject')}
              </button>
            </span>
          ) : (
            <span
              className={`${styles.detail__value} ${styles.detail__value__approve}`}
            >
              {t('drivers.approvedDriver')}
            </span>
          )}
        </div>
      </div>
      {/*==================== End of Driver Details Grid ====================*/}

      {/*==================== Two Column Section ====================*/}
      <div className={styles.two__column__section}>
        {/*==================== Driver License Column ====================*/}
        <div className={styles.license__column}>
          <h3 className={styles.section__title}>
            {t('drivers.driverLicense')}
          </h3>

          <div className={styles.license__display}>
            <Image
              width={400}
              height={250}
              src={
                driverData?.driverData?.licenseNumber ??
                '/documents/driver-license.jpg'
              }
              alt="Driver License"
              className={styles.license__image}
            />
          </div>
        </div>
        {/*==================== End of Driver License Column ====================*/}

        {/*==================== Vehicle Details Column ====================*/}
        <div className={styles.vehicle__column}>
          <h3 className={styles.section__title}>
            {t('drivers.vehicleDetails')}
          </h3>

          <div className={styles.vehicle__details__grid}>
            <div className={styles.vehicle__info}>
              <span className={styles.vehicle__label}>{t('drivers.make')}</span>
              <span className={styles.vehicle__value}>
                {driverData?.driverData?.vehicle.make ?? ''}
              </span>
            </div>

            <div className={styles.vehicle__info}>
              <span className={styles.vehicle__label}>
                {t('drivers.model')}
              </span>
              <span className={styles.vehicle__value}>
                {driverData?.driverData?.vehicle.model}
              </span>
            </div>

            <div className={styles.vehicle__info}>
              <span className={styles.vehicle__label}>{t('drivers.year')}</span>
              <span className={styles.vehicle__value}>
                {driverData?.driverData?.vehicle.year}
              </span>
            </div>

            <div className={styles.vehicle__info}>
              <span className={styles.vehicle__label}>
                {t('drivers.color')}
              </span>
              <span className={styles.vehicle__value}>
                {driverData?.driverData?.vehicle.color}
              </span>
            </div>
          </div>
        </div>
        {/*==================== End of Vehicle Details Column ====================*/}
      </div>
      {/*==================== End of Two Column Section ====================*/}
    </div>
  );
};

export default DriverInfoCard;
