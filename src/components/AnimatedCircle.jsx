import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCircle = ({ initialPosition, targetPosition, delay }) => {
  return (
    <motion.div
      style={{
        width: '164px',
        height: '164px',
        backgroundColor: '#FFE08F',
        borderRadius: '50%',
        position: 'absolute',
      }}
      initial={{ top: initialPosition.top, left: initialPosition.left }}
      animate={{ top: targetPosition.top, left: targetPosition.left }}
      transition={{ duration: 0.4}}
    />
  );
};

export default AnimatedCircle;
