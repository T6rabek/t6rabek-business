import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [theme, setTheme] = useState('dark');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const themeToUse = savedTheme || 'dark';
        setTheme(themeToUse);
        document.documentElement.classList.add('dark');

        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleThemeChange = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark');
    };

    const handleLanguageChange = (locale) => {
        router.push(router.pathname, router.asPath, { locale });
        setIsLangOpen(false);
    };

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const locales = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'uz', name: 'Oʻzbekcha', flag: '🇺🇿' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    ];

    const navLinks = [
        { id: 'about', label: t('nav_about') },
        { id: 'projects', label: t('nav_projects') },
        { id: 'skills', label: t('nav_skills') },
        { id: 'contact', label: t('nav_contact') },
    ];

    return (
        <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" legacyBehavior>
                    <a className="font-bold text-xl"><span className="text-gradient">T6rabek</span></a>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-light-muted dark:text-dark-muted hover:text-accent-purple transition-colors font-medium">
                            {link.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsLangOpen(!isLangOpen)} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-accent-purple/50 transition-colors">
                            <Globe className="w-5 h-5 text-light-muted dark:text-dark-muted" />
                        </motion.button>

                        <AnimatePresence>
                            {isLangOpen && (
                                <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} className="absolute top-14 right-0 glass-card py-2 min-w-[140px]">
                                    {locales.map((locale) => (
                                        <button key={locale.code} onClick={() => handleLanguageChange(locale.code)} className={`w-full text-left px-4 py-2 text-sm hover:bg-accent-purple/10 transition-colors flex items-center gap-2 ${router.locale === locale.code ? 'text-accent-purple' : 'text-light-text dark:text-dark-text'}`}>
                                            <span>{locale.flag}</span> {locale.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleThemeChange} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-accent-purple/50 transition-colors">
                        {theme === 'light' ? <Moon className="w-5 h-5 text-light-muted" /> : <Sun className="w-5 h-5 text-dark-muted" />}
                    </motion.button>

                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:border-accent-purple/50 transition-colors">
                        {isMenuOpen ? <X className="w-5 h-5 text-light-muted dark:text-dark-muted" /> : <Menu className="w-5 h-5 text-light-muted dark:text-dark-muted" />}
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden glass-nav border-t border-white/10">
                        <div className="flex flex-col items-center py-6 space-y-4">
                            {navLinks.map((link) => (
                                <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-lg text-light-text dark:text-dark-text hover:text-accent-purple transition-colors">
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
