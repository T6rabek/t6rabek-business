import { useTranslation } from 'next-i18next';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image';
import {
  Briefcase,
  Users,
  Code,
  Globe,
  Server,
  PenTool,
  GitBranch,
} from 'lucide-react';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Decal, Preload } from '@react-three/drei';
import * as THREE from 'three';

// A more complex, multi-layered 3D element that reacts to scroll
const InteractiveShapes = ({ scroll }) => {
  const groupRef = useRef();

  // Rotate the group based on scroll progress
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scroll.get() * Math.PI * 2;
      groupRef.current.rotation.x = scroll.get() * Math.PI * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={1}>
        <mesh castShadow receiveShadow scale={1.5}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#fff8eb"
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={1}
            map={new THREE.TextureLoader().load(
              'https://placehold.co/128x128/a78bfa/a78bfa.png'
            )}
          />
        </mesh>
      </Float>
      <Float speed={5} rotationIntensity={0.5} floatIntensity={2}>
        <mesh position={[-2.5, -1, -1]}>
          <torusGeometry args={[0.3, 0.15, 16, 32]} />
          <meshStandardMaterial color="#a78bfa" />
        </mesh>
      </Float>
      <Float speed={5} rotationIntensity={0.5} floatIntensity={2}>
        <mesh position={[2.5, 1, 0]}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial color="#818cf8" />
        </mesh>
      </Float>
    </group>
  );
};

const AboutPageContent = () => {
  const { t } = useTranslation('common');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Enhanced animation variant for a more dynamic entry on all devices
  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  const principles = [
    {
      icon: <Briefcase />,
      title: 'Tourism Expertise',
      description:
        'Deep understanding of the travel industry, from logistics to creating unforgettable premium experiences for clients.',
    },
    {
      icon: <Users />,
      title: 'Client-Focused',
      description:
        'Dedicated to clear communication and delivering tangible results that align with client goals and expectations.',
    },
    {
      icon: <Code />,
      title: 'Tech-Driven Solutions',
      description:
        'Utilizing modern technology to build efficient, scalable platforms that solve real-world problems.',
    },
    {
      icon: <Globe />,
      title: 'Global Vision',
      description:
        'Building bridges between local culture and a global audience, with a focus on long-term, impactful projects.',
    },
  ];

  const skills = {
    frontend: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'Framer Motion' },
    ],
    backend: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'MongoDB' },
      { name: 'Firebase' },
    ],
    tools: [
      { name: 'Git & GitHub' },
      { name: 'Vercel' },
      { name: 'Figma' },
      { name: 'Docker' },
    ],
    tourism: [
      { name: 'Tour Guiding' },
      { name: 'Logistics' },
      { name: 'Client Relations' },
      { name: 'Cultural Expertise' },
    ],
  };

  return (
    <div ref={containerRef} className="py-16 md:py-24 overflow-x-hidden">
      <motion.div
        className="container mx-auto px-6 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Decorative 3D background element */}
        <div className="absolute top-0 -right-20 md:-right-40 w-96 h-96 opacity-10 dark:opacity-20 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={1} />
              <pointLight position={[10, 10, 10]} />
              <InteractiveShapes scroll={scrollYProgress} />
              <Preload all />
            </Suspense>
          </Canvas>
        </div>

        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16 relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-light-text dark:text-dark-text mb-4">
            {t('about_title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('hero_tagline')}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start relative z-10"
        >
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 flex justify-center"
          >
            <motion.div
              className="relative w-60 h-60 lg:w-72 lg:h-72 rounded-full overflow-hidden shadow-2xl border-4 border-light-accent dark:border-dark-accent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="/locales/image.png"
                alt="To'rabek Raufov Profile Picture"
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">
              My Mission: Bridging Worlds with Tourism and Tech
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('about_bio')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              My approach is grounded in execution and impact. In tourism, this
              means hands-on management and a commitment to quality that earns
              trust. In tech, it means building clean, functional, and scalable
              applications. I believe in combining these two worlds to create
              unique value—developing digital tools that enhance travel, and
              using my ground-level experience to inform better, more relevant
              technology.
            </p>
          </motion.div>
        </motion.div>

        {/* Core Principles Section */}
        <motion.div
          variants={containerVariants}
          className="mt-24 relative z-10"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-12 text-light-text dark:text-dark-text"
          >
            Core Principles
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow:
                    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
                className="bg-white dark:bg-dark-surface p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full text-light-accent dark:text-dark-accent">
                    {principle.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-light-text dark:text-dark-text">
                  {principle.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* New "My Toolkit" Section */}
        <motion.div
          variants={containerVariants}
          className="mt-24 relative z-10"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-12 text-light-text dark:text-dark-text"
          >
            My Toolkit
          </motion.h2>
          <div className="space-y-12">
            {Object.entries(skills).map(([category, skillList]) => (
              <motion.div key={category} variants={containerVariants}>
                <motion.h3
                  variants={itemVariants}
                  className="text-2xl font-semibold mb-6 text-center capitalize text-gray-700 dark:text-gray-300"
                >
                  {category}
                </motion.h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {skillList.map((skill, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.1,
                        y: -8,
                        rotate: Math.random() > 0.5 ? 3 : -3,
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-dark-surface rounded-lg shadow-md w-32 h-32 justify-center border border-gray-200 dark:border-gray-700 cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full flex items-center justify-center text-light-accent dark:text-dark-accent">
                        {category === 'frontend' && <PenTool />}
                        {category === 'backend' && <Server />}
                        {category === 'tools' && <GitBranch />}
                        {category === 'tourism' && <Briefcase />}
                      </div>
                      <span className="font-semibold text-sm text-center text-light-text dark:text-dark-text">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPageContent;
