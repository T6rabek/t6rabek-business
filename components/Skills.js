import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { Code, Plane, Languages } from 'lucide-react';

const skillCategories = [
    {
        key: 'development',
        icon: Code,
        gradient: 'from-accent-purple to-accent-violet',
        skills: ['websites', 'platforms', 'telegram_bots', 'problem_solving'],
    },
    {
        key: 'tourism',
        icon: Plane,
        gradient: 'from-accent-cyan to-accent-blue',
        skills: ['organizing_trips', 'local_expertise', 'cultural_guide'],
    },
    {
        key: 'languages',
        icon: Languages,
        gradient: 'from-accent-pink to-accent-purple',
        skills: ['uzbek', 'english', 'russian', 'learning_german', 'learning_arabic'],
    },
];

const SkillCard = ({ category, index }) => {
    const { t } = useTranslation('common');
    const Icon = category.icon;

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }} className="relative group">
            <div className="glass-card p-6 h-full">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.gradient} mb-5`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4">
                    {t(`skills_${category.key}_title`)}
                </h3>

                <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                        <span key={skill} className="skill-badge">{t(`skill_${skill}`)}</span>
                    ))}
                </div>
            </div>

            <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl blur-xl -z-10`} />
        </motion.div>
    );
};

const Skills = () => {
    const { t } = useTranslation('common');

    return (
        <section id="skills" className="section relative overflow-hidden bg-light-card/50 dark:bg-dark-card/30">
            <div className="absolute inset-0 bg-grid" />

            <div className="container mx-auto relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-block px-4 py-2 rounded-full bg-accent-pink/10 text-accent-pink text-sm font-medium mb-4">
                        {t('skills_label')}
                    </motion.span>
                    <h2 className="section-title text-gradient">{t('skills_title')}</h2>
                    <p className="section-subtitle mx-auto">{t('skills_subtitle')}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {skillCategories.map((category, index) => (
                        <SkillCard key={category.key} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
