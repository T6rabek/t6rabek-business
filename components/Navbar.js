import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [theme, setTheme] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.classList.toggle(
        'dark',
        initialTheme === 'dark'
      );
    }
  }, []);

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const handleLanguageChange = locale => {
    router.push(router.pathname, router.asPath, { locale });
    setIsLangOpen(false);
  };

  const locales = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'uz', name: 'Oʻzbekcha', flag: '🇺🇿' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  const navLinks = [
    { href: '/about', label: t('nav_about') },
    { href: '/vision', label: t('nav_mission') },
    { href: '/journey', label: t('nav_journey') },
    { href: '/contact', label: t('nav_connect') },
  ];

  useEffect(() => {
    document.documentElement.dir = router.locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = router.locale;
  }, [router.locale]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-lg shadow-md"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="font-bold text-xl text-light-text dark:text-dark-text">
            To'rabek Raufov
          </a>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} legacyBehavior>
              <a
                className={`pb-1 border-b-2 ${
                  router.pathname === link.href
                    ? 'border-light-accent dark:border-dark-accent'
                    : 'border-transparent'
                } text-light-text dark:text-dark-text hover:border-light-accent dark:hover:border-dark-accent transition-all`}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Globe className="text-light-text dark:text-dark-text" />
            </button>
            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-12 right-0 ltr:right-0 rtl:left-0 bg-white dark:bg-dark-surface rounded-lg shadow-xl py-2 w-40"
              >
                {locales.map(locale => (
                  <button
                    key={locale.code}
                    onClick={() => handleLanguageChange(locale.code)}
                    className="w-full text-left px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                  >
                    <span className="mr-2">{locale.flag}</span> {locale.name}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          <button
            onClick={handleThemeChange}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="text-light-text" />
            ) : (
              <Sun className="text-dark-text" />
            )}
          </button>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? (
                <X className="text-light-text dark:text-dark-text" />
              ) : (
                <Menu className="text-light-text dark:text-dark-text" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white/90 dark:bg-dark-surface/90 backdrop-blur-lg"
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} legacyBehavior>
                <a
                  onClick={closeMenu}
                  className="text-lg text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
