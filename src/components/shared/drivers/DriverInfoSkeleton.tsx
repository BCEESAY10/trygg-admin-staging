import skeletonStyles from '@/src/styles/drivers/DriverInfoSkeleton.module.css';

const DriverInfoSkeleton = () => {
  return (
    <div className={skeletonStyles.driver__card}>
      {/*==================== Profile Section ====================*/}
      <div className={skeletonStyles.profile__section}>
        <div
          className={`${skeletonStyles.avatar} ${skeletonStyles.skeleton}`}
        />
        <div className={skeletonStyles.profile__info}>
          <div
            className={`${skeletonStyles.name} ${skeletonStyles.skeleton}`}
          />
          <div
            className={`${skeletonStyles.rating} ${skeletonStyles.skeleton}`}
          />
        </div>
      </div>
      {/*==================== End of Profile Section ====================*/}

      {/*==================== Details Grid ====================*/}
      <div className={skeletonStyles.details__grid}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={skeletonStyles.detail__item}>
            <div
              className={`${skeletonStyles.label} ${skeletonStyles.skeleton}`}
            />
            <div
              className={`${skeletonStyles.value} ${skeletonStyles.skeleton}`}
            />
          </div>
        ))}
      </div>
      {/*==================== End of Details Grid ====================*/}

      {/*==================== Two Column Section ====================*/}
      <div className={skeletonStyles.two__column}>
        <div
          className={`${skeletonStyles.column__box} ${skeletonStyles.skeleton}`}
        />
        <div
          className={`${skeletonStyles.column__box} ${skeletonStyles.skeleton}`}
        />
      </div>
      {/*==================== End of Two Column Section ====================*/}
    </div>
  );
};

export default DriverInfoSkeleton;
