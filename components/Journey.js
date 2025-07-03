import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Flag,
  Code,
  Rocket,
  Star,
} from 'lucide-react';

const Journey = () => {
  const { t } = useTranslation('common');

  const journeyItems = [
    {
      icon: <GraduationCap />,
      title: t('journey_1_title'),
      desc: t('journey_1_desc'),
    },
    {
      icon: <GraduationCap />,
      title: t('journey_2_title'),
      desc: t('journey_2_desc'),
    },
    {
      icon: <Code />,
      title: t('journey_3_title'),
      desc: t('journey_3_desc'),
    },
    {
      icon: <Flag />,
      title: t('journey_4_title'),
      desc: t('journey_4_desc'),
    },
    {
      icon: <Star />,
      title: t('journey_5_title'),
      desc: t('journey_5_desc'),
    },
    {
      icon: <Rocket />,
      title: t('journey_6_title'),
      desc: t('journey_6_desc'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const itemVariantsRtl = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="journey"
      className="py-20 lg:py-32 bg-light-bg dark:bg-dark-bg"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-light-text dark:text-dark-text">
          {t('journey_title')}
        </h2>
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>

          {journeyItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative mb-12 flex items-center justify-between w-full"
              variants={index % 2 === 0 ? itemVariants : itemVariantsRtl}
            >
              {/* Card Left */}
              <div className={`w-5/12 ${index % 2 !== 0 ? 'order-3' : ''}`}>
                <div className="bg-white dark:bg-dark-surface p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-lg mb-2 text-light-accent dark:text-dark-accent">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Icon in the middle */}
              <div className="z-10 flex items-center justify-center w-12 h-12 bg-light-accent dark:bg-dark-accent rounded-full text-white shadow-md">
                {item.icon}
              </div>

              {/* Spacer */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;
