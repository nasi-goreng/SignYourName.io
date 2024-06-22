import React from 'react';
import { motion } from 'framer-motion';

const StaticCircle = ({ style, isVisible }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        ...style,
        width: '164px',
        height: '164px',
        backgroundColor: '#FFE08F',
        borderRadius: '50%',
        position: 'absolute',
        zIndex: 2,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    />
  );
};

export default StaticCircle;
