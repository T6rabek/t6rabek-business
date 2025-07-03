import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout'; // Import the new Layout component

function MyApp({ Component, pageProps }) {
  return (
    // The Layout component now wraps every page
    <Layout>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </Layout>
  );
}

export default appWithTranslation(MyApp);
