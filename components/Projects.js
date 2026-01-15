import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { ExternalLink, Globe, BookOpen, MessageCircle } from 'lucide-react';

const projects = [
    {
        key: 'tourfixer',
        icon: Globe,
        link: 'https://tourfixer.uz',
        gradient: 'from-accent-purple to-accent-pink',
        status: 'live',
    },
    {
        key: 'txielts',
        icon: BookOpen,
        link: 'https://txielts.uz',
        gradient: 'from-accent-cyan to-accent-blue',
        status: 'live',
    },
    {
        key: 'quizzuz',
        icon: MessageCircle,
        link: 'https://t.me/quizzuz_bot',
        gradient: 'from-accent-pink to-accent-purple',
        status: 'live',
    },
];

const ProjectCard = ({ project, index }) => {
    const { t } = useTranslation('common');
    const Icon = project.icon;

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="project-card group">
            <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10 blur-xl`} />

            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${project.gradient} mb-4`}>
                <Icon className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">
                {t(`project_${project.key}_title`)}
            </h3>

            <p className="text-light-muted dark:text-dark-muted mb-3 text-sm">
                {t(`project_${project.key}_role`)}
            </p>

            <p className="text-light-text/80 dark:text-dark-text/80 mb-4 leading-relaxed">
                {t(`project_${project.key}_desc`)}
            </p>

            <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    {t(`project_status_${project.status}`)}
                </span>

                <motion.a href={project.link} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={`p-2 rounded-lg bg-gradient-to-r ${project.gradient} text-white`}>
                    <ExternalLink className="w-4 h-4" />
                </motion.a>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const { t } = useTranslation('common');

    return (
        <section id="projects" className="section relative overflow-hidden">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />

            <div className="container mx-auto relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="inline-block px-4 py-2 rounded-full bg-accent-purple/10 text-accent-purple text-sm font-medium mb-4">
                        {t('projects_label')}
                    </motion.span>
                    <h2 className="section-title text-gradient">{t('projects_title')}</h2>
                    <p className="section-subtitle mx-auto">{t('projects_subtitle')}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.key} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
