import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Hero from '../components/Hero';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <div>
      <Head>
        <title>
          {t('hero_name')} | {t('hero_tagline')}
        </title>
        <meta name="description" content={t('hero_bio')} />
        <meta
          property="og:title"
          content={`${t('hero_name')} | ${t('hero_tagline')}`}
        />
        <meta property="og:description" content={t('hero_bio')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://t6rabek.dev" />
        <meta property="og:image" content="https://t6rabek.dev/og-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Hero />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
