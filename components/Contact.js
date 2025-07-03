import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Github, Send } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation('common');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const socialLinks = [
    {
      icon: <Linkedin />,
      href: 'https://linkedin.com/in/your-profile',
      label: 'LinkedIn',
    },
    {
      icon: <Github />,
      href: 'https://github.com/your-profile',
      label: 'GitHub',
    },
    { icon: <Send />, href: 'https://t.me/your-profile', label: 'Telegram' },
  ];

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 bg-white dark:bg-dark-surface"
    >
      <motion.div
        className="container mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-light-text dark:text-dark-text"
        >
          {t('connect_title')}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto mb-12"
        >
          {t('connect_desc')}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form
              action="https://formspree.io/f/your_form_id"
              method="POST"
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="sr-only">
                  {t('contact_form_name')}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={t('contact_form_name')}
                  required
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:border-light-accent dark:focus:border-dark-accent text-light-text dark:text-dark-text"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  {t('contact_form_email')}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t('contact_form_email')}
                  required
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:border-light-accent dark:focus:border-dark-accent text-light-text dark:text-dark-text"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  {t('contact_form_message')}
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  placeholder={t('contact_form_message')}
                  required
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:border-light-accent dark:focus:border-dark-accent text-light-text dark:text-dark-text"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-light-accent dark:bg-dark-accent text-white font-bold rounded-lg shadow-lg hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                {t('contact_form_submit')} <Send className="ml-2 w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info & Socials */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex items-start">
              <div className="p-3 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full mr-4">
                <Mail className="w-6 h-6 text-light-accent dark:text-dark-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                  {t('contact_info_email')}
                </h3>
                <a
                  href={`mailto:${t('contact_info_email_value')}`}
                  className="text-lg text-gray-600 dark:text-gray-400 hover:underline"
                >
                  {t('contact_info_email_value')}
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-3 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full mr-4">
                <MapPin className="w-6 h-6 text-light-accent dark:text-dark-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                  {t('contact_info_location')}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {t('contact_info_location_value')}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">
                Follow Me
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full text-light-text dark:text-dark-text hover:bg-light-accent dark:hover:bg-dark-accent hover:text-white dark:hover:text-white transition-colors duration-300"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
