'use client';

import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Set body background on first mount
  useEffect(() => {
    setIsMounted(true);

    const storedTheme = localStorage.getItem('theme') || theme;
    const isDarkStored = storedTheme === 'dark';

    document.body.style.backgroundColor = isDarkStored ? '#1e1e1e' : '#ffffff';

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle theme + change body color
  const handleToggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.style.backgroundColor = newTheme === 'dark' ? '#1e1e1e' : '#ffffff';
  };

  if (!isMounted) return null;

  const drawer = (
    <Box
      sx={{
        width: 250,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {links.map(({ label, href }) => (
        <Button
        key={label}
        href={href}
        sx={{
          color: isDark ? '#e0e0e0' : '#333',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '0.95rem',
          letterSpacing: '0.3px',
          textTransform: 'none',
          marginX: 1,
          transition: 'color 0.2s ease-in-out',
          '&:hover': {
            color: isDark ? '#90caf9' : '#1976d2',
          },
        }}
      >
        {label}
      </Button>
      
      ))}
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
          color: isDark ? 'white' : 'black',
          boxShadow: 'none',
          borderBottom: isDark ? '1px solid #333' : '1px solid #e0e0e0',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 2, sm: 4 },
            py: 1.5,
            minHeight: '72px',
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
                
              fontWeight: 800,
              letterSpacing: '-0.75px',
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              color: isDark ? '#f5f5f5' : '#111111',
              transition: 'color 0.3s ease-in-out',
              userSelect: 'none',
            }}
          >
            WREN<span style={{ color: isDark ? '#90caf9' : '#1976d2' }}>.</span>
          </Typography>



          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile ? (
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            ) : (
              links.map(({ label, href }) => (
                <Button
                  key={label}
                  href={href}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    justifyContent: 'flex-start',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '1rem',
                    color: isDark ? '#e0e0e0' : '#333',
                    textTransform: 'none',
                    paddingY: 1,
                    '&:hover': {
                      color: isDark ? '#90caf9' : '#1976d2',
                    },
                  }}
                >
                  {label}
                </Button>

              ))
            )}

            <IconButton
              onClick={handleToggleTheme}
              sx={{ ml: 1 }}
              color="inherit"
              aria-label="toggle theme"
            >
              {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: isDark ? '#222' : '#f7f7f7',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
