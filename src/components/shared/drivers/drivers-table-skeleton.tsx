import React from 'react';

import styles from '@/src/styles/drivers/DriversPage.module.css';
import skeletonStyles from '@/styles/drivers/DriversSkeleton.module.css';

const DriversTableSkeleton = () => {
  return (
    <>
      {/*==================== Drivers Table Skeleton ====================*/}
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
              {[...Array(8)].map((_, index) => (
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
                <div className={skeletonStyles.table__cell__stars}>
                  {[...Array(5)].map((_, starIndex) => (
                    <div
                      key={starIndex}
                      className={`${skeletonStyles.star__skeleton} ${skeletonStyles.skeleton}`}
                    />
                  ))}
                </div>
                <div className={skeletonStyles.table__cell} />
                <div className={skeletonStyles.table__cell} />
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

      {/*==================== Pagination Section Skeleton ====================*/}
      <div className={styles.pagination__section}>
        <div
          className={`${skeletonStyles.pagination__info} ${skeletonStyles.skeleton}`}
        />
        <div className={skeletonStyles.pagination__controls}>
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={`${skeletonStyles.pagination__button} ${skeletonStyles.skeleton}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DriversTableSkeleton;
