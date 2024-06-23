import React from 'react';
import { motion } from 'framer-motion';

const StaticCircle = ({ style, isVisible, className }) => {
  return (
    <motion.div
      className={`absolute w-[164px] h-[164px] bg-[#FFE08F] rounded-full z-2 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    />
  );
};

export default StaticCircle;
