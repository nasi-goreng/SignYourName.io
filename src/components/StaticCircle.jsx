import React from 'react';
import { motion } from 'framer-motion';

const StaticCircle = ({ style, isVisible, className, inlineStyle }) => {
  return (
    <motion.div
      style={inlineStyle}
      className={`absolute w-[164px] h-[164px] bg-[#FFE08F] rounded-full z-10 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    />
  );
};

export default StaticCircle;
