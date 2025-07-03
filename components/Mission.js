import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

const Mission = () => {
  const { t } = useTranslation('common');

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0, 0.71, 0.2, 1.01],
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="mission"
      className="py-20 lg:py-32 bg-white dark:bg-dark-surface"
    >
      <motion.div
        className="container mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <div className="p-4 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full">
            <Rocket className="w-10 h-10 text-light-accent dark:text-dark-accent" />
          </div>
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold mb-6 text-light-text dark:text-dark-text"
        >
          {t('mission_title')}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          {t('mission_bio')}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Mission;
