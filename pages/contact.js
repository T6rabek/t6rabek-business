import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import ContactPageContent from '../components/ContactPageContent';

export default function ContactPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>
          {t('nav_connect')} | {t('hero_name')}
        </title>
        <meta name="description" content={t('connect_desc')} />
        <meta
          property="og:title"
          content={`${t('nav_connect')} | ${t('hero_name')}`}
        />
        <meta property="og:description" content={t('connect_desc')} />
      </Head>
      <ContactPageContent />
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
