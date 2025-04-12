// components/HtmlWrapper.js
'use client';
import { useTheme } from '../context/ThemeContext';

export default function HtmlWrapper({ children }) {
  const { theme } = useTheme();

  return (
    <html lang="en" className={theme}>
      {children}
    </html>
  );
}
