import React from 'react';

import styles from '@/src/styles/dashboard/DashboardPage.module.css';
import skeletonStyles from '@/src/styles/dashboard/DashboardSkeleton.module.css';

const DashboardSkeleton = () => {
  return (
    <div className={styles.dashboard}>
      {/*==================== Row 1: Stats Cards Skeleton ====================*/}
      <div className={styles.stats__grid}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className={`${skeletonStyles.stats__card}`}>
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
      {/*==================== End of Row 1: Stats Cards Skeleton ====================*/}

      {/*==================== Map Section Skeleton ====================*/}
      <div className={styles.mapContainer}>
        <div className={styles.map}>
          <div className={skeletonStyles.map__skeleton}>
            {/*==================== Map Header ====================*/}
            <div className={skeletonStyles.map__header}>
              <div
                className={`${skeletonStyles.map__title} ${skeletonStyles.skeleton}`}
              />
              <div className={skeletonStyles.map__status}>
                <div
                  className={`${skeletonStyles.driver__count} ${skeletonStyles.skeleton}`}
                />
                <div
                  className={`${skeletonStyles.connection__status} ${skeletonStyles.skeleton}`}
                />
              </div>
            </div>
            {/*==================== End of Map Header ====================*/}
          </div>
        </div>
      </div>
      {/*==================== End of Map Section Skeleton ====================*/}

      {/*==================== Row 2: Chart Left, Driver Widgets Right ====================*/}
      <div className={styles.chart__row}>
        {/*==================== Revenue Chart Skeleton ====================*/}
        <div className={styles.chart__section}>
          <div className={skeletonStyles.chart__container}>
            <div className={skeletonStyles.chart__header}>
              <div
                className={`${skeletonStyles.chart__title} ${skeletonStyles.skeleton}`}
              />
              <div
                className={`${skeletonStyles.chart__icon} ${skeletonStyles.skeleton}`}
              />
            </div>
            <div
              className={`${skeletonStyles.chart__content} ${skeletonStyles.skeleton}`}
            />
          </div>
        </div>
        {/*==================== End of Revenue Chart Skeleton ====================*/}

        {/*==================== Driver Widgets Column ====================*/}
        <div className={styles.driver__widgets}>
          {/*==================== Top Driver Widget Skeleton ====================*/}
          <div className={styles.widget}>
            <div className={skeletonStyles.widget__container}>
              <div className={skeletonStyles.widget__header}>
                <div
                  className={`${skeletonStyles.widget__title} ${skeletonStyles.skeleton}`}
                />
                <div
                  className={`${skeletonStyles.widget__icon} ${skeletonStyles.skeleton}`}
                />
              </div>
              <div className={skeletonStyles.top__driver__content}>
                <div className={skeletonStyles.driver__avatar__section}>
                  <div
                    className={`${skeletonStyles.driver__avatar} ${skeletonStyles.skeleton}`}
                  />
                </div>
                <div
                  className={`${skeletonStyles.driver__name} ${skeletonStyles.skeleton}`}
                />
                <div
                  className={`${skeletonStyles.driver__rating} ${skeletonStyles.skeleton}`}
                />
                <div
                  className={`${skeletonStyles.driver__rides} ${skeletonStyles.skeleton}`}
                />
              </div>
            </div>
          </div>
          {/*==================== End of Top Driver Widget Skeleton ====================*/}

          {/*==================== Driver Status Widget Skeleton ====================*/}
          <div className={styles.widget}>
            <div className={skeletonStyles.widget__container}>
              <div className={skeletonStyles.widget__header}>
                <div className={skeletonStyles.widget__title} />
                <div className={skeletonStyles.widget__icon} />
              </div>
              <div className={skeletonStyles.driver__status__content}>
                <div
                  className={`${skeletonStyles.status__count} ${skeletonStyles.skeleton}`}
                />
                <div
                  className={`${skeletonStyles.status__label} ${skeletonStyles.skeleton}`}
                />
              </div>
            </div>
          </div>
          {/*==================== End of Driver Status Widget Skeleton ====================*/}
        </div>
        {/*==================== End of Driver Widgets Column ====================*/}
      </div>
      {/*==================== End of Row 2 ====================*/}

      {/*==================== Row 3: Recent Transactions Skeleton ====================*/}
      <div className={styles.full__width__section}>
        <div className={styles.table__with__icon}>
          <div className={skeletonStyles.table__container}>
            <div className={skeletonStyles.table__header}>
              <div
                className={`${skeletonStyles.table__title} ${skeletonStyles.skeleton}`}
              />
              <div className={skeletonStyles.widget__icon} />
            </div>
            <div className={skeletonStyles.table__content}>
              <div className={skeletonStyles.table__headers}>
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className={`${skeletonStyles.table__header__item} ${skeletonStyles.skeleton}`}
                  />
                ))}
              </div>
              {[...Array(8)].map((_, index) => (
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/*==================== End of Row 3: Recent Transactions Skeleton ====================*/}

      {/*==================== Row 4: Stats Widgets Left, Pending Applications Right ====================*/}
      <div className={styles.final__row}>
        {/*==================== Stats Widgets Skeleton ====================*/}
        <div className={styles.stats__widgets}>
          {/*==================== Document Alerts Widget Skeleton ====================*/}
          <div className={styles.widget}>
            <div className={skeletonStyles.widget__container}>
              <div className={skeletonStyles.widget__header}>
                <div className={skeletonStyles.widget__title} />
                <div className={skeletonStyles.widget__icon} />
              </div>
              <div className={skeletonStyles.alerts__content}>
                <div className={skeletonStyles.main__stat}>
                  <div
                    className={`${skeletonStyles.main__count} ${skeletonStyles.skeleton}`}
                  />
                  <div
                    className={`${skeletonStyles.main__label} ${skeletonStyles.skeleton}`}
                  />
                </div>
                <div className={skeletonStyles.breakdown}>
                  <div className={skeletonStyles.breakdown__item}>
                    <div
                      className={`${skeletonStyles.indicator} ${skeletonStyles.skeleton}`}
                    />
                    <div
                      className={`${skeletonStyles.breakdown__text} ${skeletonStyles.skeleton}`}
                    />
                  </div>
                  <div className={skeletonStyles.breakdown__item}>
                    <div
                      className={`${skeletonStyles.indicator} ${skeletonStyles.skeleton}`}
                    />
                    <div
                      className={`${skeletonStyles.breakdown__text} ${skeletonStyles.skeleton}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*==================== End of Document Alerts Widget Skeleton ====================*/}

          {/*==================== Driver Application Stats Widget Skeleton ====================*/}
          <div className={styles.widget}>
            <div className={skeletonStyles.widget__container}>
              <div className={skeletonStyles.widget__header}>
                <div className={skeletonStyles.widget__title} />
                <div className={skeletonStyles.widget__icon} />
              </div>
              <div className={skeletonStyles.application__stats__content}>
                <div className={skeletonStyles.main__stat}>
                  <div className={skeletonStyles.main__count} />
                  <div className={skeletonStyles.main__label} />
                </div>
                <div className={skeletonStyles.breakdown}>
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className={skeletonStyles.breakdown__item}>
                      <div className={skeletonStyles.stat__section}>
                        <div
                          className={`${skeletonStyles.stat__icon} ${skeletonStyles.skeleton}`}
                        />
                        <div
                          className={`${skeletonStyles.status__count} ${skeletonStyles.skeleton}`}
                        />
                      </div>
                      <div
                        className={`${skeletonStyles.breakdown__text} ${skeletonStyles.skeleton}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/*==================== End of Driver Application Stats Widget Skeleton ====================*/}
        </div>
        {/*==================== End of Stats Widgets Skeleton ====================*/}

        {/*==================== Pending Applications Section Skeleton ====================*/}
        <div className={styles.pending__section}>
          <div className={styles.table__with__pending__icon}>
            <div className={skeletonStyles.table__container}>
              <div className={skeletonStyles.table__header}>
                <div className={skeletonStyles.table__title} />
                <div className={skeletonStyles.widget__icon} />
              </div>
              <div className={skeletonStyles.table__content}>
                <div className={skeletonStyles.table__headers}>
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className={skeletonStyles.table__header__item}
                    />
                  ))}
                </div>
                {[...Array(6)].map((_, index) => (
                  <div key={index} className={skeletonStyles.table__row}>
                    <div className={skeletonStyles.table__cell} />
                    <div className={skeletonStyles.table__cell__with__avatar}>
                      <div className={skeletonStyles.table__avatar} />
                      <div className={skeletonStyles.table__name} />
                    </div>
                    <div className={skeletonStyles.table__cell} />
                    <div className={skeletonStyles.table__cell} />
                    <div className={skeletonStyles.table__cell__actions}>
                      <div
                        className={`${skeletonStyles.action__button} ${skeletonStyles.skeleton}`}
                      />
                      <div
                        className={`${skeletonStyles.action__button} ${skeletonStyles.skeleton}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/*==================== End of Pending Applications Section Skeleton ====================*/}
      </div>
      {/*==================== End of Row 4 ====================*/}
    </div>
  );
};

export default DashboardSkeleton;
