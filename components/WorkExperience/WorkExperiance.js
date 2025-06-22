'use client';

import React from 'react';
import { Box, Typography, useTheme, useMediaQuery, Paper } from '@mui/material';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function WorkExperience({ experiences, isDark }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const containerRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const maxProgress = useMotionValue(0);
  const lineHeight = useTransform(maxProgress, [0, 1], ['0%', '100%']);

  scrollYProgress.on('change', (latest) => {
    if (latest > maxProgress.get()) {
      maxProgress.set(latest);
    }
  });

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        py: { xs: 4, md: 10 },
        px: { xs: 2, sm: 4 },
        maxWidth: 1000,
        mx: 'auto',
        backgroundColor: isDark ? '#0a0a0a' : '#fdfdfd',
        color: isDark ? '#f0f0f0' : '#111',
      }}
    >
      {/* Base timeline line */}
  

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

      {/* Animated progress line */}
      <motion.div
        style={{
          height: lineHeight,
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '1px',
          backgroundColor: theme.palette.primary.main,
          transform: 'translateX(-50%)',
          borderRadius: 6,
          zIndex: 1,
        }}
      />

      {experiences.map((exp, idx) => {
        const isLeft = !isMobile && idx % 2 === 0;

        return (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
            style={{
              display: 'flex',
              justifyContent: isMobile ? 'center' : isLeft ? 'flex-end' : 'flex-start',
              position: 'relative',
              marginBottom: '2rem',
              width: '100%',
              zIndex: 2,
            }}
          >
            {/* Dot (adjusted for mobile) */}
            <Box
              sx={{
                position: 'absolute',
                top: isMobile ? 0 : 20,
                left: isMobile ? 'calc(50% - 10px)' : 'calc(50% - 10px)',
                transform: isMobile ? 'translateY(-50%)' : 'none',
                width: 16,
                height: 16,
                backgroundColor: theme.palette.primary.main,
                borderRadius: '50%',
                border: `3px solid ${isDark ? '#0a0a0a' : '#fff'}`,
                zIndex: 3,
              }}
            />

            {/* Card */}
            <Paper
              elevation={3}
              sx={{
                width: { xs: '100%', sm: '85%', md: '45%' },
                mt: isMobile ? 3 : 6, // shift card down on mobile to avoid overlap
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                backgroundColor: isDark ? 'rgba(30,30,30,0.6)' : '#fff',
                backdropFilter: isDark ? 'blur(4px)' : 'none',
                mx: isMobile ? 'auto' : isLeft ? 0 : 4,
                ml: isMobile ? 'auto' : isLeft ? 0 : 4,
                mr: isMobile ? 'auto' : isLeft ? 4 : 0,
                textAlign: isMobile ? 'center' : isLeft ? 'right' : 'left',
                color: isDark ? '#ddd' : '#222',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
                {exp.role}{' '}
                <Typography component="span" fontWeight={400}>
                  @ {exp.company}
                </Typography>
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontSize: '0.875rem', color: isDark ? '#bbb' : '#555' }}
              >
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
