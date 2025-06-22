'use client';

import React, { useEffect, useRef } from 'react';
import { Typography, Box, Paper, useTheme } from '@mui/material';
import { motion, useAnimation, useInView } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
    },
  },
};

export default function ExperienceItem({ exp, idx, isLeft, isDark, scrollDir }) {
  const theme = useTheme();

  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });

  useEffect(() => {
    if (inView && scrollDir === 'down') {
      controls.start('visible');
    }
  }, [inView, scrollDir, controls]);

  // 🛡 Guard: Avoid crashing if `exp` is missing
  if (!exp || typeof exp !== 'object') return null;

  const { role, company, duration, description } = exp;

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={controls}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-end' : 'flex-start',
        position: 'relative',
        marginBottom: '4rem',
        width: '100%',
        zIndex: 2,
      }}
    >
      {/* 🔵 Timeline dot */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 'calc(50% - 8px)',
          width: 16,
          height: 16,
          backgroundColor: theme.palette.primary.main,
          borderRadius: '50%',
          border: `3px solid ${isDark ? '#0a0a0a' : '#fff'}`,
          zIndex: 3,
        }}
      />

      {/* 📋 Experience card */}
      <Paper
        elevation={3}
        sx={{
          width: { xs: '100%', sm: '80%', md: '45%' },
          p: 3,
          borderRadius: 3,
          backgroundColor: isDark ? 'rgba(30,30,30,0.6)' : '#fff',
          backdropFilter: isDark ? 'blur(4px)' : 'none',
          ml: isLeft ? 0 : 4,
          mr: isLeft ? 4 : 0,
          textAlign: isLeft ? 'right' : 'left',
          color: isDark ? '#ddd' : '#222',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
          {role}{' '}
          <Typography component="span" fontWeight={400} display="inline">
            @ {company}
          </Typography>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: '0.875rem',
            color: isDark ? '#bbb' : '#555',
          }}
        >
          {duration}
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
}
