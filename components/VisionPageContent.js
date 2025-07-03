import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  Telescope,
  Code,
  Users,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// --- Snake Game Component ---
const SnakeGame = ({ setIsGameActive }) => {
  const boardSize = 20;
  const initialSnake = [{ x: 10, y: 10 }];
  const initialFood = { x: 15, y: 15 };

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(initialFood);
  const [direction, setDirection] = useState({ x: 0, y: -1 }); // Start moving up
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const gameLoopRef = useRef();
  const directionRef = useRef(direction);

  const generateFood = () => {
    let newFoodPosition;
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
      };
    } while (
      snake.some(
        segment =>
          segment.x === newFoodPosition.x && segment.y === newFoodPosition.y
      )
    );
    setFood(newFoodPosition);
  };

  const handleKeyDown = e => {
    let newDirection;
    switch (e.key) {
      case 'ArrowUp':
        newDirection = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        newDirection = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        newDirection = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        newDirection = { x: 1, y: 0 };
        break;
      default:
        return;
    }
    // Prevent reversing direction
    if (
      directionRef.current.x + newDirection.x !== 0 ||
      directionRef.current.y + newDirection.y !== 0
    ) {
      directionRef.current = newDirection;
    }
  };

  const changeDirection = newDirection => {
    if (
      directionRef.current.x + newDirection.x !== 0 ||
      directionRef.current.y + newDirection.y !== 0
    ) {
      directionRef.current = newDirection;
    }
  };

  const gameTick = () => {
    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };
      head.x += directionRef.current.x;
      head.y += directionRef.current.y;

      // Wall collision
      if (
        head.x < 0 ||
        head.x >= boardSize ||
        head.y < 0 ||
        head.y >= boardSize
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Self collision
      for (let i = 1; i < newSnake.length; i++) {
        if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
          setGameOver(true);
          return prevSnake;
        }
      }

      newSnake.unshift(head);

      // Food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  const restartGame = () => {
    setSnake(initialSnake);
    setFood(initialFood);
    setDirection({ x: 0, y: -1 });
    directionRef.current = { x: 0, y: -1 };
    setSpeed(200);
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!gameOver) {
      gameLoopRef.current = setInterval(gameTick, speed);
    }
    return () => clearInterval(gameLoopRef.current);
  }, [snake, gameOver, speed]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex justify-between items-center w-full max-w-md mb-4 p-2 bg-white/10 dark:bg-dark-surface/20 rounded-lg">
        <div className="text-xl font-bold text-light-text dark:text-dark-text">
          Score: {score}
        </div>
        <button
          onClick={() => setIsGameActive(false)}
          className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg"
        >
          Exit
        </button>
      </div>
      <div
        className="relative bg-gray-200 dark:bg-gray-800 border-4 border-gray-400 dark:border-gray-600"
        style={{
          width: 'min(80vw, 500px)',
          height: 'min(80vw, 500px)',
          display: 'grid',
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
          gridTemplateRows: `repeat(${boardSize}, 1fr)`,
        }}
      >
        {gameOver && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10">
            <h2 className="text-4xl font-bold text-white">Game Over</h2>
            <button
              onClick={restartGame}
              className="mt-4 px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg"
            >
              Restart
            </button>
          </div>
        )}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="bg-light-accent dark:bg-dark-accent"
            style={{
              gridColumn: segment.x + 1,
              gridRow: segment.y + 1,
              borderRadius: index === 0 ? '50%' : '20%',
            }}
          />
        ))}
        <div
          className="bg-red-500 rounded-full"
          style={{ gridColumn: food.x + 1, gridRow: food.y + 1 }}
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 w-48 md:hidden">
        <div />
        <button
          onClick={() => changeDirection({ x: 0, y: -1 })}
          className="p-4 bg-gray-500 rounded-lg text-white"
        >
          <ArrowUp />
        </button>
        <div />
        <button
          onClick={() => changeDirection({ x: -1, y: 0 })}
          className="p-4 bg-gray-500 rounded-lg text-white"
        >
          <ArrowLeft />
        </button>
        <div />
        <button
          onClick={() => changeDirection({ x: 1, y: 0 })}
          className="p-4 bg-gray-500 rounded-lg text-white"
        >
          <ArrowRight />
        </button>
        <div />
        <button
          onClick={() => changeDirection({ x: 0, y: 1 })}
          className="p-4 bg-gray-500 rounded-lg text-white"
        >
          <ArrowDown />
        </button>
        <div />
      </div>
    </div>
  );
};

// --- Main Vision Page Content ---
const VisionPageContent = () => {
  const { t } = useTranslation('common');
  const [isGameActive, setIsGameActive] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const futureGoals = [
    {
      icon: (
        <Target className="w-8 h-8 mx-auto mb-4 text-light-accent dark:text-dark-accent" />
      ),
      title: 'Scaling iTravels Globally',
      description:
        'Transforming iTravels from a local service into a globally recognized platform for premium, ethical tourism.',
    },
    {
      icon: (
        <Code className="w-8 h-8 mx-auto mb-4 text-light-accent dark:text-dark-accent" />
      ),
      title: 'Building a Tech Ecosystem',
      description:
        'Developing a suite of interconnected digital tools, from travel apps to content platforms, that serve and empower our communities.',
    },
    {
      icon: (
        <Users className="w-8 h-8 mx-auto mb-4 text-light-accent dark:text-dark-accent" />
      ),
      title: 'Inspiring a New Generation',
      description:
        'Proving what young, independent builders can achieve from anywhere in the world, encouraging others to pursue their own ventures.',
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-light-bg dark:bg-dark-bg overflow-hidden min-h-[80vh] flex flex-col justify-center">
      <div className="container mx-auto px-6 relative">
        <AnimatePresence mode="wait">
          {!isGameActive ? (
            <motion.div
              key="content"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <div className="flex justify-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    className="p-4 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full"
                  >
                    <Telescope className="w-12 h-12 text-light-accent dark:text-dark-accent" />
                  </motion.div>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-light-text dark:text-dark-text mb-4">
                  {t('mission_title')}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  I'm not here to fit into the system — I'm here to build a new
                  one.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-dark-surface p-8 md:p-12 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 mb-20"
              >
                <p className="text-xl md:text-2xl text-center text-gray-700 dark:text-gray-300 leading-relaxed font-semibold">
                  {t('mission_bio')}
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold text-center mb-12 text-light-text dark:text-dark-text">
                  The Road Ahead
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {futureGoals.map((goal, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{
                        y: -10,
                        boxShadow: '0px 20px 30px -10px rgba(0,0,0,0.2)',
                      }}
                      className="bg-white dark:bg-dark-surface p-8 rounded-xl shadow-lg border border-transparent hover:border-light-accent dark:hover:border-dark-accent transition-all duration-300 text-center cursor-pointer"
                    >
                      <div className="flex justify-center mb-4">
                        <div className="p-4 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full">
                          {goal.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-light-text dark:text-dark-text">
                        {goal.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {goal.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center mt-16">
                <button
                  onClick={() => setIsGameActive(true)}
                  className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-500 transition-colors"
                >
                  Play a Classic Game
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <SnakeGame setIsGameActive={setIsGameActive} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VisionPageContent;
