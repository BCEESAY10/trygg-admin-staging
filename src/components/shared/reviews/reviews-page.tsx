import { useState } from 'react';

import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import DriverDetailsModal from '@/components/modals/DriverDetailsModal';
import ErrorState from '@/components/ui/ErrorState';
import { useFetchReviews } from '@/hooks/useFetchReviews';
import styles from '@/src/styles/reviews/ReviewsPage.module.css';
import { formatDate } from '@/utils/format-driver-id';
import SafeImage, { FormattedImage } from '@/utils/safe-image';

import ReviewsSkeleton from './reviews-page-skeleton';

const ReviewsPageComponent = () => {
  const { t } = useTranslation('translation');
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  const { data, isError, isLoading, refetch, error } =
    useFetchReviews(selectedRating);

  const reviewsData = data?.reviews.data;
  const topDrivers = data?.topDrivers.data;

  const renderStarRating = (rating: number) => {
    return (
      <div className={styles.star__rating}>
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={16}
            className={`${styles.star} ${star <= rating ? styles.filled : ''}`}
            fill={star <= rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    );
  };

  function handleClickEvent(id: string) {
    if (id) {
      setSelectedDriverId(id);
      setIsModalOpen(true);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDriverId(null);
  };

  if (isLoading) return <ReviewsSkeleton />;
  if (isError)
    return (
      <ErrorState
        message={error.message}
        title={t('modal.errorTitle')}
        onRetry={refetch}
        retryLabel="Retry"
      />
    );

  return (
    <div className={styles.reviews__page}>
      {/*==================== Three Column Layout ====================*/}
      <div className={styles.reviews__layout}>
        {/*==================== Left Column - Filter Tabs & Rating ====================*/}
        <div className={styles.left__column}>
          {/*==================== Filter Tabs Card ====================*/}
          <div className={styles.filter__card}>
            <h1 className={styles.feedback__title}>{t('reviews.feedback')}</h1>
            <div className={styles.filter__tabs}>
              {[5, 4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  className={`${styles.filter__tab} ${
                    selectedRating === rating ? styles.active : ''
                  }`}
                  onClick={() => setSelectedRating(rating)}
                >
                  {rating} {t('filters.stars')}
                </button>
              ))}
            </div>
          </div>
          {/*==================== End of Filter Tabs Card ====================*/}

          {/*==================== Overall Rating Card ====================*/}
          <div className={styles.rating__card}>
            <div className={styles.overall__rating}>
              <div className={styles.rating__number}>
                {reviewsData?.averageRating}
              </div>
              <div className={styles.rating__details}>
                <div className={styles.rating__text}>
                  {t('reviews.avRatingDesc', {
                    count: reviewsData?.totalRatings,
                  })}
                </div>
                <div className={styles.overall__stars}>
                  {renderStarRating(
                    Math.round(Number(reviewsData?.averageRating))
                  )}
                </div>
              </div>
            </div>
          </div>
          {/*==================== End of Overall Rating Card ====================*/}
        </div>
        {/*==================== End of Left Column ====================*/}

        {/*==================== Middle Column - Reviews List ====================*/}
        <div className={styles.reviews__column}>
          {reviewsData?.ratings.length === 0 ? (
            <div className={styles.review__card}>
              {t('reviews.noReview', { count: selectedRating })}
            </div>
          ) : (
            reviewsData?.ratings?.map(review => (
              <div key={review.id} className={styles.review__card}>
                {/*==================== Review Header ====================*/}
                <div className={styles.review__header}>
                  <div className={styles.reviewer__info}>
                    <div className={styles.reviewer__avatar}>
                      <FormattedImage
                        width={40}
                        height={40}
                        src={
                          review?.user?.profilePicture ??
                          '/user-placeholder.avif'
                        }
                        alt={review?.user?.fullName ?? 'Passenger Name'}
                        className={styles.avatar__image}
                      />
                    </div>
                    <div className={styles.reviewer__details}>
                      <h3 className={styles.reviewer__name}>
                        {review?.user?.fullName ?? 'Unknown'}
                      </h3>
                      <span className={styles.review__date}>
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.review__rating}>
                    {renderStarRating(review.rating ?? 0)}
                  </div>
                </div>
                {/*==================== End of Review Header ====================*/}

                {/*==================== Review Content ====================*/}
                <div className={styles.review__content}>
                  <p className={styles.review__text}>{review.comment}</p>
                  <span className={styles.driver__attribution}>
                    - {review.driver?.user?.fullName ?? 'Unknown Driver'} (
                    {t('reviews.driver')})
                  </span>
                </div>
                {/*==================== End of Review Content ====================*/}
              </div>
            ))
          )}
        </div>

        {/*==================== End of Middle Column ====================*/}

        {/*==================== Right Column - Top Drivers ====================*/}
        <div className={styles.top__drivers__section}>
          {/*==================== Top Drivers Header ====================*/}
          <div className={styles.top__drivers__header}>
            <h2 className={styles.top__drivers__title}>
              {t('reviews.topDrivers')}
            </h2>
          </div>
          {/*==================== End of Top Drivers Header ====================*/}

          {/*==================== Top Drivers List ====================*/}
          <div className={styles.top__drivers__list}>
            {topDrivers?.map((driver, index) => (
              <div
                key={`${driver.driverName}-${index}`}
                className={`${styles.driver__item} ${index < (topDrivers?.length ?? 0) - 1 ? styles.with__border : ''}`}
              >
                {/*==================== Driver Rank ====================*/}
                <span className={styles.driver__rank}>{index + 1}.</span>
                {/*==================== End of Driver Rank ====================*/}

                {/*==================== Driver Info ====================*/}
                <div className={styles.driver__info}>
                  <div className={styles.driver__avatar}>
                    <SafeImage
                      width={32}
                      height={32}
                      src={driver.driverProfilePicture}
                      alt={driver.driverName}
                      className={styles.avatar__image}
                    />
                  </div>
                  <span className={styles.driver__name}>
                    {driver.driverName}
                  </span>
                </div>
                {/*==================== End of Driver Info ====================*/}

                {/*==================== Driver Action ====================*/}
                <button
                  onClick={() => handleClickEvent(driver?.userId)}
                  className={styles.driver__view__more}
                >
                  {t('reviews.viewMore')}
                </button>
                {/*==================== End of Driver Action ====================*/}
              </div>
            ))}
          </div>
          {/*==================== End of Top Drivers List ====================*/}
        </div>
        {/*==================== End of Right Column ====================*/}

        {/*==================== Driver Details Modal ====================*/}
        {isModalOpen && (
          <DriverDetailsModal
            onClose={handleCloseModal}
            selectedDriverId={selectedDriverId!}
          />
        )}

        {/*==================== End of Driver Details Modal ====================*/}
      </div>
      {/*==================== End of Three Column Layout ====================*/}
    </div>
  );
};

export default ReviewsPageComponent;
