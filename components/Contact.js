import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { Send, Mail, Linkedin, Instagram } from 'lucide-react';

const socialLinks = [
    {
        key: 'telegram',
        icon: Send,
        href: 'https://t.me/T6rabek',
        handle: '@T6rabek',
        gradient: 'from-blue-400 to-blue-600',
    },
    {
        key: 'email',
        icon: Mail,
        href: 'mailto:t6rabek.raufov@gmail.com',
        handle: 't6rabek.raufov@gmail.com',
        gradient: 'from-accent-purple to-accent-pink',
    },
    {
        key: 'linkedin',
        icon: Linkedin,
        href: 'https://linkedin.com/in/t6rabek',
        handle: 'linkedin.com/in/t6rabek',
        gradient: 'from-blue-600 to-blue-800',
    },
    {
        key: 'instagram',
        icon: Instagram,
        href: 'https://instagram.com/t6rabek_',
        handle: '@t6rabek_',
        gradient: 'from-pink-500 via-red-500 to-yellow-500',
    },
];

const Contact = () => {
    const { t } = useTranslation('common');

    return (
        <section id="contact" className="section relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-purple/20 rounded-full blur-3xl" />

            <div className="container mx-auto relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-block px-4 py-2 rounded-full bg-accent-purple/10 text-accent-purple text-sm font-medium mb-4">
                            {t('contact_label')}
                        </motion.span>
                        <h2 className="section-title text-gradient">{t('contact_title')}</h2>
                        <p className="section-subtitle mx-auto">{t('contact_subtitle')}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <motion.a key={social.key} href={social.href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className="social-link group">
                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${social.gradient}`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm text-light-muted dark:text-dark-muted">{t(`contact_${social.key}`)}</p>
                                        <p className="font-medium text-light-text dark:text-dark-text group-hover:text-accent-purple transition-colors">{social.handle}</p>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-12">
                        <p className="text-light-muted dark:text-dark-muted mb-6">{t('contact_cta_text')}</p>
                        <motion.a href="https://t.me/T6rabek" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary inline-flex items-center gap-2">
                            <Send className="w-5 h-5" />
                            {t('contact_cta_button')}
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
