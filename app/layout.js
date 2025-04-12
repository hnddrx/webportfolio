'use client';

import '../styles/globals.js'; // Assuming this is your global CSS
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ThemeProvider } from '../context/ThemeContext';
import GlobalEvents from '../components/GlobalEvents';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDark(theme === 'dark');
  }, []);

  return (
    <html lang="en">
      <body className="body-container">
        <ThemeProvider>
          <Navbar />
          <GlobalEvents />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
