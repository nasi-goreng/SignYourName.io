import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCircle = ({ initialPosition, targetPosition, delay, className }) => {
  return (
    <motion.div
      className={`w-[164px] h-[164px] bg-[#FFE08F] rounded-full absolute z-10 ${className}`}
      initial={{ top: initialPosition.top, left: initialPosition.left }}
      animate={{ top: targetPosition.top, left: targetPosition.left }}
      transition={{ duration: 0.4}}
    />
  );
};

export default AnimatedCircle;
