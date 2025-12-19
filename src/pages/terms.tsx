import Head from 'next/head';
import Image from 'next/image';

import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/Terms.module.css';

const Terms = () => {
  const { t } = useTranslation('terms');

  const userResponsibilities = t('terms.sections.userResponsibilities.list', {
    returnObjects: true,
  }) as string[];

  const prohibitedActivities = t('terms.sections.prohibitedActivities.list', {
    returnObjects: true,
  }) as string[];

  return (
    <>
      <Head>
        <title>{t('terms.title')} | Trygg Admin</title>
        <meta name="description" content={t('terms.description')} />
      </Head>

      <div className={styles.container}>
        {/*==================== Header Section ====================*/}
        <div className={styles.header}>
          <div className={styles.logo__section}>
            <Image
              width={60}
              height={60}
              src="/icon.png"
              alt="Trygg Logo"
              className={styles.logo}
            />
            <h1 className={styles.main__title}>{t('terms.title')}</h1>
            <p className={styles.last__updated}>{t('terms.lastUpdated')}</p>
          </div>
        </div>
        {/*==================== End of Header Section ====================*/}

        {/*==================== Content Section ====================*/}
        <div className={styles.content}>
          {/*==================== Introduction ====================*/}
          <section className={styles.section}>
            <h2 className={styles.section__title}>
              {t('terms.sections.introduction.title')}
            </h2>
            <p className={styles.paragraph}>
              {t('terms.sections.introduction.text')}
            </p>
          </section>
          {/*==================== End of Introduction ====================*/}

          {/*==================== Acceptance of Terms ====================*/}
          <section className={styles.section}>
            <h2 className={styles.section__title}>
              {' '}
              {t('terms.sections.acceptance.title')}
            </h2>
            <p className={styles.paragraph}>
              {t('terms.sections.acceptance.text')}
            </p>
          </section>
          {/*==================== End of Acceptance of Terms ====================*/}

          {/*==================== Platform Access ====================*/}
          <section className={styles.section}>
            <h2 className={styles.section__title}>
              {' '}
              {t('terms.sections.platformAccess.title')}
            </h2>
            <div className={styles.subsection}>
              <h3 className={styles.subsection__title}>
                {' '}
                {t('terms.sections.platformAccess.authorization.title')}
              </h3>
              <p className={styles.paragraph}>
                {t('terms.sections.platformAccess.authorization.text')}
              </p>
            </div>
            <div className={styles.subsection}>
              <h3 className={styles.subsection__title}>
                {t('terms.sections.platformAccess.accountSecurity.title')}
              </h3>
              <p className={styles.paragraph}>
                {t('terms.sections.platformAccess.accountSecurity.text')}
              </p>
            </div>
          </section>
          {/*==================== End of Platform Access ====================*/}

          {/*==================== Data Management ====================*/}
          <section className={styles.section}>
            <h2 className={styles.section__title}>
              {t('terms.sections.dataManagement.title')}
            </h2>
            <div className={styles.subsection}>
              <h3 className={styles.subsection__title}>
                {' '}
                {t('terms.sections.dataManagement.dataIntegrity.title')}
              </h3>
              <p className={styles.paragraph}>
                {t('terms.sections.dataManagement.dataIntegrity.text')}
              </p>
            </div>
            <div className={styles.subsection}>
              <h3 className={styles.subsection__title}>
                {t('terms.sections.dataManagement.privacyCompliance.title')}
              </h3>
              <p className={styles.paragraph}>
                {t('terms.sections.dataManagement.privacyCompliance.text')}
              </p>
            </div>
          </section>
          {/*==================== End of Data Management ====================*/}

          {/*==================== User Responsibilities ====================*/}
          <section className={styles.section}>
            <h2 className={styles.section__title}>
              {' '}
              {t('terms.sections.userResponsibilities.title')}
            </h2>
            <ul className={styles.list}>
              {userResponsibilities.map((item: string, index: number) => (
                <li key={index} className={styles.list__item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
          {/*==================== End of User Responsibilities ====================*/}

          {/*==================== Prohibited Activities ====================*/}
          <section className={styles.section}>
            <h2 className={styles.section__title}>
              {t('terms.sections.prohibitedActivities.title')}
            </h2>
            <p className={styles.paragraph}>
              {t('terms.sections.prohibitedActivities.intro')}
            </p>
            <ul className={styles.list}>
              {prohibitedActivities.map((item: string, index: number) => (
                <li key={index} className={styles.list__item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
          {/*==================== End of Prohibited Activities ====================*/}

          {/*==================== Limitation of Liability ====================*/}
          <section className={styles.section}>
            <h2 className={styles.section__title}>
              {t('terms.sections.limitationOfLiability.title')}
            </h2>
            <p className={styles.paragraph}>
              {t('terms.sections.limitationOfLiability.text')}
            </p>
          </section>
          {/*==================== End of Limitation of Liability ====================*/}

          {/*==================== Termination ====================*/}
          <section className={styles.section}>
            <h2 className={styles.section__title}>
              {' '}
              {t('terms.sections.termination.title')}
            </h2>
            <p className={styles.paragraph}>
              {t('terms.sections.termination.text')}
            </p>
          </section>
          {/*==================== End of Termination ====================*/}

          {/*==================== Changes to Terms ====================*/}
          <section className={styles.section}>
            <h2 className={styles.section__title}>
              {' '}
              {t('terms.sections.changes.title')}
            </h2>
            <p className={styles.paragraph}>
              {t('terms.sections.changes.text')}
            </p>
          </section>
          {/*==================== End of Changes to Terms ====================*/}

          {/*==================== Contact Information ====================*/}
          <section className={styles.section}>
            <h2 className={styles.section__title}>
              {' '}
              {t('terms.sections.contact.title')}
            </h2>
            <p className={styles.paragraph}>
              {t('terms.sections.contact.text')}
            </p>
          </section>
          {/*==================== End of Contact Information ====================*/}
        </div>
        {/*==================== End of Content Section ====================*/}
      </div>
    </>
  );
};

export default Terms;
