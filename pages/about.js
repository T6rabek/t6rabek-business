import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import AboutPageContent from '../components/AboutPageContent';

export default function AboutPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>
          {t('nav_about')} | {t('hero_name')}
        </title>
        <meta name="description" content={t('about_bio')} />
        <meta
          property="og:title"
          content={`${t('nav_about')} | ${t('hero_name')}`}
        />
        <meta property="og:description" content={t('about_bio')} />
      </Head>
      <AboutPageContent />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
