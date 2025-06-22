'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, useTheme, useMediaQuery, Paper } from '@mui/material';
import { motion, useScroll, useTransform, useAnimation, useInView, useMotionValue } from 'framer-motion';

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

export default function WorkExperience({ experiences, isDark }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const maxProgress = useMotionValue(0);
  const lineHeight = useTransform(maxProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > maxProgress.get()) {
        maxProgress.set(latest);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, maxProgress]);

  const [scrollDir, setScrollDir] = useState('down');
  useEffect(() => {
    let lastY = window.scrollY;
    const updateDir = () => {
      const y = window.scrollY;
      setScrollDir(y > lastY ? 'down' : 'up');
      lastY = y;
    };
    window.addEventListener('scroll', updateDir);
    return () => window.removeEventListener('scroll', updateDir);
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 4 },
        maxWidth: 1000,
        mx: 'auto',
        backgroundColor: isDark ? '#0a0a0a' : '#fdfdfd',
        color: isDark ? '#f0f0f0' : '#111',
      }}
    >
      {/* Timeline base line */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 0,
          transform: 'translateX(-50%)',
          width: '2px',
          height: '100%',
          backgroundColor: isDark ? '#444' : '#ccc',
          zIndex: 0,
        }}
      />

      {/* Animated scroll-following line */}
      <motion.div
        style={{
          height: lineHeight,
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '2px',
          backgroundColor: theme.palette.primary.main,
          transform: 'translateX(-50%)',
          borderRadius: 6,
          zIndex: 1,
        }}
      />

      {/* Experience timeline items */}
      {experiences.map((exp, idx) => {
        const isLeft = !isMobile && idx % 2 === 0;

        const ref = useRef(null);
        const inView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });
        const controls = useAnimation();

        useEffect(() => {
          if (inView && scrollDir === 'down') {
            controls.start('visible');
          }
        }, [inView, scrollDir]);

        return (
          <motion.div
            key={idx}
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
            {/* Dot */}
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

            {/* Card-like experience box */}
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
                {exp.role} <Typography component="span" fontWeight={400}>@ {exp.company}</Typography>
              </Typography>
              <Typography variant="body2"  sx={{ mb: 1, fontSize: '0.875rem', color: isDark ? '#bbb' : '#555' }}>
                {exp.duration}
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {exp.description}
              </Typography>
            </Paper>
          </motion.div>
        );
      })}
    </Box>
  );
}
