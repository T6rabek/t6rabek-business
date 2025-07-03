import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import JourneyPageContent from '../components/JourneyPageContent';

export default function JourneyPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>
          {t('nav_journey')} | {t('hero_name')}
        </title>
        <meta
          name="description"
          content="Explore the key milestones in my professional and academic journey."
        />
        <meta
          property="og:title"
          content={`${t('nav_journey')} | ${t('hero_name')}`}
        />
        <meta
          property="og:description"
          content="Explore the key milestones in my professional and academic journey."
        />
      </Head>
      <JourneyPageContent />
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
