import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { MapPin, Rocket, Heart } from 'lucide-react';

const About = () => {
    const { t } = useTranslation('common');

    const highlights = [
        { icon: MapPin, key: 'location', color: 'text-accent-purple' },
        { icon: Rocket, key: 'passion', color: 'text-accent-cyan' },
        { icon: Heart, key: 'approach', color: 'text-accent-pink' },
    ];

    return (
        <section id="about" className="section relative overflow-hidden">
            <div className="absolute inset-0 bg-dots opacity-50" />

            <div className="container mx-auto relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-block px-4 py-2 rounded-full bg-accent-cyan/10 text-accent-cyan text-sm font-medium mb-4">
                            {t('about_label')}
                        </motion.span>
                        <h2 className="section-title text-gradient">{t('about_title')}</h2>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-card p-8 md:p-12">
                        <p className="text-lg md:text-xl leading-relaxed text-light-text dark:text-dark-text mb-8">
                            {t('about_intro')}
                        </p>

                        <p className="text-base md:text-lg leading-relaxed text-light-muted dark:text-dark-muted mb-8">
                            {t('about_story')}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            {highlights.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div key={item.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + index * 0.1 }} className="flex items-start gap-3 p-4 rounded-xl bg-white/50 dark:bg-white/5">
                                        <Icon className={`w-5 h-5 ${item.color} mt-0.5 flex-shrink-0`} />
                                        <p className="text-sm text-light-text dark:text-dark-text">{t(`about_highlight_${item.key}`)}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
