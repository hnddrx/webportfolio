'use client';

import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const links = [
  { label: 'Home', href: '#hero', icon: <HomeIcon fontSize="small" /> },
  { label: 'About', href: '#about', icon: <InfoIcon fontSize="small" /> },
  { label: 'Projects', href: '#projects', icon: <WorkIcon fontSize="small" /> },
  { label: 'Contact', href: '#contact', icon: <ContactMailIcon fontSize="small" /> },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const [mounted, setMounted] = useState(false);
  const muiTheme = useMuiTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));

  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem('theme');
    const storedTheme = stored || theme;
    document.body.style.backgroundColor = storedTheme === 'dark' ? '#1e1e1e' : '#ffffff';
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.style.backgroundColor = newTheme === 'dark' ? '#1e1e1e' : '#ffffff';
  };

  if (!mounted) return null;

  return (
    <AppBar
      position="fixed"
      elevation={3}
      sx={{
        top: isSmallScreen ? 8 : 16,
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: isSmallScreen ? '100%' : '480px',
        width: 'calc(100% - 1.5rem)',
        height: isSmallScreen ? '48px' : '64px',
        borderRadius: isSmallScreen ? 0 : '10px',
        backdropFilter: 'blur(10px)',
        backgroundColor: isDark
          ? 'rgba(20, 20, 20, 0.6)'
          : 'rgba(255, 255, 255, 0.6)',
        border: isDark ? '1px solid #333' : '1px solid #ccc',
        zIndex: 1300,
      }}
    >
      <Toolbar
        sx={{
          minHeight: '48px',
          px: 2,
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            letterSpacing: '-0.5px',
            color: isDark ? '#fff' : '#111',
            userSelect: 'none',
          }}
        >
          WREN
          <span style={{ color: isDark ? '#90caf9' : '#1976d2' }}>.</span>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {links.map(({ label, href, icon }) => (
            <Tooltip title={label} placement="bottom" key={label}>
              <IconButton
                component="a"
                href={href}
                size="small"
                sx={{
                  opacity: 0.7,
                  color: isDark ? '#e0e0e0' : '#333',
                  '&:hover': {
                    opacity: 1,
                    color: isDark ? '#90caf9' : '#1976d2',
                  },
                }}
              >
                {icon}
              </IconButton>
            </Tooltip>
          ))}

          <IconButton onClick={toggleTheme} sx={{ ml: 1 }} size="small">
            {isDark ? (
              <Brightness7Icon fontSize="small" />
            ) : (
              <Brightness4Icon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
