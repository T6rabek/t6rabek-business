import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import VisionPageContent from '../components/VisionPageContent';

export default function VisionPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>
          {t('nav_mission')} | {t('hero_name')}
        </title>
        <meta name="description" content={t('mission_bio')} />
        <meta
          property="og:title"
          content={`${t('nav_mission')} | ${t('hero_name')}`}
        />
        <meta property="og:description" content={t('mission_bio')} />
      </Head>
      <VisionPageContent />
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
