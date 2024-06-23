import React from 'react';
import { motion } from 'framer-motion';

const Rectangle = ({ isVisible, className }) => {
  return (
    <motion.div
      className={`absolute w-8 bg-[#9CC2C2] z-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
  );
};

export default Rectangle;
