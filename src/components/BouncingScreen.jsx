import React from 'react';
import { motion } from 'framer-motion';

const BouncingLoadingScreen = () => {
  const dotVariants = {
    bounce: {
      y: ['0%', '-100%', '0%'],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0.1,
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
      <motion.div
        style={{ width: '1em', height: '1em', borderRadius: '50%', backgroundColor: 'rgb(0,0,0)', margin: '0 5px' }}
        variants={dotVariants}
        initial="bounce"
        animate="bounce"
      />
      <motion.div
        style={{ width: '1em', height: '1em', borderRadius: '50%', backgroundColor: 'rgb(0,0,0)', margin: '0 5px' }}
        variants={dotVariants}
        initial="bounce"
        animate="bounce"
        transition={{ delay: 0.2 }} 
      />
      <motion.div
        style={{ width: '1em', height: '1em', borderRadius: '50%', backgroundColor: 'rgb(0,0,0)', margin: '0 5px' }}
        variants={dotVariants}
        initial="bounce"
        animate="bounce"
        transition={{ delay: 0.4 }} 
      />
    </div>
  );
};

export default BouncingLoadingScreen;
