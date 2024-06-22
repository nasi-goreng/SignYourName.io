import React from 'react';
import { motion } from 'framer-motion';

const Rectangle = ({ style, isVisible }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        ...style,
        width: '32px',
        backgroundColor: '#9CC2C2',
        zIndex: 1,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    />
  );
};

export default Rectangle;
