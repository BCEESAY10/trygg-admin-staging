import React from 'react';

import styles from '@/src/styles/passengers/PassengersPage.module.css';
import skeletonStyles from '@/src/styles/passengers/PassengersSkeleton.module.css';

const PassengersSkeleton = () => {
  return (
    <div className={styles.passengers__page}>
      {/*==================== Stats Cards Section Skeleton ====================*/}
      <div className={styles.stats__section}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className={skeletonStyles.stats__card}>
            {/*==================== Icon Section ====================*/}
            <div
              className={`${skeletonStyles.icon__wrapper} ${skeletonStyles.skeleton}`}
            />
            {/*==================== End of Icon Section ====================*/}

            {/*==================== Content Section ====================*/}
            <div className={skeletonStyles.content}>
              <div
                className={`${skeletonStyles.title} ${skeletonStyles.skeleton}`}
              />
              <div
                className={`${skeletonStyles.value} ${skeletonStyles.skeleton}`}
              />
            </div>
            {/*==================== End of Content Section ====================*/}
          </div>
        ))}
      </div>
      {/*==================== End of Stats Cards Section Skeleton ====================*/}

      {/*==================== Filters Section Skeleton ====================*/}
      <div className={skeletonStyles.filters__section}>
        <div className={skeletonStyles.filters__row}>
          {/*==================== Search Input Skeleton ====================*/}
          <div className={skeletonStyles.search__wrapper}>
            <div
              className={`${skeletonStyles.search__icon} ${skeletonStyles.skeleton}`}
            />
            <div
              className={`${skeletonStyles.search__input} ${skeletonStyles.skeleton}`}
            />
          </div>
          {/*==================== End of Search Input Skeleton ====================*/}

          {/*==================== Filter Dropdowns Skeleton ====================*/}
          <div className={skeletonStyles.filters__group}>
            <div
              className={`${skeletonStyles.filter__select} ${skeletonStyles.skeleton}`}
            />
            <div
              className={`${skeletonStyles.date__input} ${skeletonStyles.skeleton}`}
            />
            <div
              className={`${skeletonStyles.reset__button} ${skeletonStyles.skeleton}`}
            />
          </div>
          {/*==================== End of Filter Dropdowns Skeleton ====================*/}
        </div>
      </div>
      {/*==================== End of Filters Section Skeleton ====================*/}

      {/*==================== Passengers Table Skeleton ====================*/}
      <div className={styles.table__with__icon}>
        <div className={skeletonStyles.table__container}>
          <div className={skeletonStyles.table__header}>
            <div
              className={`${skeletonStyles.table__title} ${skeletonStyles.skeleton}`}
            />
            <div
              className={`${skeletonStyles.table__icon} ${skeletonStyles.skeleton}`}
            />
          </div>
          <div className={skeletonStyles.table__content}>
            <div className={skeletonStyles.table__headers}>
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className={`${skeletonStyles.table__header__item} ${skeletonStyles.skeleton}`}
                />
              ))}
            </div>
            {[...Array(15)].map((_, index) => (
              <div key={index} className={skeletonStyles.table__row}>
                <div
                  className={`${skeletonStyles.table__cell} ${skeletonStyles.skeleton}`}
                />
                <div className={skeletonStyles.table__cell__with__avatar}>
                  <div
                    className={`${skeletonStyles.table__avatar} ${skeletonStyles.skeleton}`}
                  />
                  <div
                    className={`${skeletonStyles.table__name} ${skeletonStyles.skeleton}`}
                  />
                </div>
                <div
                  className={`${skeletonStyles.table__cell} ${skeletonStyles.skeleton}`}
                />
                <div
                  className={`${skeletonStyles.table__cell} ${skeletonStyles.skeleton}`}
                />
                <div
                  className={`${skeletonStyles.table__cell} ${skeletonStyles.skeleton}`}
                />
                <div className={skeletonStyles.table__cell__stars}>
                  {[...Array(5)].map((_, starIndex) => (
                    <div
                      key={starIndex}
                      className={`${skeletonStyles.start__skeleton} ${skeletonStyles.skeleton}`}
                    />
                  ))}
                </div>
                <div
                  className={`${skeletonStyles.table__cell__badge} ${skeletonStyles.skeleton}`}
                />
                <div className={skeletonStyles.table__cell__action}>
                  <div
                    className={`${skeletonStyles.action__button} ${skeletonStyles.skeleton}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*==================== End of Passengers Table Skeleton ====================*/}

      {/*==================== Pagination Section Skeleton ====================*/}
      <div className={styles.pagination__section}>
        <div
          className={`${skeletonStyles.pagination__info} ${skeletonStyles.skeleton}`}
        />
        <div className={skeletonStyles.pagination__controls}>
          <div
            className={`${skeletonStyles.pagination__button} ${skeletonStyles.skeleton}`}
          />
          <div
            className={`${skeletonStyles.pagination__button} ${skeletonStyles.skeleton}`}
          />
          <div
            className={`${skeletonStyles.pagination__button} ${skeletonStyles.skeleton}`}
          />
          <div
            className={`${skeletonStyles.pagination__button} ${skeletonStyles.skeleton}`}
          />
          <div
            className={`${skeletonStyles.pagination__button} ${skeletonStyles.skeleton}`}
          />
          <div
            className={`${skeletonStyles.pagination__button} ${skeletonStyles.skeleton}`}
          />
        </div>
      </div>
      {/*==================== End of Pagination Section Skeleton ====================*/}
    </div>
  );
};

export default PassengersSkeleton;
