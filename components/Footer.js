import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation('common');

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-light-bg dark:bg-dark-bg border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left"
        >
          {t('footer_tagline')}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={handleScrollToTop}
          className="mt-4 sm:mt-0 flex items-center text-sm font-semibold text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors"
          aria-label={t('footer_btt')}
        >
          {t('footer_btt')}
          <ArrowUp className="ml-2 w-4 h-4" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
