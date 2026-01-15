import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { ArrowUp, Heart, Send, Linkedin } from 'lucide-react';

const Footer = () => {
    const { t } = useTranslation('common');
    const currentYear = new Date().getFullYear();

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: Send, href: 'https://t.me/T6rabek', label: 'Telegram' },
        { icon: Linkedin, href: 'https://linkedin.com/in/t6rabek', label: 'LinkedIn' },
    ];

    return (
        <footer className="relative bg-light-card dark:bg-dark-surface border-t border-gray-200 dark:border-white/5">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center md:text-left">
                        <p className="font-bold text-xl text-gradient mb-2">T6rabek</p>
                        <p className="text-sm text-light-muted dark:text-dark-muted">© {currentYear} To'rabek Raufov. {t('footer_rights')}</p>
                    </motion.div>

                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex items-center gap-2 text-sm text-light-muted dark:text-dark-muted">
                        {t('footer_made_with')} <Heart className="w-4 h-4 text-accent-pink fill-accent-pink" /> {t('footer_in_samarkand')}
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex items-center gap-4">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-accent-purple/50 text-light-muted dark:text-dark-muted hover:text-accent-purple transition-all" aria-label={social.label}>
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            );
                        })}

                        <motion.button onClick={handleScrollToTop} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} className="p-2 rounded-xl bg-accent-purple/10 border border-accent-purple/20 text-accent-purple hover:bg-accent-purple hover:text-white transition-all" aria-label={t('footer_btt')}>
                            <ArrowUp className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
