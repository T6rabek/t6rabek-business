import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

const About = () => {
  const { t } = useTranslation('common');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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

  const facts = [
    t('about_fun_fact_1'),
    t('about_fun_fact_2'),
    t('about_fun_fact_3'),
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-light-bg dark:bg-dark-bg">
      <motion.div
        className="container mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-light-text dark:text-dark-text"
        >
          {t('about_title')}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-light-accent dark:border-dark-accent">
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop"
                alt="To'rabek Raufov Profile Picture"
                layout="fill"
                objectFit="cover"
                className="transform hover:scale-110 transition-transform duration-500"
              />
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              {t('about_bio')}
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">
                {t('about_fun_facts_title')}
              </h3>
              <ul className="space-y-2">
                {facts.map((fact, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-light-accent dark:text-dark-accent" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {fact}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
