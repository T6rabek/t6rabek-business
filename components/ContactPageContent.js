import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Send, Instagram } from 'lucide-react';
import { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// --- New Creative Contact Experience ---

const MessageOrb = ({ orbRef, material }) => {
  useFrame(state => {
    if (orbRef.current) {
      const t = state.clock.getElapsedTime();
      orbRef.current.rotation.y = t * 0.1;
      const scale = 1 + Math.sin(t * 2) * 0.05;
      orbRef.current.scale.set(scale, scale, scale);
    }
  });
  return (
    <Sphere ref={orbRef} args={[1.5, 32, 32]}>
      <primitive object={material} attach="material" />
    </Sphere>
  );
};

const DataStream = ({ message }) => {
  const ref = useRef();
  const maxCount = 100; // Fixed maximum number of particles

  // FIX: Create the buffer attribute only once with the maximum size
  const positions = useMemo(() => {
    const pos = new Float32Array(maxCount * 3);
    // Initialize all particles at the origin so they are not visible initially
    for (let i = 0; i < maxCount; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
    }
    return pos;
  }, []); // Empty dependency array ensures this runs only once

  useFrame((_, delta) => {
    if (!ref.current) return;

    // FIX: Control visibility based on message length
    ref.current.visible = message.length > 0;
    if (!ref.current.visible) return; // Don't animate if not visible

    for (let i = 0; i < maxCount; i++) {
      const i3 = i * 3;
      const current = new THREE.Vector3(
        ref.current.geometry.attributes.position.array[i3],
        ref.current.geometry.attributes.position.array[i3 + 1],
        ref.current.geometry.attributes.position.array[i3 + 2]
      );

      // If a particle is at the origin, it means it's "dead" and can be respawned.
      if (current.length() < 0.1) {
        current.set((Math.random() - 0.5) * 10, 5 - Math.random() * 10, -5);
      }

      // Animate towards the center
      current.lerp(
        new THREE.Vector3(0, 0, 0),
        delta * (0.5 + Math.random() * 0.5)
      );

      // Reset if it gets too close to the center
      if (current.length() < 1.8) {
        current.set((Math.random() - 0.5) * 10, 5 - Math.random() * 10, -5);
      }

      ref.current.geometry.attributes.position.array[i3] = current.x;
      ref.current.geometry.attributes.position.array[i3 + 1] = current.y;
      ref.current.geometry.attributes.position.array[i3 + 2] = current.z;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={maxCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        color="#a78bfa"
        size={0.1}
        transparent
        opacity={0.8}
      />
    </points>
  );
};

const CreativeContact = () => {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const orbRef = useRef();

  const orbMaterial = new THREE.MeshStandardMaterial({
    color: '#6366f1',
    emissive: '#a78bfa',
    roughness: 0.2,
    metalness: 0.5,
  });

  const socialLinks = [
    {
      url: 'https://linkedin.com/in/your-profile',
      Icon: Linkedin,
      label: 'LinkedIn',
    },
    { url: 'https://github.com/T6rabek', Icon: Github, label: 'GitHub' },
    {
      url: 'https://instagram.com/T6rabek_',
      Icon: Instagram,
      label: 'Instagram',
    },
  ];

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isSending || !formData.message) return;
    setIsSending(true);
    gsap.to(orbRef.current.position, {
      z: 50,
      duration: 2,
      ease: 'power3.in',
      onComplete: () => {
        setIsSent(true);
        e.target.submit();
      },
    });
    gsap.to(orbRef.current.scale, {
      x: 0.1,
      y: 0.1,
      z: 0.1,
      duration: 2,
      ease: 'power3.in',
    });
  };

  return (
    <div className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center text-white">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 0, 15]} intensity={5} />
            <Stars
              radius={200}
              depth={50}
              count={5000}
              factor={8}
              saturation={0}
              fade
              speed={1}
            />
            <MessageOrb orbRef={orbRef} material={orbMaterial} />
            <DataStream message={formData.message} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10">
        <AnimatePresence mode="wait">
          {isSent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-green-400">
                Message Sent!
              </h2>
              <p className="mt-2 text-gray-300">
                Thank you for reaching out. I'll get back to you soon.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
              <h1 className="text-4xl font-extrabold text-center mb-2">
                {t('connect_title')}
              </h1>
              <p className="text-center text-gray-400 mb-6">
                {t('connect_desc')}
              </p>
              <form
                action="https://formspree.io/f/xdkzjzql"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder={t('contact_form_name')}
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t('contact_form_email')}
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-400"
                />
                <textarea
                  name="message"
                  placeholder={t('contact_form_message')}
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-indigo-400"
                />
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-300 flex items-center justify-center disabled:bg-gray-500"
                >
                  {isSending ? 'Sending...' : 'Launch Message'}{' '}
                  <Send className="ml-2 w-5 h-5" />
                </button>
              </form>

              <div className="mt-8 text-center">
                <div className="relative my-4">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-black/30 px-2 text-sm text-gray-400">
                      or connect with me
                    </span>
                  </div>
                </div>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map(link => (
                    <motion.a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={link.label}
                    >
                      <link.Icon size={28} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main Contact Page Wrapper ---
const ContactPageContent = () => {
  return (
    <div className="bg-dark-bg">
      <CreativeContact />
    </div>
  );
};

export default ContactPageContent;
