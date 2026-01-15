import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, TorusKnot, Sphere } from '@react-three/drei';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import Image from 'next/image';

const AnimatedBackground = () => {
    const torusRef = useRef();
    const sphereRef = useRef();

    useFrame((state, delta) => {
        if (torusRef.current) {
            torusRef.current.rotation.x += delta * 0.1;
            torusRef.current.rotation.y += delta * 0.15;
        }
        if (sphereRef.current) {
            sphereRef.current.rotation.y += delta * 0.05;
            sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#a855f7" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <TorusKnot ref={torusRef} args={[1, 0.3, 128, 16]} position={[3, 0, -5]}>
                <meshStandardMaterial color="#a855f7" emissive="#6b21a8" emissiveIntensity={0.3} wireframe transparent opacity={0.4} />
            </TorusKnot>
            <Sphere ref={sphereRef} args={[0.8, 32, 32]} position={[-3, 0, -3]}>
                <meshStandardMaterial color="#06b6d4" emissive="#0e7490" emissiveIntensity={0.3} wireframe transparent opacity={0.3} />
            </Sphere>
        </>
    );
};

const Hero = () => {
    const { t } = useTranslation('common');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } },
    };

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {isMounted && (
                <div className="absolute inset-0 z-0">
                    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                        <Suspense fallback={null}>
                            <AnimatedBackground />
                        </Suspense>
                    </Canvas>
                </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-light-bg/50 to-light-bg dark:via-dark-bg/50 dark:to-dark-bg z-[1]" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl" />

            <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                    {/* Text Content - Left Side */}
                    <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                        <motion.div variants={itemVariants} className="mb-4">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-sm font-medium">
                                <Sparkles className="w-4 h-4" />
                                {t('hero_badge')}
                            </span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                            <span className="text-gradient-animated">{t('hero_name')}</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl md:text-2xl lg:text-3xl font-medium text-light-text dark:text-dark-text mb-4">
                            {t('hero_tagline')}
                        </motion.p>

                        <motion.p variants={itemVariants} className="text-base md:text-lg text-light-muted dark:text-dark-muted max-w-xl mb-10">
                            {t('hero_bio')}
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                            <motion.button onClick={scrollToProjects} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary">
                                {t('hero_cta_projects')}
                            </motion.button>
                            <motion.button onClick={scrollToContact} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary">
                                {t('hero_cta_contact')}
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Profile Picture - Right Side */}
                    <motion.div variants={itemVariants} className="flex-shrink-0 order-1 lg:order-2">
                        <div className="relative w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[28rem] rounded-3xl overflow-hidden border-4 border-accent-purple/30 shadow-2xl shadow-accent-purple/20">
                            <Image src="/image.png" alt="To'rabek Raufov" fill className="object-cover" priority />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                <motion.button onClick={scrollToProjects} animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="p-3 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur border border-white/20 text-light-muted dark:text-dark-muted hover:text-accent-purple transition-colors" aria-label="Scroll down">
                    <ArrowDown className="w-5 h-5" />
                </motion.button>
            </motion.div>
        </section>
    );
};

export default Hero;
