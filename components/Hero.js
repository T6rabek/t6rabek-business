import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, TorusKnot, Points, PointMaterial } from '@react-three/drei';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import * as THREE from 'three';

// --- New Shake-Based Game Components ---

const JellyObject = ({ shakeIntensity }) => {
  const ref = useRef();
  const time = useRef(0);
  useFrame((_, delta) => {
    if (!ref.current) return;
    time.current += delta;
    const wobble = Math.sin(time.current * 20) * shakeIntensity.current * 0.2;
    ref.current.scale.set(1 + wobble, 1 - wobble, 1 + wobble);
  });
  return (
    <TorusKnot ref={ref} args={[1, 0.4, 256, 32]}>
      <meshStandardMaterial
        color="#a78bfa"
        emissive="#6366f1"
        roughness={0.1}
        metalness={0.2}
      />
    </TorusKnot>
  );
};

const ShakeParticles = ({ shakeIntensity }) => {
  const ref = useRef();
  const [positions] = useState(() => new Float32Array(300 * 3));
  useFrame(() => {
    if (ref.current && shakeIntensity.current > 0.1) {
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += (Math.random() - 0.5) * 0.2;
        positions[i + 1] += (Math.random() - 0.5) * 0.2;
        positions[i + 2] += (Math.random() - 0.5) * 0.2;
        const distance = Math.sqrt(
          positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2
        );
        if (distance > 5 + Math.random() * 5) {
          positions[i] = positions[i + 1] = positions[i + 2] = 0;
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial
        transparent
        color="#f0f0f0"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const StaticBackground = () => {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });
  return (
    <TorusKnot ref={ref} args={[1, 0.3, 200, 32]}>
      <meshStandardMaterial color="#9867F0" wireframe />
    </TorusKnot>
  );
};

// FIX: New component to handle game logic inside the Canvas
const GameController = ({ shakeIntensity }) => {
  // Dampen the shake intensity over time
  useFrame((_, delta) => {
    shakeIntensity.current = THREE.MathUtils.lerp(
      shakeIntensity.current,
      0,
      delta * 5
    );
  });
  return null; // This component does not render anything itself
};

// Game Canvas
const GameCanvas = ({ isGameActive }) => {
  const shakeIntensity = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMotionEvent = event => {
    const { x, y, z } = event.accelerationIncludingGravity;
    const magnitude = Math.sqrt(x * x + y * y + z * z);
    if (magnitude > 20) {
      shakeIntensity.current = 1;
    }
  };

  // FIX: Added mouse handler for desktop interaction
  const handleMouseMove = event => {
    const { clientX: x, clientY: y } = event;
    const deltaX = x - lastMousePos.current.x;
    const deltaY = y - lastMousePos.current.y;
    const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (speed > 30) {
      // Threshold for fast mouse movement
      shakeIntensity.current = Math.min(
        1,
        shakeIntensity.current + speed / 100
      );
    }
    lastMousePos.current = { x, y };
  };

  useEffect(() => {
    if (isGameActive) {
      window.addEventListener('devicemotion', handleMotionEvent);
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('devicemotion', handleMotionEvent);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isGameActive]);

  return (
    <div className="w-full h-full absolute inset-0 z-0 opacity-20 dark:opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <pointLight position={[0, 0, 10]} intensity={3} />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={2}
          />
          {isGameActive ? (
            <>
              <JellyObject shakeIntensity={shakeIntensity} />
              <ShakeParticles shakeIntensity={shakeIntensity} />
              <GameController shakeIntensity={shakeIntensity} />
            </>
          ) : (
            <StaticBackground />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

// --- Main Hero Component ---
const Hero = () => {
  const { t } = useTranslation('common');
  const [isMounted, setIsMounted] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const requestMotionPermission = () => {
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            setIsGameActive(true);
          }
        })
        .catch(console.error);
    } else {
      setIsGameActive(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 12 },
    },
  };

  const tagline = t('hero_name');

  return (
    <section
      id="hero"
      className="relative w-full h-[calc(100vh-80px)] mx-auto flex items-center justify-center text-center overflow-hidden"
    >
      {isMounted && <GameCanvas isGameActive={isGameActive} />}
      <div className="relative z-10 px-6">
        <AnimatePresence>
          {!isGameActive && (
            <motion.div
              key="hero-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
            >
              <motion.p
                variants={letterVariants}
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300"
              >
                {t('hero_greeting')}
              </motion.p>
              <motion.h1
                variants={containerVariants}
                className="text-4xl md:text-7xl font-extrabold mt-2 text-light-text dark:text-dark-text"
                aria-label={tagline}
              >
                {tagline.split('').map((char, index) => (
                  <motion.span
                    key={char + '-' + index}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                variants={letterVariants}
                className="mt-4 text-md md:text-lg font-medium text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                {t('hero_tagline')}
              </motion.p>
              <motion.p
                variants={letterVariants}
                className="mt-4 text-base md:text-lg text-gray-700 dark:text-gray-400 max-w-3xl mx-auto"
              >
                {t('hero_bio')}
              </motion.p>
              <motion.div
                variants={letterVariants}
                className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
              >
                <Link href="/journey" legacyBehavior>
                  <motion.a
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-light-accent dark:bg-dark-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t('hero_cta_projects')}
                  </motion.a>
                </Link>
                <Link href="/contact" legacyBehavior>
                  <motion.a
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all duration-300"
                  >
                    {t('hero_cta_hire')}
                  </motion.a>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        {!isGameActive ? (
          <motion.button
            onClick={requestMotionPermission}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-500 transition-colors"
          >
            Activate Motion
          </motion.button>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400 bg-black/20 p-2 rounded-full">
            Shake your phone or move mouse quickly!
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;
