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

// *** IMPORTANT CHANGE: Switched from getStaticProps to getServerSideProps ***
export async function getServerSideProps({ locale, res }) {
  // If the current locale is not English, and we have a response object (meaning it's a server-side render)
  // then we perform a redirect.
  if (locale !== 'en' && res) {
    res.setHeader('location', '/en'); // Set the Location header for the redirect
    res.statusCode = 302; // Set the status code to 302 (Found/Temporary Redirect)
    res.end(); // End the response, sending the redirect
    return { props: {} }; // Return empty props as the page won't be rendered
  }

  // If the locale is already 'en', or if the redirect has happened,
  // then load the English (or whatever the locale is now after redirect) translations.
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // You can pass additional props to your Home component here if needed
    },
  };
}
