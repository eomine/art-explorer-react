import { motion } from 'motion/react';

export default function Loading() {
  const numberOfDots = 5;
  const array = Array.from({ length: numberOfDots }, (_, i) => i);

  return (
    <div className="flex gap-1 items-center justify-center min-w-16 min-h-16">
      {array.map((i) => (
        <motion.div
          key={i}
          className="bg-gray-800 dark:bg-gray-200 w-2 h-2"
          animate={{ scale: [0.3, 1, 0.3] }}
          transition={{
            delay: i * (1 / numberOfDots),
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        ></motion.div>
      ))}
    </div>
  );
}
