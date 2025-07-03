import { useTranslation } from 'next-i18next';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Flag,
  Code,
  Rocket,
  Star,
} from 'lucide-react';
import { useRef } from 'react';

const JourneyItem = ({ item, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['center end', 'center center'],
  });

  return (
    <div ref={ref} className="relative mb-12 flex items-start w-full">
      {/* Mobile and Desktop Timeline Icon */}
      <figure className="absolute left-6 md:left-1/2 -translate-x-1/2">
        <motion.div
          style={{ scale: scrollYProgress }}
          className="z-10 flex items-center justify-center w-12 h-12 bg-light-accent dark:bg-dark-accent rounded-full text-white shadow-md"
        >
          {item.icon}
        </motion.div>
      </figure>

      {/* Desktop Card */}
      <motion.div
        style={{
          opacity: scrollYProgress,
          x:
            index % 2 === 0
              ? `calc(-50% + ${scrollYProgress.get() * 50}%)`
              : `calc(50% - ${scrollYProgress.get() * 50}%)`,
        }}
        className={`hidden md:block w-5/12 ${
          index % 2 === 0 ? 'ml-auto' : 'mr-auto'
        }`}
      >
        <div className="p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface hover:shadow-xl transition-shadow duration-300">
          <h3 className="font-bold text-lg mb-2 text-light-accent dark:text-dark-accent">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {item.desc}
          </p>
        </div>
      </motion.div>

      {/* Mobile Card */}
      <motion.div
        style={{ opacity: scrollYProgress, x: scrollYProgress.get() * 20 }}
        className="block md:hidden w-full ml-20"
      >
        <div className="p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface">
          <h3 className="font-bold text-md mb-1 text-light-accent dark:text-dark-accent">
            {item.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {item.desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const JourneyPageContent = () => {
  const { t } = useTranslation('common');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
    { icon: <Code />, title: t('journey_3_title'), desc: t('journey_3_desc') },
    { icon: <Flag />, title: t('journey_4_title'), desc: t('journey_4_desc') },
    { icon: <Star />, title: t('journey_5_title'), desc: t('journey_5_desc') },
    {
      icon: <Rocket />,
      title: t('journey_6_title'),
      desc: t('journey_6_desc'),
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-light-text dark:text-dark-text mb-4">
            {t('journey_title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From academic foundations to entrepreneurial ventures, this is my
            story of growth and execution.
          </p>
        </div>

        <div ref={ref} className="relative max-w-3xl mx-auto">
          {/* Animated Timeline Line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 w-1 h-full bg-light-accent dark:bg-dark-accent origin-top rounded-full"
          />

          <div>
            {journeyItems.map((item, index) => (
              <JourneyItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyPageContent;
