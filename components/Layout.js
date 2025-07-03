import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const { asPath } = useRouter();

  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <div className="bg-light-bg dark:bg-dark-bg min-h-screen flex flex-col">
      <Navbar />
      <motion.main
        key={asPath}
        variants={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear' }}
        className="flex-grow"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
